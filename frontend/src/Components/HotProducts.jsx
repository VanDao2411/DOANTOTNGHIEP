import React, { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import apiProducts from "../apis/apiProducts.json";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartProvide";
const centerIndex = 3;

const HotProducts = () => {
    const products = apiProducts.slice(0, 10); // Lấy 10 sản phẩm đầu tiên
    const [center, setCenter] = useState(centerIndex);
    const timerRef = useRef();
    const navigate = useNavigate();
    const { addToCart, addToHistory } = useCart();
    const [message, setMessage] = useState('');

    // Khi click vào sản phẩm, đưa nó ra giữa
    const handleClick = (idx) => {
        if (idx !== center) setCenter(idx);
    };

    // Chuyển sang sản phẩm tiếp theo (vòng tròn)
    const handleNext = () => {
        setCenter((prev) => (prev + 1) % products.length);
    };

    // Chuyển sang sản phẩm trước đó (vòng tròn)
    const handlePrev = () => {
        setCenter((prev) => (prev - 1 + products.length) % products.length);
    };

    // Tự động chuyển đổi sản phẩm sau 5 giây
    useEffect(() => {
        timerRef.current = setTimeout(() => {
            handleNext();
        }, 5000);
        return () => clearTimeout(timerRef.current);
    }, [center]);

    const handleProductClick = (product) => {
        addToHistory(product);
        navigate(`/product/${product.id}`);
    };
    const handleDownload = (product) => {
        addToCart(product);
        setMessage('Download thành công!');
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className="relative flex justify-center items-center h-[340px] select-none">
            {/* Nút trái */}
            <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-blue-100 rounded-full p-2 shadow transition"
                aria-label="Sản phẩm trước"
            >
                <FaChevronLeft size={24} />
            </button>
            {/* Nút phải */}
            <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-blue-100 rounded-full p-2 shadow transition"
                aria-label="Sản phẩm sau"
            >
                <FaChevronRight size={24} />
            </button>
            <div className="relative flex w-full justify-center items-center">
                {products.map((product, idx) => {
                    // Tính toán vị trí thực tế dạng vòng tròn
                    const diff = idx - center;
                    let displayDiff = diff;
                    const half = Math.floor(products.length / 2);
                    if (diff > half) displayDiff = diff - products.length;
                    if (diff < -half) displayDiff = diff + products.length;
                    const absDiff = Math.abs(displayDiff);

                    // Chỉ hiển thị đúng 3 bên trái, 3 bên phải, 1 center
                    if (absDiff > 3) return null;

                    // Tách đều các sản phẩm hai bên
                    const GAP = 180; // khoảng cách đều giữa các sản phẩm
                    let x = displayDiff * GAP;

                    return (
                        <motion.div
                            key={product.id}
                            layout
                            initial={false}
                            animate={{
                                scale:
                                    displayDiff === 0
                                        ? 1.2
                                        : Math.abs(displayDiff) === 1
                                            ? 1
                                            : Math.abs(displayDiff) === 2
                                                ? 0.85
                                                : 0.7,
                                x,
                                zIndex: 10 - absDiff,
                                opacity: 1,
                                filter: displayDiff === 0 ? "none" : "grayscale(60%) blur(1px)",
                                cursor: displayDiff === 0 ? "default" : "pointer",
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="absolute"
                            style={{
                                left: "45%",
                                top: -80,
                                transform: "translateX(-50%)",
                                zIndex: 10 - absDiff,
                                opacity: 1,
                                pointerEvents: "auto",
                            }}
                            onClick={() => handleClick(idx)}
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className={`rounded-xl shadow-lg transition-all duration-300`}
                                onClick={() => handleProductClick(product)}
                                style={{
                                    width:
                                        displayDiff === 0
                                            ? 200
                                            : Math.abs(displayDiff) === 1
                                                ? 180
                                                : Math.abs(displayDiff) === 2
                                                    ? 160
                                                    : 140, // tăng từ 100 lên 110 cho ảnh ngoài cùng
                                    height:
                                        displayDiff === 0
                                            ? 260
                                            : Math.abs(displayDiff) === 1
                                                ? 240
                                                : Math.abs(displayDiff) === 2
                                                    ? 220
                                                    : 200, // tăng từ 120 lên 130 cho ảnh ngoài cùng
                                    filter:
                                        displayDiff === 0
                                            ? "none"
                                            : "grayscale(60%) blur(1px)",
                                    cursor: displayDiff === 0 ? "default" : "pointer",
                                    objectFit: "cover",
                                    background: "#fff",
                                }}
                            />
                            <AnimatePresence>
                                {displayDiff === 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 30 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex flex-col items-center mt-1 mb-12"
                                    >
                                        <div className="text-base md:text-lg font-bold text-center">
                                            {product.name}
                                        </div>
                                        <button
                                            className="mt-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                            onClick={() => handleDownload(product)}
                                        >
                                            Download
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
            {message && (
                <div className="fixed top-[80px] right-5 bg-green-500 text-white px-4 py-2 rounded shadow-md">
                    {message}
                </div>
            )}
        </div>
    );
};

export default HotProducts;