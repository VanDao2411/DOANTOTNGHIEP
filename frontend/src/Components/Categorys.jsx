import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import { useParams } from 'react-router-dom';

const slugToCategory = {
  "tinh-yeu": "Tình yêu",
  "cuoc-song": "Cuộc sống",
  "hoat-hinh": "Hoạt Hình",
  "cong-nghe": "Công Nghệ",
  "xuyen-khong": "Xuyên Không",
  "lich-su": "Lịch Sử"
};

const Categorys = () => {
  const { categorySlug } = useParams(); // Lấy slug từ URL
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch("/src/apis/apiProducts.json")
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(error => console.error("Lỗi khi tải dữ liệu:", error));
  }, []);

  useEffect(() => {
    const selectedCategory = slugToCategory[categorySlug] || "";
    if (selectedCategory) {
      setFilteredProducts(products.filter(product => product.category.toLowerCase() === selectedCategory.toLowerCase()));
    } else {
      setFilteredProducts(products);
    }
  }, [categorySlug, products]);

  return (
    <div>
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default Categorys;
