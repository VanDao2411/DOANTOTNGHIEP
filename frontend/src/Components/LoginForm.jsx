// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
export default function LoginForm({
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  errorMsg,
  handleAuthSubmit,
  setShowForgot,
  setIsLogin,
  containerVariants,
  textVariants,
  inputVariants,
  buttonVariants,
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
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
          Đăng Nhập
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          Chào mừng bạn quay lại! Hãy đăng nhập để tiếp tục.
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
          placeholder="Nhập email"
          autoComplete="email" // Thêm dòng này để bật gợi ý email
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-blue-50/40"
          value={loginEmail}
          onChange={e => setLoginEmail(e.target.value)}
        />
      </motion.div>
    {/* Password input + con mắt */}
      <motion.div variants={inputVariants} className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          placeholder="Mật khẩu"
          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 pr-12"
          required
        />
        <div
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </div>
      </motion.div>
      {errorMsg && (
        <div className="text-red-500 text-sm">{errorMsg}</div>
      )}
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
      <motion.button
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        type="submit"
        className="w-full py-3 px-4 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg shadow-lg transition-all duration-200 tracking-wide"
      >
        Đăng Nhập
      </motion.button>
      <motion.div
        variants={textVariants}
        className="mt-7 text-center text-sm"
      >
        <span className="text-gray-600">
          Chưa có tài khoản?
        </span>
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsLogin(false)}
          className="ml-2 text-blue-600 font-semibold hover:text-purple-600 transition-colors"
        >
          Đăng ký ngay
        </motion.button>
      </motion.div>
    </motion.form>
  );
}