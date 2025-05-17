import React, { useEffect, useState } from 'react';
import { useCart } from '../Context/CartProvide';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';

const Product = () => {
  const navigate = useNavigate();
  const { addToCart, addToHistory } = useCart();
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/src/apis/apiProducts.json')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Lỗi khi lấy dữ liệu:', err));
  }, []);

  const visibleProducts = products.slice(0, visibleCount);

  const handleProductClick = (product) => {
    addToHistory(product);
    navigate(`/product/${product.id}`);
  };

  const handleDownload = (product) => {
    addToCart(product);
    setMessage('Download thành công!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className="mt-10 px-5">
      {/* Lưới sản phẩm: luôn 5 cột */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={handleProductClick}
            onDownload={handleDownload}
          />
        ))}
      </div>

      {/* Nút Xem thêm */}
      {visibleCount < products.length && (
        <div className="flex justify-center mt-6">
          <button
            className="px-6 py-2 bg-[#e95834] text-white rounded-lg text-sm"
            onClick={handleShowMore}
          >
            Xem thêm
          </button>
        </div>
      )}

      {/* Hiển thị thông báo */}
      {message && (
        <div className="fixed top-[80px] right-5 bg-green-500 text-white px-4 py-2 rounded shadow-md">
          {message}
        </div>
      )}
    </div>
  );
};

export default Product;