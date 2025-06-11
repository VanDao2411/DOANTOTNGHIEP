import React, { useEffect } from 'react';
import { useCart } from '../../Context/CartProvide';
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaEye } from "react-icons/fa";

const Historie = () => {
  const { viewHistory, setViewHistory } = useCart();
  const navigate = useNavigate();
  const user_id = localStorage.getItem(`user_id`);

  useEffect(() => {
    // Nếu chưa đăng nhập thì chuyển hướng sang trang login
    if (!localStorage.getItem(`username_${user_id}`)) {
      navigate("/login");
    }
  }, [navigate, user_id]);

  // Hàm xóa khỏi lịch sử với xác nhận
  const removeFromHistory = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa tài liệu này khỏi lịch sử?")) {
      const newHistory = viewHistory.filter(item => item.id !== id);
      setViewHistory(newHistory);
      // Nếu bạn lưu lịch sử vào localStorage, cập nhật luôn:
      localStorage.setItem(`viewHistory_${user_id}`, JSON.stringify(newHistory));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#80244d] mb-8 text-center">Lịch Sử Đã Xem Tài Liệu</h1>
      {viewHistory.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <img src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" alt="empty" className="w-32 h-32 mb-4 opacity-60" />
          <p className="text-gray-600 text-lg">Bạn chưa xem tài liệu nào gần đây.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {viewHistory.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col hover:shadow-2xl transition group relative overflow-hidden"
            >
              <div
                className="cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
                title="Xem chi tiết"
              >
                <img
                  src={product.fileUrl}
                  alt={product.title}
                  className="h-48 w-full object-cover rounded-t-2xl group-hover:scale-105 transition-transform"
                />
                <div className="p-4">
                  <div className="font-bold text-lg mb-1 text-[#80244d] truncate">{product.title}</div>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-2">
                    <span>
                      Thể loại:{" "}
                      <span className="text-[#e95834]">
                        {Array.isArray(product.categoryIds) && product.categoryIds.length > 0
                          ? product.categoryIds.map(cat => cat.name).join(", ")
                          : "Đang cập nhật"}
                      </span>
                    </span>
                    <span>Tác giả: <span className="text-[#e95834]">{product.authorName}</span></span>
                  </div>
                  <div className="line-clamp-3 text-gray-700 text-sm mb-2">{product.description}</div>
                </div>
              </div>
              <div className="flex gap-2 px-4 pb-4 mt-auto">
                <button
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#2563eb] to-[#60a5fa] text-white rounded-lg hover:from-[#1d4ed8] hover:to-[#3b82f6] transition font-semibold shadow"
                  onClick={e => {
                    e.stopPropagation();
                    navigate(`/product/${product.id}`);
                  }}
                  title="Xem chi tiết"
                >
                  <FaEye className="inline" /> Xem chi tiết
                </button>
                <button
                  className="flex items-center justify-center px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition shadow"
                  onClick={e => {
                    e.stopPropagation();
                    removeFromHistory(product.id);
                  }}
                  title="Xóa khỏi lịch sử"
                >
                  <FaTrashAlt className="inline" />
                </button>
              </div>
              {/* <div className="absolute top-2 right-2">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">{product.category}</span>
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Historie;