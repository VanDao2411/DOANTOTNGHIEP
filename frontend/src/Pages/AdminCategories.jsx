import React, { useState } from "react";

export default function AdminCategories({
    API_URL,
    categories,
    setCategories,
    loadingCategories,
}) {
    const [newCategory, setNewCategory] = useState("");
    const [adding, setAdding] = useState(false);

    const handleAddCategory = async () => {
        if (!newCategory.trim()) return;
        setAdding(true);
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/api/v1/categories`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: newCategory })
        });
        const data = await res.json();
        if (res.ok) {
            setCategories(cats => [...cats, data.data.category]);
            setNewCategory("");
        } else {
            alert(data.message || "Thêm thất bại!");
        }
        setAdding(false);
    };

    const handleDeleteCategory = async (id) => {
        if (!window.confirm("Bạn chắc chắn muốn xóa danh mục này?")) return;
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/api/v1/categories/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        if (res.ok) {
            setCategories(cats => cats.filter(cat => cat._id !== id));
        } else {
            alert("Xóa thất bại!");
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 border">
            <h2 className="text-xl font-bold mb-6 text-blue-600 text-center">Quản lý danh mục</h2>
            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Tên danh mục mới..."
                    className="border rounded px-3 py-2 flex-1 focus:ring-2 focus:ring-blue-400 outline-none"
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleAddCategory()}
                />
                <button
                    className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition ${adding ? "opacity-60 cursor-not-allowed" : ""}`}
                    onClick={handleAddCategory}
                    disabled={adding}
                >
                    {adding ? "Đang thêm..." : "Thêm"}
                </button>
            </div>
            {loadingCategories ? (
                <div className="mt-4 text-center text-gray-500">Đang tải...</div>
            ) : categories.length === 0 ? (
                <div className="mt-4 text-center text-gray-400">Chưa có danh mục nào.</div>
            ) : (
                <table className="w-full border rounded-xl overflow-hidden shadow">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="py-2 px-3 text-left">#</th>
                            <th className="py-2 px-3 text-left">Tên danh mục</th>
                            <th className="py-2 px-3 text-center">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((cat, idx) => (
                            <tr key={cat._id || cat.id} className="hover:bg-blue-50 transition">
                                <td className="py-2 px-3">{idx + 1}</td>
                                <td className="py-2 px-3 font-medium">{cat.name}</td>
                                <td className="py-2 px-3 text-center">
                                    <button
                                        className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                                        onClick={() => handleDeleteCategory(cat._id)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}