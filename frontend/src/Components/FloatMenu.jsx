import { useState, useRef, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import icons from "../Ultis/icons";

const {
  SiZalo,
  MdLocalPhone,
  FaPhoneAlt,
  IoMdAdd,
  AiOutlineClose,
  BsChatDots,
  BsEnvelope,
  BsGeoAlt,
  GrContact,
} = icons;

const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showChatBox, setShowChatBox] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Xin chào! Chúng tôi có thể giúp gì cho bạn?", isUser: false },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const [lastMessageIsUser, setLastMessageIsUser] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Kiểm tra nếu có tin nhắn mới từ hệ thống và chat box đang đóng
    if (!showChatBox && !lastMessageIsUser && messages.length > 1) {
      setUnreadCount((prev) => prev + 1);
    }
    setLastMessageIsUser(messages[messages.length - 1]?.isUser || false);
    scrollToBottom();
  }, [messages, showChatBox]);

  const handleChatBoxClick = () => {
    setShowChatBox(true);
    setIsOpen(false);
    setUnreadCount(0); // Reset số tin nhắn chưa đọc khi mở chat
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    setMessages((prev) => [...prev, { text: inputMessage, isUser: true }]);
    setInputMessage("");

    // Giả lập phản hồi từ hệ thống
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.",
          isUser: false,
        },
      ]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCloseChatBox = () => {
    setShowChatBox(false); // Đóng chatbox khi click vào nút close
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Nút mở menu */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-16 h-16 bg-[#e95834] rounded-full flex flex-col items-center justify-center text-white shadow-lg hover:bg-[#e9583478] transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <AiOutlineClose size={24} /> : <GrContact size={24} />}
        {!isOpen && <h3 className="text-[13px] font-raleway mt-1">Liên Hệ</h3>}

        {/* Thông báo tin nhắn mới */}
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
          >
            {unreadCount}
          </motion.div>
        )}
      </motion.button>

      {/* Menu thả xuống */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 bg-blue-300 text-white shadow-lg rounded-lg w-56"
          >
            <ul className="flex flex-col gap-2 p-3">
              <motion.li
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 p-2 hover:bg-blue-500 rounded-md cursor-pointer"
              >
                <FaPhoneAlt className="text-red-500" /> Gọi ngay cho chúng tôi
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 p-2 hover:bg-blue-500 rounded-md cursor-pointer"
                onClick={handleChatBoxClick}
              >
                <div className="relative">
                  <SiZalo className="text-blue-400" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <span>Chat box</span>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 p-2 hover:bg-blue-500 rounded-md cursor-pointer"
              >
                <BsEnvelope className="text-green-400" /> Đăng ký & để lại lời
                nhắn
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 p-2 hover:bg-blue-500 rounded-md cursor-pointer"
              >
                <BsGeoAlt className="text-yellow-400" /> Xem địa chỉ doanh
                nghiệp
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat box */}
      <AnimatePresence>
        {showChatBox && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute bottom-20 right-0 w-[500px] bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="bg-[#e95834] text-white p-4 flex justify-between items-center">
              <h3 className="font-bold text-lg">Chat với chúng tôi</h3>
              <motion.button
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.8 }}
                onClick={handleCloseChatBox}
                className="text-white hover:text-gray-200 pointer-events-auto"
              >
                <AiOutlineClose />
              </motion.button>
            </div>
            <div className="p-5 h-[400px] overflow-y-auto">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`mb-4 flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-sm p-3 rounded-lg ${
                      message.isUser ? "bg-blue-500 text-white" : "bg-gray-100"
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="border-t p-4">
              <div className="flex gap-3">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e95834]"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  className="bg-[#e95834] text-white px-5 py-3 rounded-lg hover:bg-[#d04e2d]"
                >
                  Gửi
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingMenu;
