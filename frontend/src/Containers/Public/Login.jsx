import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function AuthOverlay() {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgot, setShowForgot] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const navigate = useNavigate();

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic đăng nhập/đăng ký ở đây nếu cần
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate("/");
    }, 1500);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setShowForgot(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1500);
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
      {/* Họa tiết nền */}
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

      {/* Thông báo đăng nhập thành công */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg font-semibold text-lg"
          >
            Đăng nhập thành công!
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
            {/* Quên mật khẩu */}
            <AnimatePresence>
              {showForgot ? (
                <motion.form
                  key="forgot"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  onSubmit={handleForgotSubmit}
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
                      value={forgotEmail}
                      onChange={e => setForgotEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-blue-50/40"
                    />
                  </motion.div>
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    type="submit"
                    className="w-full py-3 px-4 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg shadow-lg transition-all duration-200 tracking-wide"
                  >
                    Gửi yêu cầu
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setShowForgot(false)}
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
                  onSubmit={handleAuthSubmit}
                  className="space-y-5"
                >
                  <motion.div variants={textVariants} className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow">
                      {isLogin ? "Đăng Nhập" : "Đăng Ký"}
                    </h2>
                    <p className="text-gray-500 mt-2 text-sm">
                      {isLogin
                        ? "Chào mừng bạn quay lại! Hãy đăng nhập để tiếp tục."
                        : "Tạo tài khoản mới để trải nghiệm đầy đủ chức năng."}
                    </p>
                  </motion.div>

                  {!isLogin && (
                    <motion.div variants={inputVariants}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tên đầy đủ
                      </label>
                      <motion.input
                        whileFocus={{
                          scale: 1.01,
                          boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
                        }}
                        type="text"
                        placeholder="Nguyễn Văn A"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-blue-50/40"
                      />
                    </motion.div>
                  )}

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
                      placeholder="email@example.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-blue-50/40"
                    />
                  </motion.div>

                  <motion.div variants={inputVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mật khẩu
                    </label>
                    <motion.input
                      whileFocus={{
                        scale: 1.01,
                        boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
                      }}
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-blue-50/40"
                    />
                  </motion.div>

                  {!isLogin && (
                    <motion.div variants={inputVariants}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Xác nhận mật khẩu
                      </label>
                      <motion.input
                        whileFocus={{
                          scale: 1.01,
                          boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
                        }}
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-blue-50/40"
                      />
                    </motion.div>
                  )}

                  {isLogin && (
                    <motion.div
                      variants={textVariants}
                      className="flex justify-end"
                    >
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="text-sm text-blue-600 hover:underline"
                        onClick={() => setShowForgot(true)}
                      >
                        Quên mật khẩu?
                      </motion.button>
                    </motion.div>
                  )}

                  <motion.button
                    variants={buttonVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    whileTap="tap"
                    type="submit"
                    className="w-full py-3 px-4 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg shadow-lg transition-all duration-200 tracking-wide"
                  >
                    {isLogin ? "Đăng Nhập" : "Đăng Ký"}
                  </motion.button>
                  <motion.div
                    variants={textVariants}
                    className="mt-7 text-center text-sm"
                  >
                    <span className="text-gray-600">
                      {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
                    </span>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsLogin(!isLogin)}
                      className="ml-2 text-blue-600 font-semibold hover:text-purple-600 transition-colors"
                    >
                      {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
                    </motion.button>
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
