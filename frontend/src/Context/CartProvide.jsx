import React, { createContext, useState, useContext, useEffect } from "react";

// 1. Tạo Context
const CartContext = createContext();

// 2. Provider để chứa state
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [viewHistory, setViewHistory] = useState([]);

  // Load dữ liệu từ localStorage khi khởi động
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedHistory = localStorage.getItem("viewHistory");
    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedHistory) setViewHistory(JSON.parse(savedHistory));
  }, []);

  // Lưu vào localStorage khi có thay đổi
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    localStorage.setItem("viewHistory", JSON.stringify(viewHistory));
  }, [cartItems, viewHistory]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Nếu sản phẩm chưa có, thêm vào giỏ hàng
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const addToHistory = (product) => {
    // Kiểm tra xem sản phẩm đã có trong lịch sử chưa
    const existingIndex = viewHistory.findIndex(item => item.id === product.id);
    
    if (existingIndex >= 0) {
      // Nếu có rồi thì đưa lên đầu mảng
      const updatedHistory = [
        product,
        ...viewHistory.filter(item => item.id !== product.id)
      ];
      setViewHistory(updatedHistory.slice(0, 10)); // Giới hạn 10 sản phẩm
    } else {
      // Nếu chưa có thì thêm vào đầu mảng
      setViewHistory([product, ...viewHistory].slice(0, 10));
    }
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const updateCartItemQuantity = (id, quantity) => {
    if (quantity < 1) return; // Không cho số lượng nhỏ hơn 1
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeCartItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearHistory = () => {
    setViewHistory([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        cartCount,
        updateCartItemQuantity,
        removeCartItem,
        viewHistory,
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