import React from "react";

export default function AdminUsers({
    filteredUsers,
    handleViewUser,
    handleDeleteUser,
    selectedUser,
    setSelectedUser,
    search,
    setSearch
}) {
    return (
        <div>
            <h2 className="text-xl font-bold mb-6 text-blue-600 text-center">Danh sách người dùng</h2>
            <div className="mb-6 flex justify-center">
                <input
                    type="text"
                    placeholder="Tìm kiếm người dùng..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full max-w-md px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow">
                    <thead>
                        <tr className="bg-blue-50 text-blue-700 font-semibold">
                            <th className="py-3 px-4 border-b">#</th>
                            <th className="py-3 px-4 border-b text-left">Username</th>
                            <th className="py-3 px-4 border-b text-left">Email</th>
                            <th className="py-3 px-4 border-b text-left">Role</th>
                            <th className="py-3 px-4 border-b text-center">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={user._id || user.id} className="hover:bg-blue-100 transition">
                                <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                                <td className="py-2 px-4 border-b">{user.username}</td>
                                <td className="py-2 px-4 border-b">{user.email}</td>
                                <td className="py-2 px-4 border-b">{user.role}</td>
                                <td className="py-2 px-4 border-b text-center">
                                    <button
                                        className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 mr-2 transition"
                                        onClick={() => handleViewUser(user._id)}
                                    >
                                        Xem
                                    </button>
                                    <button
                                        className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition"
                                        onClick={() => handleDeleteUser(user._id)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Hiển thị chi tiết user nếu có */}
            {selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 min-w-[340px] relative border border-blue-100">
                        {/* Avatar */}
                        <div className="flex flex-col items-center mb-4">
                            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-2 text-4xl text-blue-500 shadow">
                                <span>
                                    {selectedUser.username?.charAt(0).toUpperCase() || "U"}
                                </span>
                            </div>
                            <div className="font-bold text-lg text-blue-700">{selectedUser.username}</div>
                            <div className="text-gray-500 text-sm">{selectedUser.email}</div>
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-600">ID:</span>
                                <span className="text-gray-800">{selectedUser._id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-600">Role:</span>
                                <span className="text-blue-600 font-semibold">{selectedUser.role}</span>
                            </div>
                        </div>
                        <button
                            className="absolute top-3 right-3 px-3 py-1 bg-gray-200 text-gray-700 rounded-full hover:bg-red-500 hover:text-white transition font-bold shadow"
                            onClick={() => setSelectedUser(null)}
                            title="Đóng"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}