import React, { useState, useEffect } from "react";
import { FileTextIcon, DownloadIcon, UsersIcon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { DocumentChild } from "./DocumentChild";

function DocumentsProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [userId, setUserId] = useState(localStorage.getItem("user_id") || "default_user");


  // Lấy tab từ URL hoặc mặc định là "upload"
  const [activeTab, setActiveTab] = useState(() => {
    const tabFromUrl = location.pathname.split("/").pop();
    return tabFromUrl && tabFromUrl !== "documents" ? tabFromUrl : "upload";
  });

  useEffect(() => {
    const stored = localStorage.getItem(`uploadedFiles_${userId}`);
    if (stored) {
      try {
        setUploadedFiles(JSON.parse(stored));
      } catch {
        setUploadedFiles([]);
      }
    } else {
      setUploadedFiles([]);
    }
  }, [userId]);

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
         <DocumentChild uploadedFiles={uploadedFiles} type={"upload"} />
        );

      case "favorite":
       return (
         <DocumentChild uploadedFiles={uploadedFiles} type={"whitelist"} />
        );
      case "download":
        return (
         <DocumentChild uploadedFiles={uploadedFiles} type={"download"} />
        );
    }
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md max-w-5xl mx-auto p-6">
        <h2 className="text-lg font-semibold mb-4">Quản lý tài liệu</h2>

        {/* Action Buttons */}
        <div className="mt-12">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleTabChange("upload")}
              className={`px-4 py-2 rounded ${activeTab === "upload"
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
            >
              Tài liệu upload
            </button>
            <button
              onClick={() => handleTabChange("favorite")}
              className={`px-4 py-2 rounded ${activeTab === "favorite"
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
            >
              Tài liệu yêu thích
            </button>
            <button
              onClick={() => handleTabChange("download")}
              className={`px-4 py-2 rounded ${activeTab === "download"
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
            >
              Tài liệu download
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
