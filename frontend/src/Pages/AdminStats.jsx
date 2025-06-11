import React from "react";

export default function AdminStats({ users = [], documents = [], categories = [] }) {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Thống kê hệ thống</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-100 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-blue-700 mb-2">{users.length}</div>
                    <div className="text-gray-700">Người dùng</div>
                </div>
                <div className="bg-green-100 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-green-700 mb-2">{documents.length}</div>
                    <div className="text-gray-700">Tài liệu</div>
                </div>
                <div className="bg-yellow-100 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-yellow-700 mb-2">{categories?.length || 0}</div>
                    <div className="text-gray-700">Danh mục</div>
                </div>
            
            </div>
        </div>
    );
}