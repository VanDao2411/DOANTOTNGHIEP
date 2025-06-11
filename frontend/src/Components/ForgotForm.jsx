import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function ForgotForm({
  containerVariants,
  textVariants,
  inputVariants,
  buttonVariants,
  setShowForgot,
}) {
  const [forgotEmail, setForgotEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/forgotPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMsg("Nếu email tồn tại, bạn sẽ nhận được hướng dẫn đặt lại mật khẩu.");
      } else {
        setErrorMsg(data.message || "Có lỗi xảy ra.");
      }
    } catch {
      setErrorMsg("Không thể kết nối đến máy chủ.");
    }
  };

  return (
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
          placeholder="Nhập email"
          value={forgotEmail}
          onChange={e => setForgotEmail(e.target.value)}
          autoComplete="email username" // Thêm dòng này để bật gợi ý email đã nhập trước đó
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-blue-50/40"
        />
      </motion.div>
      {errorMsg && (
        <div className="text-red-500 text-sm">{errorMsg}</div>
      )}
      {successMsg && (
        <div className="text-green-600 text-sm">{successMsg}</div>
      )}
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
  );
}