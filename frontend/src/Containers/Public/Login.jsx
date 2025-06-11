import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ForgotForm from "../../Components/ForgotForm";
import LoginForm from "../../Components/LoginForm";
import RegisterForm from "../../Components/RegisterForm";

const API_URL = "http://localhost:5000"; // Hard-code URL thay cho process.env

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgot, setShowForgot] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPassword2, setRegisterPassword2] = useState("");
  const navigate = useNavigate();

  // Đăng nhập
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    try {
      console.log("Gọi API:", `${API_URL}/api/v1/auth/login`);
      const res = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });
      const data = await res.json();
      console.log("Kết quả trả về:", data);
      if (res.ok) {
        const user = data.data && data.data.user;
        if (user && user.username) {
          localStorage.setItem(`username_${user._id}`, user.username);
          localStorage.setItem(`user_id`, user._id);
          localStorage.setItem(`role`, user.role || "user");
          localStorage.setItem("token", data.token);
          window.dispatchEvent(new Event("usernameChanged"));
        }
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          if (user && user.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }

        }, 100);
      } else {
        setErrorMsg(data.message || "Đăng nhập thất bại!");
      }
    } catch (err) {
      console.error("Lỗi kết nối server:", err);
      setErrorMsg("Lỗi kết nối server!");
    }
    setLoading(false);
  };

  // Đăng ký
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (
      !registerUsername ||
      !registerEmail ||
      !registerPassword ||
      !registerPassword2
    ) {
      setErrorMsg("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (registerPassword !== registerPassword2) {
      setErrorMsg("Mật khẩu xác nhận không khớp!");
      return;
    }
    setLoading(true);
    try {
      console.log("Gọi API:", `${API_URL}/api/v1/auth/signup`);
      console.log("Dữ liệu gửi:", {
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
        passwordConfirm: registerPassword2,
      });

      const res = await fetch(`${API_URL}/api/v1/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: registerUsername,
          email: registerEmail,
          password: registerPassword,
          passwordConfirm: registerPassword2,
        }),
      });
      const data = await res.json();
      console.log("Kết quả trả về:", data);
      if (res.ok) {
        if (data.user && data.user.username) {
          localStorage.setItem("username", data.user.username);
          window.dispatchEvent(new Event("usernameChanged"));
        }
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setIsLogin(true);
        }, 1500);
      } else {
        setErrorMsg(data.message || "Đăng ký thất bại!");
      }
    } catch (err) {
      console.error("Lỗi kết nối server:", err);
      setErrorMsg("Lỗi kết nối server!");
    }
    setLoading(false);
  };

  // Quên mật khẩu
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    try {
      console.log("Gọi API:", `${API_URL}/api/v1/auth/forgot-password`);
      const res = await fetch(`${API_URL}/api/v1/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await res.json();
      console.log("Kết quả trả về:", data);
      setShowForgot(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1500);
    } catch (err) {
      console.error("Lỗi kết nối server:", err);
      setErrorMsg("Không thể gửi yêu cầu. Vui lòng thử lại!");
    }
    setLoading(false);
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
      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

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

      {/* Thông báo thành công */}
      <AnimatePresence>
        {successMessage && ( // <<<--- SỬ DỤNG 'successMessage' STATE
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg font-semibold text-lg"
          >
            {isLogin ? "Đăng nhập thành công!" : "Đăng ký thành công!"}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form */}
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
                <ForgotForm
                  forgotEmail={forgotEmail}
                  setForgotEmail={setForgotEmail}
                  errorMsg={errorMsg}
                  handleForgotSubmit={handleForgotSubmit}
                  setShowForgot={setShowForgot}
                  containerVariants={containerVariants}
                  textVariants={textVariants}
                  inputVariants={inputVariants}
                  buttonVariants={buttonVariants}
                />
              ) : isLogin ? (
                <LoginForm
                  loginEmail={loginEmail}
                  setLoginEmail={setLoginEmail}
                  loginPassword={loginPassword}
                  setLoginPassword={setLoginPassword}
                  errorMsg={errorMsg}
                  handleAuthSubmit={handleAuthSubmit}
                  setShowForgot={setShowForgot}
                  setIsLogin={setIsLogin}
                  containerVariants={containerVariants}
                  textVariants={textVariants}
                  inputVariants={inputVariants}
                  buttonVariants={buttonVariants}
                />
              ) : (
                <RegisterForm
                  registerUsername={registerUsername}
                  setRegisterUsername={setRegisterUsername}
                  registerEmail={registerEmail}
                  setRegisterEmail={setRegisterEmail}
                  registerPassword={registerPassword}
                  setRegisterPassword={setRegisterPassword}
                  registerPassword2={registerPassword2}
                  setRegisterPassword2={setRegisterPassword2}
                  errorMsg={errorMsg}
                  handleRegister={handleRegister}
                  setIsLogin={setIsLogin}
                  containerVariants={containerVariants}
                  textVariants={textVariants}
                  inputVariants={inputVariants}
                  buttonVariants={buttonVariants}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
