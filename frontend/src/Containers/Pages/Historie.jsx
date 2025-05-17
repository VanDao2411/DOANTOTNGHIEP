import React from 'react';
import { useCart } from '../../Context/CartProvide';
import { useNavigate } from "react-router-dom";

const Historie = () => {
  const { viewHistory } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#80244d] mb-8">Lịch Sử Đã Xem Tài Liệu</h1>
      {viewHistory.length === 0 ? (
        <p className="text-gray-600">Bạn chưa xem tài liệu nào gần đây.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {viewHistory.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow p-4 flex flex-col hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover rounded mb-3"
              />
              <div className="font-bold text-lg mb-1 text-[#80244d]">{product.name}</div>
              <div className="text-sm text-gray-500 mb-2">{product.author}</div>
              <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-2">
                <span>Thể loại: {product.category}</span>
                <span>Lượt tải: <span className="text-[#e95834]">{product.downloaded}</span></span>
                <span>Lượt xem: <span className="text-[#e95834]">{product.viewed}</span></span>
              </div>
              <div className="line-clamp-3 text-gray-700 text-sm mb-2">{product.description}</div>
              <button
                className="mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={e => {
                  e.stopPropagation();
                  navigate(`/product/${product.id}`);
                }}
              >
                Xem chi tiết
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Historie;