import React, { useEffect, useState } from 'react';
import { useCart } from '../Context/CartProvide';
import { useNavigate } from 'react-router-dom';

// Component con: ProductCard
const ProductCard = ({ product, onClick, onDownload }) => {
  return (
    <div
      onClick={() => onClick(product)}
      className="bg-white rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105 flex flex-col w-full"
      style={{ height: '270px', flexShrink: 0 }}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-2/3 object-cover rounded-t-lg"
      />
      <div className="px-3 py-1 flex-1 flex flex-col justify-between">
        <h3 className="text-[#80244d] font-semibold text-sm truncate">{product.name}</h3>
        <button
          className="mt-2 w-full py-1 bg-[#e95834] rounded text-white text-sm"
          onClick={(e) => {
            e.stopPropagation(); // Không bị trigger click vào sản phẩm
            onDownload(product);
          }}
        >
          Download
        </button>
      </div>
    </div>
  );
};

// Component chính: Product
const Product = () => {
  const navigate = useNavigate();
  const { addToCart, addToHistory } = useCart();
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch('/src/apis/apiProducts.json')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Lỗi khi lấy dữ liệu:', err));
  }, []);

  const visibleProducts = showAll ? products : products.slice(0, 9);

  const handleProductClick = (product) => {
    addToHistory(product);
    navigate(`/product/${product.id}`);
  };

  const handleDownload = (product) => {
    addToCart(product);
  };

  return (
    <div className="mt-10 px-5">
      {/* Lưới sản phẩm responsive */}
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
      {!showAll && products.length > 9 && (
        <div className="flex justify-center mt-6">
          <button
            className="px-6 py-2 bg-[#e95834] text-white rounded-lg text-sm"
            onClick={() => setShowAll(true)}
          >
            Xem thêm
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;
