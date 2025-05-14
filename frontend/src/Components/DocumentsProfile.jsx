import React, { useState } from 'react';
import { FileTextIcon, DownloadIcon, UsersIcon } from 'lucide-react';

function DocumentsProfile() {
  const [activeTab, setActiveTab] = useState('upload');

  const renderContent = () => {
    switch (activeTab) {
      case 'upload':
        return (
          <div className="py-8 text-center text-gray-600 border-b border-x rounded-b-md">
            Ban chua upload tai lieu nao ca
          </div>
        );
      case 'favorite':
        return (
          <div className="py-8 text-center text-gray-600 border-b border-x rounded-b-md">
            Danh sách tài liệu yêu thích của bạn đang trống.
          </div>
        );
      case 'download':
        return (
          <div className="py-8 text-center text-gray-600 border-b border-x rounded-b-md">
            Đây là giao diện tài liệu đã download 🚀
          </div>
        );
      case 'collection':
        return (
          <div className="py-8 text-center text-gray-600 border-b border-x rounded-b-md">
            Bộ sưu tập tài liệu của bạn hiện đang trống.
          </div>
        );
      default:
        return null;
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
              onClick={() => setActiveTab('upload')}
              className={`px-4 py-2 rounded ${
                activeTab === 'upload'
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Tài liệu upload
            </button>
            <button
              onClick={() => setActiveTab('favorite')}
              className={`px-4 py-2 rounded ${
                activeTab === 'favorite'
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Tài liệu yêu thích
            </button>
            <button
              onClick={() => setActiveTab('download')}
              className={`px-4 py-2 rounded ${
                activeTab === 'download'
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Tài liệu download
            </button>
            <button
              onClick={() => setActiveTab('collection')}
              className={`px-4 py-2 rounded ${
                activeTab === 'collection'
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Bộ sưu tập
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mt-6">
          <div className="text-sm">
            <span className="text-gray-700">Filter: </span>
            <span className="text-blue-600 font-medium">All</span>
            <span className="text-gray-500"> | </span>
            <span className="text-gray-600">đã duyệt</span>
            <span className="text-gray-500"> | </span>
            <span className="text-gray-600">chờ duyệt</span>
            <span className="text-gray-500"> | </span>
            <span className="text-gray-600">bị từ chối</span>
          </div>
        </div>

        {/* Documents Table */}
        <div className="mt-4">
          <div>
            <div className="rounded-t-md overflow-hidden">
              <div className="bg-green-300 text-green-800 grid grid-cols-5 text-left">
                <div className="py-3 px-4">name</div>
                <div className="py-3 px-4">uploadDate</div>
                <div className="py-3 px-4">status</div>
                <div className="py-3 px-4">fee</div>
                <div className="py-3 px-4">Action</div>
              </div>
            </div>

            {renderContent()}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-end">
          <div className="flex gap-2">
            <button className="px-4 py-1 border border-gray-300 rounded hover:bg-gray-50 text-gray-700">
              Trước
            </button>
            <button className="px-4 py-1 border border-gray-300 rounded hover:bg-gray-50 text-gray-700">
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentsProfile;
