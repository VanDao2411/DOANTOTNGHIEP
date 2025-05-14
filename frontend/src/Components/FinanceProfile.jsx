import React from "react";
import {
    FileIcon,
    DownloadIcon,
    UsersIcon,
    CheckCircleIcon,
  } from 'lucide-react'
function FinanceProfile() {
  return (
    <div>
      <div className="bg-gray-100 min-h-screen w-full p-4">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="bg-white rounded-md shadow p-4">
            <div className="flex justify-between">
              <div className="flex items-center space-x-2">
                <div className="bg-orange-100 p-3 rounded-md">
                  <FileIcon className="text-orange-500" size={20} />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Tài liệu</div>
                  <div className="font-medium">0</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-purple-100 p-3 rounded-md">
                  <DownloadIcon className="text-purple-500" size={20} />
                </div>
                <div>
                  <div className="text-sm text-gray-600">download</div>
                  <div className="font-medium">0</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-blue-100 p-3 rounded-md">
                  <UsersIcon className="text-blue-500" size={20} />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Lượt follow</div>
                  <div className="font-medium">3</div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-md shadow p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="font-medium">Thông tin số dư tài khoản</div>
                  <div className="text-orange-500">d</div>
                </div>
                <button className="px-4 py-1 border border-green-500 text-green-500 rounded-md hover:bg-green-50">
                  Nạp tiền
                </button>
              </div>
              <div className="mb-4">
                <div className="mb-1">Gói tài tài liệu: 0đ</div>
                <button className="px-4 py-1 bg-green-500 text-white rounded-md hover:bg-green-600">
                  Đăng ký
                </button>
              </div>
              <div className="mb-4">
                <div className="mb-1">
                  Bạn đang sử dụng gói:{" "}
                  <span className="text-orange-500 font-medium">DEFAULT</span>
                </div>
              </div>
              <div>
                <div className="mb-1">
                  Giới hạn tải tài liệu:{" "}
                  <span className="text-orange-500">Các tài liệu 0đ</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-md shadow p-6">
              <div className="flex justify-center mb-6">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 rounded-full border-[36px] border-blue-400"></div>
                  <div
                    className="absolute inset-0 rounded-full border-[36px] border-yellow-300"
                    style={{
                      clipPath:
                        "polygon(50% 0, 100% 0, 100% 100%, 50% 100%, 50% 50%)",
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-1 bg-green-500"></div>
                  <div className="text-xs">01</div>
                  <div className="text-xs">70000</div>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="text-green-500" size={16} />
                  <div className="text-xs">Tổng số tiền nạp</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-1 bg-yellow-400"></div>
                  <div className="text-xs">50000</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full border border-purple-600"></div>
                  <div className="text-xs">Khoản tiền đã dùng</div>
                </div>
                <div></div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full border border-orange-500"></div>
                  <div className="text-xs">Doanh thu từ tài liệu của bạn</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-md shadow p-6">
            <h2 className="text-lg font-medium mb-6">Cấu hình rút tiền</h2>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-sm mb-1">Tên bank</label>
                  <select className="w-full border rounded-md p-2">
                    <option>Chọn ngân hàng</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1">Số thẻ</label>
                  <input
                    type="text"
                    className="w-full border rounded-md p-2"
                    placeholder="1234 5678 9875 5432"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Tên chủ thẻ</label>
                  <input
                    type="text"
                    className="w-full border rounded-md p-2"
                    placeholder="TEN CHU THE"
                  />
                </div>
              </div>
              <div className="flex-1 flex justify-center items-center">
                <div className="w-80 h-48 bg-black rounded-lg p-4 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div className="flex space-x-1">
                      <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                      <div className="w-8 h-8 bg-orange-500 rounded-full opacity-80"></div>
                    </div>
                    <div className="text-white">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-white text-xl">1234 567 8912</div>
                  <div className="flex justify-between items-center">
                    <div className="text-white">NGUYEN VAN A</div>
                    <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                      <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button className="px-6 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500">
                Rút tiền
              </button>
            </div>
          </div>
          <div className="bg-white rounded-md shadow p-6">
            <h2 className="text-lg font-medium mb-6">
              Lịch sử biến động số dư
            </h2>
            <div className="mb-4 flex space-x-2">
              <button className="px-4 py-2 bg-blue-400 text-white rounded-md">
                Dịch vụ
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md">
                Doanh thu tài liệu
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md">
                Lịch sử rút tiền
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4 font-medium">Loại</th>
                    <th className="text-left py-2 px-4 font-medium">Dịch vụ</th>
                    <th className="text-left py-2 px-4 font-medium">Số tiền</th>
                    <th className="text-left py-2 px-4 font-medium">
                      Ngày thực hiện
                    </th>
                    <th className="text-left py-2 px-4 font-medium">
                      Trạng thái
                    </th>
                  </tr>
                </thead>
                <tbody>{/* Empty table for demonstration */}</tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded">
                Previous
              </button>
              <button className="px-3 py-1 bg-blue-400 text-white rounded">
                1
              </button>
              <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded">
                2
              </button>
              <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded">
                3
              </button>
              <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinanceProfile;
