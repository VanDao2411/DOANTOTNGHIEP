import React, { useState, useEffect } from "react";
import { FileTextIcon, DownloadIcon, UsersIcon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

function DocumentsProfile() {
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy tab từ URL hoặc mặc định là "upload"
  const [activeTab, setActiveTab] = useState(() => {
    const tabFromUrl = location.pathname.split("/").pop();
    return tabFromUrl && tabFromUrl !== "documents" ? tabFromUrl : "upload";
  });

  // Nếu truy cập đúng /user-profile/documents thì tự động chuyển về upload
  useEffect(() => {
    if (location.pathname === "/user-profile/documents") {
      navigate("/user-profile/documents/upload", { replace: true });
    }
  }, [location.pathname, navigate]);

  // Đồng bộ trạng thái activeTab với URL
  useEffect(() => {
    const tabFromUrl = location.pathname.split("/").pop();
    if (tabFromUrl !== activeTab && tabFromUrl !== "documents") {
      setActiveTab(tabFromUrl);
    }
  }, [location.pathname]);

  // Hàm xử lý khi chọn tab
  const handleTabChange = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
      navigate(`/user-profile/documents/${tab}`);
    }
  };

  // Hàm render nội dung dựa trên tab hiện tại
  const renderContent = () => {
    switch (activeTab) {
      case "upload":
        return (
          <div className="py-8 text-center text-gray-600 border-b border-x rounded-b-md">
            Bạn chưa upload tài liệu nào cả.
          </div>
        );
      case "favorite":
        return (
          <div className="py-8 text-center text-gray-600 border-b border-x rounded-b-md">
            Danh sách tài liệu yêu thích của bạn đang trống.
          </div>
        );
      case "download":
        return (
          <div className="py-8 text-gray-600 border-b border-x rounded-b-md">
            <h3 className="text-lg font-semibold">Danh sách file đã tải:</h3>
            <p>Chưa có tài liệu nào được tải xuống.</p>
          </div>
        );
      case "collection":
        return (
          <div className="py-8 text-center text-gray-600 border-b border-x rounded-b-md">
            Bộ sưu tập tài liệu của bạn hiện đang trống.
          </div>
        );
      default:
        return (
          <div className="py-8 text-center text-gray-600 border-b border-x rounded-b-md">
            Không tìm thấy nội dung.
          </div>
        );
    }
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md max-w-5xl mx-auto p-6">
        <h2 className="text-lg font-semibold mb-4">Quản lý tài liệu</h2>

        {/* Stats */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <FileTextIcon className="text-orange-500 w-5 h-5" />
            </div>
            <div>
              <p className="text-gray-600">Tài liệu</p>
              <p className="font-semibold">0</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <DownloadIcon className="text-purple-500 w-5 h-5" />
            </div>
            <div>
              <p className="text-gray-600">Download</p>
              <p className="font-semibold">0</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <UsersIcon className="text-blue-500 w-5 h-5" />
            </div>
            <div>
              <p className="text-gray-600">Lượt follow</p>
              <p className="font-semibold">3</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleTabChange("upload")}
              className={`px-4 py-2 rounded ${
                activeTab === "upload"
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Tài liệu upload
            </button>
            <button
              onClick={() => handleTabChange("favorite")}
              className={`px-4 py-2 rounded ${
                activeTab === "favorite"
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Tài liệu yêu thích
            </button>
            <button
              onClick={() => handleTabChange("download")}
              className={`px-4 py-2 rounded ${
                activeTab === "download"
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Tài liệu download
            </button>
            <button
              onClick={() => handleTabChange("collection")}
              className={`px-4 py-2 rounded ${
                activeTab === "collection"
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Bộ sưu tập
            </button>
          </div>
        </div>

        {/* Render Content */}
        <div className="mt-4">{renderContent()}</div>
      </div>
    </div>
  );
}

export default DocumentsProfile;
