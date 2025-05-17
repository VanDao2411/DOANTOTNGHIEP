import React, { useState } from "react";
import apiProducts from "../../apis/apiProducts.json";

// Hàm tạo slug từ tên chủ đề
// eslint-disable-next-line no-unused-vars
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

const Docs = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedTab, setSelectedTab] = useState("day");

  // Lọc tài liệu theo chủ đề
  const filteredDocs =
    selectedCategory === "Tất cả"
      ? apiProducts
      : apiProducts.filter((b) => b.category === selectedCategory);

  // Sắp xếp tài liệu theo lượt download (giả lập top)
  const sortedDocs = [...filteredDocs].sort(
    (a, b) =>
      parseInt(b.downloaded.replace(/[^\d]/g, "")) -
      parseInt(a.downloaded.replace(/[^\d]/g, ""))
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Navbar bên trái */}
      <aside className="w-60 bg-white border-r p-6">
        <h2 className="text-lg font-bold mb-4">Chủ đề tài liệu</h2>
        <ul>
          {categories.map((cat) => (
            <li key={cat}>
              <button
                className={`w-full text-left px-3 py-2 rounded mb-1 transition ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white font-semibold"
                    : "hover:bg-blue-100"
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Nội dung bên phải */}
      <main className="flex-1 p-8">
        {/* Tabs top ngày/tuần/tháng */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Danh sách tài liệu</h1>
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
        {/* Danh sách tài liệu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-xl shadow p-4 flex flex-col hover:shadow-lg transition"
            >
              <img
                src={doc.image}
                alt={doc.name}
                className="h-48 w-full object-cover rounded mb-3"
              />
              <div className="font-bold text-lg mb-1">{doc.name}</div>
              <div className="text-sm text-gray-500 mb-2">{doc.author}</div>
              <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-2">
                <span>Thể loại: {doc.category}</span>
                <span>Lượt tải: {doc.downloaded}</span>
                <span>Lượt xem: {doc.viewed}</span>
              </div>
              <div className="line-clamp-3 text-gray-700 text-sm mb-2">{doc.description}</div>
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

export default Docs;