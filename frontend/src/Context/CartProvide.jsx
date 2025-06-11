import React, { createContext, useState, useContext, useEffect } from "react";

// 1. Tạo Context
const CartContext = createContext();

// 2. Provider để chứa state
export const CartProvider = ({ children }) => {
  // Lấy userId từ localStorage hoặc mặc định
  const [userId, setUserId] = useState(localStorage.getItem("user_id") || "default_user");

  const getUsername = () => localStorage.getItem(`username_${userId}`) || "";

  const [cartItems, setCartItems] = useState([]);
  const [viewHistory, setViewHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(`viewHistory_${userId}`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Cập nhật userId khi localStorage thay đổi (trong cùng tab)
  useEffect(() => {
    const interval = setInterval(() => {
      const newUserId = localStorage.getItem("user_id") || "default_user";
      setUserId((prevId) => (prevId !== newUserId ? newUserId : prevId));
    }, 1000); // kiểm tra mỗi giây

    return () => clearInterval(interval);
  }, []);

  // Load dữ liệu từ localStorage khi khởi động
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) setCartItems(JSON.parse(savedCart));
    } catch {
      setCartItems([]);
    }
  }, []);

  // Luôn load lại viewHistory khi userId thay đổi
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(`viewHistory_${userId}`);
      setViewHistory(savedHistory ? JSON.parse(savedHistory) : []);
    } catch {
      setViewHistory([]);
    }
  }, [userId]);

  // Lưu cart và viewHistory vào localStorage khi có thay đổi
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    const username = getUsername();
    if (username) {
      localStorage.setItem(`viewHistory_${userId}`, JSON.stringify(viewHistory));
    }
  }, [cartItems, viewHistory, userId]);

  const addToHistory = (product) => {
    setViewHistory((prevHistory) => {
      const existingIndex = prevHistory.findIndex(item => item.id === product.id);
      let updatedHistory;
      if (existingIndex >= 0) {
        updatedHistory = [
          product,
          ...prevHistory.filter(item => item.id !== product.id)
        ];
      } else {
        updatedHistory = [product, ...prevHistory];
      }
      return updatedHistory.slice(0, 10); // giới hạn 10 sản phẩm
    });
  };

  const clearHistory = () => {
    setViewHistory([]);
    const username = getUsername();
    if (username) localStorage.removeItem(`viewHistory_${userId}`);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        viewHistory,
        setViewHistory,
        addToHistory,
        clearHistory
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 3. Hook để sử dụng context
export const useCart = () => {
  return useContext(CartContext);
};
