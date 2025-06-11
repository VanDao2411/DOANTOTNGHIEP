// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

export default function RegisterForm({
  registerUsername,
  setRegisterUsername,
  registerEmail,
  setRegisterEmail,
  registerPassword,
  setRegisterPassword,
  registerPassword2,
  setRegisterPassword2,
  errorMsg,
  handleRegister,
  setIsLogin,
  containerVariants,
  textVariants,
  inputVariants,
  buttonVariants,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  return (
    <motion.form
      key="register"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onSubmit={handleRegister}
      className="space-y-5"
    >
      <motion.div variants={textVariants} className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow">
          Đăng Ký
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          Tạo tài khoản mới để trải nghiệm đầy đủ chức năng.
        </p>
      </motion.div>
      <motion.div variants={inputVariants}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tên đăng nhập
        </label>
        <motion.input
          whileFocus={{
            scale: 1.01,
            boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
          }}
          type="text"
          placeholder="Nhập tên đăng nhập"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-blue-50/40"
          value={registerUsername}
          onChange={e => setRegisterUsername(e.target.value)}
        />
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
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-blue-50/40"
          value={registerEmail}
          onChange={e => setRegisterEmail(e.target.value)}
        />
      </motion.div>
      <motion.div variants={inputVariants} className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mật khẩu
        </label>
        <motion.input
          whileFocus={{
            scale: 1.01,
            boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
          }}
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-blue-50/40 pr-12"
          value={registerPassword}
          onChange={e => setRegisterPassword(e.target.value)}
        />
        <div
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
          style={{ zIndex: 10 }}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </div>
      </motion.div>
      <motion.div variants={inputVariants} className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Xác nhận mật khẩu
        </label>
        <motion.input
          whileFocus={{
            scale: 1.01,
            boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
          }}
          type={showPassword2 ? "text" : "password"}
          placeholder="••••••••"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-blue-50/40 pr-12"
          value={registerPassword2}
          onChange={e => setRegisterPassword2(e.target.value)}
        />
        <div
          onClick={() => setShowPassword2(!showPassword2)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
          style={{ zIndex: 10 }}
        >
          {showPassword2 ? <EyeOff size={20} /> : <Eye size={20} />}
        </div>
      </motion.div>
      {errorMsg && (
        <div className="text-red-500 text-sm">{errorMsg}</div>
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
        Đăng Ký
      </motion.button>
      <motion.div
        variants={textVariants}
        className="mt-7 text-center text-sm"
      >
        <span className="text-gray-600">
          Đã có tài khoản?
        </span>
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsLogin(true)}
          className="ml-2 text-blue-600 font-semibold hover:text-purple-600 transition-colors"
        >
          Đăng nhập
        </motion.button>
      </motion.div>
    </motion.form>
  );
}