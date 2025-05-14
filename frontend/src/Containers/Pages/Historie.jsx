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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {viewHistory.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-[#80244d]">{product.name}</h3>
                <h3 className="text-[#8e9293] text-[18px] pl-10">Đã tải về: <span className='font-sans text-[#e95834]'>{product.viewed}</span> </h3>
                <h3 className='text-[#8e9293] text-[14px] pl-10'>Đã xem: <span className='font-sans text-[#e95834]'>{product.downloaded}</span> </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Historie;