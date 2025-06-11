import React from "react";

export default function AdminDocuments(props) {
    const {
        documents, loadingDocuments, handleDeleteDocument, setEditDoc,
        showAddDoc, setShowAddDoc, newDoc, setNewDoc, handleAddDocument,
        editDoc, handleEditDocument
    } = props;

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Danh sách tài liệu</h2>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => setShowAddDoc(true)}
                >
                    Thêm tài liệu
                </button>
            </div>
            {loadingDocuments ? (
                <div>Đang tải...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {documents.map((doc) => (
                        <div
                            key={doc._id}
                            className="bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col overflow-hidden hover:shadow-2xl transition cursor-pointer group"
                        >
                            <div className="p-4 flex-1 flex flex-col">
                                <h4 className="font-bold text-lg text-blue-700 mb-1 truncate">{doc.title}</h4>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                                        {doc.categoryIds && doc.categoryIds.length > 0
                                            ? doc.categoryIds.map(cat => cat.name).join(", ")
                                            : "Chưa phân loại"}
                                    </span>
                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                                        {doc.price} điểm
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm flex-1 mb-2">
                                    Tác giả: {doc.authorName || "Chưa cập nhật"}
                                </p>
                                <div className="flex gap-2 mt-2">
                                    <button
                                        className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                                        onClick={() => handleDeleteDocument(doc._id)}
                                    >
                                        Xóa
                                    </button>
                                    <button
                                        className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                                        onClick={() => setEditDoc(doc)}
                                    >
                                        Sửa
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal thêm tài liệu */}
            {showAddDoc && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg min-w-[320px]">
                        <h3 className="font-bold mb-4 text-lg">Thêm tài liệu mới</h3>
                        <label className="block mb-1 font-medium">Tên sản phẩm (Tiêu đề)</label>
                        <input
                            className="border rounded px-3 py-2 mb-2 w-full"
                            placeholder="Nhập tên sản phẩm"
                            value={newDoc.title}
                            onChange={e => setNewDoc({ ...newDoc, title: e.target.value })}
                        />
                        <label className="block mb-1 font-medium">Giá (điểm)</label>
                        <input
                            className="border rounded px-3 py-2 mb-2 w-full"
                            placeholder="Nhập giá (điểm)"
                            type="number"
                            value={newDoc.price}
                            onChange={e => setNewDoc({ ...newDoc, price: e.target.value })}
                        />
                        <label className="block mb-1 font-medium">Ảnh tác giả (URL)</label>
                        <input
                            className="border rounded px-3 py-2 mb-2 w-full"
                            placeholder="Nhập URL ảnh tác giả"
                            value={newDoc.authorImage || ""}
                            onChange={e => setNewDoc({ ...newDoc, authorImage: e.target.value })}
                        />
                        <label className="block mb-1 font-medium">Tác giả</label>
                        <input
                            className="border rounded px-3 py-2 mb-2 w-full"
                            placeholder="Nhập tên tác giả"
                            value={newDoc.authorName || ""}
                            onChange={e => setNewDoc({ ...newDoc, authorName: e.target.value })}
                        />
                        <label className="block mb-1 font-medium">Thể loại</label>
                        <input
                            className="border rounded px-3 py-2 mb-2 w-full"
                            placeholder="Nhập thể loại"
                            value={newDoc.categoryName || ""}
                            onChange={e => setNewDoc({ ...newDoc, categoryName: e.target.value })}
                        />
                        <div className="flex gap-2 mt-2">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={handleAddDocument}
                            >
                                Thêm
                            </button>
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600"
                                onClick={() => setShowAddDoc(false)}
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal sửa tài liệu */}
            {editDoc && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg min-w-[320px]">
                        <h3 className="font-bold mb-4 text-lg">Sửa tài liệu</h3>
                        <label className="block mb-1 font-medium">Tên sản phẩm (Tiêu đề)</label>
                        <input
                            className="border rounded px-3 py-2 mb-2 w-full"
                            value={editDoc.title}
                            onChange={e => setEditDoc({ ...editDoc, title: e.target.value })}
                        />
                        <label className="block mb-1 font-medium">Giá (điểm)</label>
                        <input
                            className="border rounded px-3 py-2 mb-2 w-full"
                            type="number"
                            value={editDoc.price}
                            onChange={e => setEditDoc({ ...editDoc, price: e.target.value })}
                        />
                        <label className="block mb-1 font-medium">Ảnh tác giả (URL)</label>
                        <input
                            className="border rounded px-3 py-2 mb-2 w-full"
                            placeholder="Ảnh tác giả (URL)"
                            value={editDoc.authorImage || ""}
                            onChange={e => setEditDoc({ ...editDoc, authorImage: e.target.value })}
                        />
                        <div className="flex gap-2 mt-2">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={handleEditDocument}
                            >
                                Lưu
                            </button>
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600"
                                onClick={() => setEditDoc(null)}
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}