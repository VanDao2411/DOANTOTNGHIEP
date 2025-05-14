import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function AuthOverlay() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuthSubmit = () => {
    // Xử lý logic đăng nhập/đăng ký ở đây nếu cần
    
    // Chuyển hướng về trang home
    navigate("/");
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
      scale: 1.03,
      y: -2, // Hiệu ứng nhấc lên nhẹ khi hover
      transition: { 
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: { 
      scale: 0.98,
      y: 1 // Hiệu ứng nhấn xuống nhẹ khi click
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Hình ảnh nền */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://i.pinimg.com/736x/4c/ef/ea/4cefea77cf89650118e209980ad18e7e.jpg"
          alt="Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Form đè lên hình ảnh */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md mx-4"
      >
        <motion.div
          variants={formVariants}
          className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden"
        >
          <div className="p-8">
            <motion.div variants={textVariants} className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                {isLogin ? "Đăng Nhập" : "Đăng Ký"}
              </h2>
            </motion.div>

            <motion.div variants={containerVariants} className="space-y-5">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </motion.div>
              )}

              {isLogin && (
                <motion.div
                  variants={textVariants}
                  className="flex justify-end"
                >
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="#"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Quên mật khẩu?
                  </motion.a>
                </motion.div>
              )}

              <motion.button
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                onClick={handleAuthSubmit}
                className="w-full py-3 px-4 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg transition-all duration-200"
              >
                
                  {isLogin ? "Đăng Nhập" : "Đăng Ký"}
              </motion.button>
            </motion.div>

            <motion.div
              variants={textVariants}
              className="mt-6 text-center text-sm"
            >
              <span className="text-gray-600">
                {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors"
              >
                {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
