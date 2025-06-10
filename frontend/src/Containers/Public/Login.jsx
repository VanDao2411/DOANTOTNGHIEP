import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api"; // <<<--- Đảm bảo đường dẫn này đúng!

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  
  // State để quản lý dữ liệu form
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  // State để quản lý giao diện
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate();

  // Hàm xử lý khi người dùng nhập liệu
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Hàm xử lý khi nhấn nút Đăng nhập / Đăng ký
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage('');

    try {
      let response;
      if (isLogin) {
        // --- Gọi API Đăng nhập ---
        response = await apiClient.post('/auth/login', {
          email: formData.email,
          password: formData.password,
        });
      } else {
        // --- Gọi API Đăng ký ---
        if (formData.password !== formData.passwordConfirm) {
          throw new Error("Mật khẩu và xác nhận mật khẩu không khớp!");
        }
        response = await apiClient.post('/auth/signup', {
          fullName: formData.fullName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          passwordConfirm: formData.passwordConfirm,
        });
      }

      const { token, data } = response.data;
      
      // Lưu token và user vào localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setSuccessMessage(isLogin ? 'Đăng nhập thành công! Đang chuyển hướng...' : 'Đăng ký thành công! Đang chuyển hướng...');
      
      setTimeout(() => {
        navigate("/"); // Chuyển về trang chủ
        window.location.reload(); // Tải lại trang để cập nhật trạng thái đăng nhập
      }, 1500);

    } catch (err) {
      // Xử lý lỗi và hiển thị
      const errorMessage = err.response?.data?.message || err.message || 'Đã có lỗi xảy ra.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut",
        duration: 0.4,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.04,
      y: -2,
      boxShadow: "0 8px 24px 0 rgba(59,130,246,0.15)",
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.98,
      y: 1,
    },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 overflow-hidden">
      {/* Họa tiết nền (giữ nguyên) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[-80px] top-[-80px] w-[300px] h-[300px] bg-gradient-to-br from-blue-400/30 to-purple-300/10 rounded-full blur-3xl" />
        <div className="absolute right-[-100px] bottom-[-100px] w-[350px] h-[350px] bg-gradient-to-tl from-pink-400/20 to-blue-300/10 rounded-full blur-3xl" />
        <svg className="absolute top-0 left-0 w-full h-32" viewBox="0 0 1440 320">
          <path
            fill="#6366f1"
            fillOpacity="0.07"
            d="M0,96L60,117.3C120,139,240,181,360,181.3C480,181,600,139,720,133.3C840,128,960,160,1080,181.3C1200,203,1320,213,1380,218.7L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* Thông báo thành công (đã cập nhật để hiển thị message động) */}
      <AnimatePresence>
        {successMessage && ( // <<<--- SỬ DỤNG 'successMessage' STATE
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg font-semibold text-lg"
          >
            {successMessage} {/* <<<--- HIỂN THỊ MESSAGE TỪ STATE */}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form đè lên hình ảnh */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md mx-4"
      >
        <motion.div
          variants={formVariants}
          className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-blue-100"
        >
          <div className="p-10">
            {/* <<<--- THÊM KHỐI HIỂN THỊ LỖI ---<<< */}
            <AnimatePresence>
              {error && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-4 p-3 bg-red-100 text-red-700 border border-red-200 rounded-lg text-sm text-center">
                      {error}
                  </motion.div>
              )}
            </AnimatePresence>

            {/* Quên mật khẩu và Đăng nhập/Đăng ký */}
            <AnimatePresence mode="wait">
              {showForgot ? (
                <motion.form
                  key="forgot"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  onSubmit={handleForgotSubmit} // <<<--- SỬ DỤNG HANDLER MỚI
                  className="space-y-6"
                >
                  <motion.div variants={textVariants} className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow">
                      Quên mật khẩu
                    </h2>
                    <p className="text-gray-500 mt-2 text-sm">
                      Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu.
                    </p>
                  </motion.div>
                  <motion.div variants={inputVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <motion.input
                      whileFocus={{
                        scale: 1.01,
                        boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
                      }}
                      type="email"
                      required
                      placeholder="email@example.com"
                      value={forgotEmail} // <<<--- GIỮ NGUYÊN
                      onChange={e => setForgotEmail(e.target.value)} // <<<--- GIỮ NGUYÊN
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-blue-50/40"
                    />
                  </motion.div>
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    type="submit"
                    disabled={loading} // <<<--- KẾT NỐI STATE 'loading'
                    className="w-full py-3 px-4 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg shadow-lg transition-all duration-200 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Đang gửi...' : 'Gửi yêu cầu'}
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => { setShowForgot(false); setError(null); }}
                    className="w-full mt-2 text-blue-600 hover:text-purple-600 text-sm"
                  >
                    Quay lại đăng nhập
                  </motion.button>
                </motion.form>
              ) : (
                // Đăng nhập/Đăng ký
                <motion.form
                  key="auth"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  onSubmit={handleAuthSubmit} // <<<--- SỬ DỤNG HANDLER MỚI
                  className="space-y-5"
                >
                  <motion.div variants={textVariants} className="text-center mb-8">
                    {/* ... (Phần tiêu đề Đăng nhập/Đăng ký giữ nguyên) ... */}
                  </motion.div>
                  
                  {/* --- CÁC TRƯỜNG INPUT ĐÃ ĐƯỢC CẬP NHẬT --- */}
                  {!isLogin && (
                    <>
                      <motion.div variants={inputVariants}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Tên đăng nhập</label>
                          <motion.input name="username" type="text" placeholder="nguyenvana" required value={formData.username} onChange={handleInputChange} whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)" }} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-blue-50/40" />
                      </motion.div>
                      <motion.div variants={inputVariants}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Tên đầy đủ</label>
                          <motion.input name="fullName" type="text" placeholder="Nguyễn Văn A" value={formData.fullName} onChange={handleInputChange} whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)" }} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-blue-50/40" />
                      </motion.div>
                    </>
                  )}

                  <motion.div variants={inputVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <motion.input name="email" type="email" placeholder="email@example.com" required value={formData.email} onChange={handleInputChange} whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)" }} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-blue-50/40" />
                  </motion.div>

                  <motion.div variants={inputVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                    <motion.input name="password" type="password" placeholder="••••••••" required value={formData.password} onChange={handleInputChange} whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)" }} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-blue-50/40" />
                  </motion.div>

                  {!isLogin && (
                    <motion.div variants={inputVariants}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu</label>
                      <motion.input name="passwordConfirm" type="password" placeholder="••••••••" required value={formData.passwordConfirm} onChange={handleInputChange} whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)" }} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-blue-50/40" />
                    </motion.div>
                  )}
                  {/* --- KẾT THÚC CÁC TRƯỜNG INPUT --- */}
                  
                  {isLogin && (
                    <motion.div variants={textVariants} className="flex justify-end">
                      <motion.button type="button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="text-sm text-blue-600 hover:underline" onClick={() => setShowForgot(true)}>
                        Quên mật khẩu?
                      </motion.button>
                    </motion.div>
                  )}

                  <motion.button
                    variants={buttonVariants} whileHover="hover" whileTap="tap"
                    type="submit"
                    disabled={loading} // <<<--- KẾT NỐI STATE 'loading'
                    className="w-full py-3 px-4 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg shadow-lg transition-all duration-200 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Đang xử lý...' : (isLogin ? "Đăng Nhập" : "Đăng Ký")}
                  </motion.button>

                  <motion.div variants={textVariants} className="mt-7 text-center text-sm">
                    {/* ... (Phần chuyển đổi giữa Đăng nhập và Đăng ký giữ nguyên) ... */}
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
