import React, { useState, useEffect } from "react";
import apiProducts from "../apis/apiProducts.json";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Tìm kiếm realtime khi nhập ký tự đầu tiên
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const filtered = apiProducts.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        (item.author && item.author.toLowerCase().includes(query.toLowerCase())) ||
        (item.category && item.category.toLowerCase().includes(query.toLowerCase()))
    );
    setResults(filtered);
  }, [query]);

  // Giữ lại handleSearch để khi nhấn Enter không bị reload trang
  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="relative min-h-screen bg-[#f0f6ff] flex flex-col items-center py-10 px-2 overflow-hidden">
      {/* Họa tiết trang trí góc trên trái */}
      <div className="absolute left-0 top-0 w-60 h-60 bg-gradient-to-br from-[#60a5fa]/40 to-transparent rounded-full blur-2xl -z-10" />
      {/* Họa tiết trang trí góc dưới phải */}
      <div className="absolute right-0 bottom-0 w-72 h-72 bg-gradient-to-tl from-[#2563eb]/30 to-transparent rounded-full blur-2xl -z-10" />
      {/* Họa tiết sóng nhẹ phía trên */}
      <svg className="absolute top-0 left-0 w-full h-24 -z-10" viewBox="0 0 1440 320">
        <path
          fill="#2563eb"
          fillOpacity="0.08"
          d="M0,96L60,117.3C120,139,240,181,360,181.3C480,181,600,139,720,133.3C840,128,960,160,1080,181.3C1200,203,1320,213,1380,218.7L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </svg>

      <form
        className="w-full max-w-xl flex items-center gap-2 mb-8"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          className="flex-1 px-4 py-3 rounded-l-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base bg-white"
          placeholder="Tìm kiếm sách, tài liệu, tác giả, thể loại..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="px-5 py-3 bg-gradient-to-r from-[#2563eb] to-[#60a5fa] text-white rounded-r-xl font-semibold flex items-center gap-2 hover:from-[#1d4ed8] hover:to-[#3b82f6] transition"
        >
          <FaSearch />
          Tìm kiếm
        </button>
      </form>

      {query && (
        <div className="w-full max-w-5xl">
          <h2 className="text-xl font-bold text-[#2563eb] mb-4">
            Kết quả tìm kiếm: {results.length} mục
          </h2>
          {results.length === 0 ? (
            <div className="text-gray-500 text-center py-10">
              Không tìm thấy kết quả phù hợp.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {results.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow p-4 flex flex-col hover:shadow-lg transition border border-blue-100"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-40 w-full object-cover rounded mb-3 bg-[#eaf1fb]"
                  />
                  <div className="font-bold text-lg text-[#2563eb] mb-1">{item.name}</div>
                  <div className="text-sm text-blue-500 mb-2">{item.author}</div>
                  <div className="flex flex-wrap gap-2 text-xs text-blue-700 mb-2">
                    <span>Thể loại: {item.category}</span>
                    <span>Lượt tải: {item.downloaded}</span>
                  </div>
                  <div className="line-clamp-2 text-blue-900 text-xs mb-2">{item.description}</div>
                  <button className="mt-auto px-4 py-2 bg-gradient-to-r from-[#2563eb] to-[#60a5fa] text-white rounded hover:from-[#1d4ed8] hover:to-[#3b82f6] transition">
                    Xem chi tiết
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;