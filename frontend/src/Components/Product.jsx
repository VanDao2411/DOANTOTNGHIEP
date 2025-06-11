import React, { useEffect, useState } from 'react';
import { useCart } from '../Context/CartProvide';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';

const Product = () => {
  const navigate = useNavigate();
  const { addToHistory } = useCart();
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [message, setMessage] = useState('');
  const user_id = localStorage.getItem(`user_id`);

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
      .catch((err) => console.error('Lỗi khi lấy dữ liệu:', err));
  }, []);
  console.log('Products:', products);

  const visibleProducts = products.slice(0, visibleCount);

  const handleProductClick = (product) => {
    addToHistory(product);

    navigate(`/product/${product.id}`);
  };

  const handleDownload = (product) => {
    const pointsKey = `points_${user_id}`;
    let currentPoints = parseInt(localStorage.getItem(pointsKey) || "100", 10);

    if (currentPoints < 5) {
      setMessage("Bạn không đủ điểm để tải tài liệu!");
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    // Trừ điểm
    currentPoints -= 5;
    localStorage.setItem(pointsKey, currentPoints.toString());

    setMessage('Download thành công! Bạn còn ' + currentPoints + ' điểm.');

    const whitelistKey = `uploadedFiles_${user_id}`;
    const currentWhitelist = JSON.parse(localStorage.getItem(whitelistKey)) || [];
    const newItem = {
      id: product._id,
      fileName: product.name,
      title: product.name,
      category: product.category || "Chưa cập nhật",
      price: product.price || "Chưa cập nhật",
      description: product.description || "Chưa cập nhật",
      fileUrl: product.image || "",
      type: "download",
    };
    const updatedWhitelist = [newItem, ...currentWhitelist.filter(item => item.id !== newItem.id)];
    localStorage.setItem(whitelistKey, JSON.stringify(updatedWhitelist));
    setTimeout(() => setMessage(''), 3000);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  // Khởi tạo điểm nếu chưa có
  useEffect(() => {
    if (user_id && !localStorage.getItem(`points_${user_id}`)) {
      localStorage.setItem(`points_${user_id}`, "100");
    }
  }, [user_id]);

  return (
    <div className="mt-10 px-5">
      {/* Lưới sản phẩm: luôn 5 cột */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product._id}
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