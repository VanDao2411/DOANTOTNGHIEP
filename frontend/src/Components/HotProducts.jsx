import React, { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartProvide";
const centerIndex = 3;

const HotProducts = () => {
    const [products, setProducts] = useState([]); // Lấy từ API
    const [center, setCenter] = useState(centerIndex);
    const timerRef = useRef();
    const navigate = useNavigate();
    const { addToCart, addToHistory } = useCart();
    const [message, setMessage] = useState('');

    // Gọi API lấy sản phẩm hot khi component mount
    useEffect(() => {
        fetch('http://localhost:5000/api/v1/documents', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((data) => setProducts(data.data.documents || []))
            .catch((err) => {
                setProducts([]);
                console.error('Lỗi khi lấy dữ liệu:', err);
            });
    }, []);

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
        if (products.length === 0) return;
        timerRef.current = setTimeout(() => {
            handleNext();
        }, 5000);
        return () => clearTimeout(timerRef.current);
    }, [center, products.length]);

    const handleProductClick = (product) => {
        addToHistory(product);
        navigate(`/product/${product.id}`);
    };
    const handleDownload = (product) => {
        addToCart(product);
        setMessage('Download thành công!');
        setTimeout(() => setMessage(''), 3000);
    };

    if (products.length === 0) {
        return (
            <div className="flex justify-center items-center h-[340px]">
                <span>Đang tải sản phẩm...</span>
            </div>
        );
    }

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
                                src={product.fileUrl}
                                alt={product.title}
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
                                                    : 140,
                                    height:
                                        displayDiff === 0
                                            ? 260
                                            : Math.abs(displayDiff) === 1
                                                ? 240
                                                : Math.abs(displayDiff) === 2
                                                    ? 220
                                                    : 200,
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
                                        <div
                                          className="text-base md:text-lg font-bold text-center max-w-[200px] truncate"
                                          title={product.title}
                                        >
                                          {product.title}
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