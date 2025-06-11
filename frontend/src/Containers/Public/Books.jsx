import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaBook, FaDownload, FaTags } from "react-icons/fa";

const timeTabs = [
  { label: "Top ngày", value: "day" },
  { label: "Top tuần", value: "week" },
  { label: "Top tháng", value: "month" },
];

const Books = () => {
  const navigate = useNavigate();
  const { slug: urlSlug } = useParams();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({ _id: "all", name: "Tất cả", slug: "tat-ca" });
  const [selectedTab, setSelectedTab] = useState("day");

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/categories")
      .then((res) => res.json())
      .then((data) => {
        const apiCategories = data.data.categories || [];
        setCategories([{ _id: "all", name: "Tất cả", slug: "tat-ca" }, ...apiCategories]);
      })
      .catch((err) => {
        setCategories([{ _id: "all", name: "Tất cả", slug: "tat-ca" }]);
        console.error("Lỗi khi lấy category:", err);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/documents", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data.data.documents || []))
      .catch((err) => {
        setProducts([]);
        console.error("Lỗi khi lấy dữ liệu:", err);
      });
  }, []);

  useEffect(() => {
    if (!categories.length) return;
    const found =
      categories.find((cat) => cat.slug === (urlSlug || "tat-ca")) ||
      categories[0];
    setSelectedCategory(found);
  }, [urlSlug, categories]);

  const filteredBooks =
    selectedCategory._id === "all"
      ? products
      : products.filter(
          (b) =>
            Array.isArray(b.categoryIds) &&
            b.categoryIds.some((cat) => cat._id === selectedCategory._id)
        );

  const sortedBooks = [...filteredBooks].sort(
    (a, b) => (b.downloadCount || 0) - (a.downloadCount || 0)
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Sidebar category */}
      <aside className="hidden md:block w-64 bg-white border-r p-6 h-screen sticky top-0 overflow-y-auto shadow-md">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-blue-700">
          <FaTags className="text-blue-500" /> Chủ đề sách
        </h2>
        <ul>
          {categories.map((cat) => (
            <li key={cat._id}>
              <button
                className={`w-full text-left px-4 py-2 rounded-lg mb-2 flex items-center gap-2 transition font-medium
                  ${
                    selectedCategory._id === cat._id
                      ? "bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow"
                      : "bg-blue-50 hover:bg-blue-200 text-blue-700"
                  }
                `}
                onClick={() => {
                  if (cat._id === "all") navigate("/books");
                  else navigate(`/books/${cat.slug}`);
                }}
              >
                <FaBook className="text-blue-400" />
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10 h-screen overflow-y-auto">
        {/* Tabs */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-blue-700">Danh sách sách</h1>
          <div className="flex gap-2">
            {timeTabs.map((tab) => (
              <button
                key={tab.value}
                className={`px-4 py-2 rounded-lg font-semibold transition
                  ${
                    selectedTab === tab.value
                      ? "bg-blue-600 text-white shadow"
                      : "bg-white border border-blue-200 hover:bg-blue-100 text-blue-700"
                  }
                `}
                onClick={() => setSelectedTab(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {/* Book grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {sortedBooks.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-2xl shadow-lg border border-blue-100 flex flex-col hover:shadow-2xl transition group relative overflow-hidden"
            >
              <img
                src={book.fileUrl}
                alt={book.title}
                className="h-52 w-full object-cover rounded-t-2xl group-hover:scale-105 transition-transform bg-blue-50"
              />
              <div className="p-4 flex-1 flex flex-col">
                <div className="font-bold text-lg mb-1 text-blue-800 truncate" title={book.title}>
                  {book.title}
                </div>
                <div className="text-sm text-blue-500 mb-2 truncate">{book.authorName}</div>
                <div className="flex flex-wrap gap-2 text-xs text-blue-700 mb-2">
                  <span>
                    <span className="font-semibold">Thể loại:</span>{" "}
                    <span className="text-blue-500">
                      {Array.isArray(book.categoryIds) && book.categoryIds.length > 0
                        ? book.categoryIds.map((cat) => cat.name).join(", ")
                        : "Đang cập nhật"}
                    </span>
                  </span>
                  <span>
                    <span className="font-semibold">Tải:</span>{" "}
                    <span className="text-blue-500">{book.downloadCount ?? 0}</span>
                  </span>
                  <span>
                    <span className="font-semibold">Xem:</span>{" "}
                    <span className="text-blue-500">{book.viewCount ?? 0}</span>
                  </span>
                </div>
                <div className="line-clamp-3 text-gray-600 text-sm mb-3">{book.description}</div>
                <button
                  className="mt-auto flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#2563eb] to-[#60a5fa] text-white rounded-lg hover:from-[#1d4ed8] hover:to-[#3b82f6] transition font-semibold shadow"
                  title="Tải xuống"
                >
                  <FaDownload className="text-base" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
        {sortedBooks.length === 0 && (
          <div className="text-center text-blue-700 mt-12 text-lg font-semibold">
            Không có sách nào trong chủ đề này.
          </div>
        )}
      </main>
    </div>
  );
};

export default Books;