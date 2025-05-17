import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiProducts from "../../apis/apiProducts.json";

// Hàm tạo slug từ tên chủ đề
const toSlug = (str) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const categories = [
  "Tất cả",
  ...Array.from(new Set(apiProducts.map((b) => b.category))),
];

const timeTabs = [
  { label: "Top ngày", value: "day" },
  { label: "Top tuần", value: "week" },
  { label: "Top tháng", value: "month" },
];

const Books = () => {
  const navigate = useNavigate();
  const { slug: urlSlug } = useParams();

  // Tìm chủ đề theo slug trên url, nếu không có thì mặc định "Tất cả"
  const findCategoryBySlug = (slug) => {
    if (!slug) return "Tất cả";
    const found = categories.find((cat) => toSlug(cat) === slug);
    return found || "Tất cả";
  };

  const [selectedCategory, setSelectedCategory] = useState(findCategoryBySlug(urlSlug));
  const [selectedTab, setSelectedTab] = useState("day");
  // eslint-disable-next-line no-unused-vars
  const [slug, setSlug] = useState(urlSlug || toSlug("Tất cả"));

  // Khi urlSlug thay đổi, cập nhật state
  useEffect(() => {
    setSelectedCategory(findCategoryBySlug(urlSlug));
    setSlug(urlSlug || toSlug("Tất cả"));
  }, [urlSlug]);

  // Lọc sách theo chủ đề
  const filteredBooks =
    selectedCategory === "Tất cả"
      ? apiProducts
      : apiProducts.filter((b) => b.category === selectedCategory);

  // Sắp xếp sách theo lượt download (giả lập top)
  const sortedBooks = [...filteredBooks].sort(
    (a, b) =>
      parseInt(b.downloaded.replace(/[^\d]/g, "")) -
      parseInt(a.downloaded.replace(/[^\d]/g, ""))
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Navbar bên trái ẩn trên mobile, hiện trên md trở lên */}
      <aside className="hidden md:block w-60 bg-white border-r p-6 h-screen sticky top-0 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Chủ đề sách</h2>
        <ul>
          {categories.map((cat) => (
            <li key={cat}>
              <button
                className={`w-full text-left px-3 py-2 rounded mb-1 transition ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white font-semibold"
                    : "hover:bg-blue-100"
                }`}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSlug(toSlug(cat));
                  // Đẩy slug lên url
                  if (cat === "Tất cả") navigate("/books");
                  else navigate(`/books/${toSlug(cat)}`);
                }}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Nội dung bên phải có scroll riêng */}
      <main className="flex-1 p-8 h-screen overflow-y-auto scrollbar-hide">
        {/* Tabs top ngày/tuần/tháng */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Danh sách sách</h1>
          <div className="flex gap-2">
            {timeTabs.map((tab) => (
              <button
                key={tab.value}
                className={`px-4 py-2 rounded ${
                  selectedTab === tab.value
                    ? "bg-blue-600 text-white font-semibold"
                    : "bg-white border hover:bg-blue-100"
                }`}
                onClick={() => setSelectedTab(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {/* Danh sách sách */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl shadow p-4 flex flex-col hover:shadow-lg transition"
            >
              <img
                src={book.image}
                alt={book.name}
                className="h-48 w-full object-cover rounded mb-3"
              />
              <div className="font-bold text-lg mb-1">{book.name}</div>
              <div className="text-sm text-gray-500 mb-2">{book.author}</div>
              <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-2">
                <span>Thể loại: {book.category}</span>
                <span>Lượt tải: {book.downloaded}</span>
                <span>Lượt xem: {book.viewed}</span>
              </div>
              <div className="line-clamp-3 text-gray-700 text-sm mb-2">{book.description}</div>
              <button className="mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Dowload
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Books;