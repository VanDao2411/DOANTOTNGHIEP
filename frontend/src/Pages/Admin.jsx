import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaUser, FaChevronDown } from "react-icons/fa";
import AdminDocuments from "./AdminDocuments";
import AdminStats from "./AdminStats";
import AdminCategories from "./AdminCategories";
import AdminUsers from "./AdminUsers";
import logo from "../assets/logo.png"; // Thay bằng đường dẫn đến logo của bạn

export default function Admin() {
    const [activeTab, setActiveTab] = useState("stats");
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showLogout, setShowLogout] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [loadingDocuments, setLoadingDocuments] = useState(false);
    const [showAddDoc, setShowAddDoc] = useState(false);
    const [newDoc, setNewDoc] = useState({ title: "", price: 0 });
    const [editDoc, setEditDoc] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const userId = localStorage.getItem("user_id") || "default_user";
    const username = localStorage.getItem(`username_${userId}`) || "Admin";
    const API_URL = "http://localhost:5000";
    const role = localStorage.getItem(`role_${userId}`) || "admin";


    // Lấy danh sách user
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const url = `${API_URL}/api/v1/users`;
                const token = localStorage.getItem('token');
                if (!token) {
                    console.warn('No authentication token found in localStorage.');
                    return;
                }
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    if (response.status === 401 || response.status === 403) {
                        localStorage.removeItem('token');
                    } else {
                        console.error('Error fetching users:', errorData);
                    }
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || response.statusText}`);
                }
                const data = await response.json();
                setUsers(data.data.users || []);
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        };
        fetchUsers();
    }, []);

    // Lấy danh sách tài liệu từ backend
    useEffect(() => {
        setLoadingDocuments(true);
        fetch(`${API_URL}/api/v1/documents`)
            .then(res => res.json())
            .then(data => {
                setDocuments(data.data.documents || []);
                setLoadingDocuments(false);
            })
            .catch(() => setLoadingDocuments(false));
    }, []); // <-- chỉ chạy 1 lần khi load trang

    // Lấy danh sách danh mục
    useEffect(() => {
        setLoadingCategories(true);
        fetch(`${API_URL}/api/v1/categories`)
            .then(res => res.json())
            .then(data => {
                setCategories(data.data.categories || []);
                setLoadingCategories(false);
            })
            .catch(() => setLoadingCategories(false));
    }, [API_URL]);

    // Xóa tài liệu
    const handleDeleteDocument = (id) => {
        if (window.confirm("Bạn chắc chắn muốn xóa tài liệu này?")) {
            const token = localStorage.getItem('token');
            fetch(`${API_URL}/api/v1/documents/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            .then(res => {
                if (res.ok) {
                    setDocuments(prev => prev.filter(doc => doc._id !== id));
                } else {
                    alert("Xóa thất bại!");
                }
            })
            .catch(() => alert("Lỗi kết nối!"));
        }
    };

    // Sửa tài liệu
    // eslint-disable-next-line no-unused-vars
    const handleEditDocument = async () => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/api/v1/documents/${editDoc._id}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editDoc)
        });
        if (res.ok) {
            setDocuments(docs => docs.map(d => d._id === editDoc._id ? editDoc : d));
            setEditDoc(null);
        } else {
            alert("Cập nhật thất bại!");
        }
    };

    // Thêm tài liệu mới
    const handleAddDocument = async () => {
        const token = localStorage.getItem('token');
        // TODO: Lấy authorId và categoryIds thật từ hệ thống của bạn
        const authorId = "665f3b7e2c7e4e1a2b3c4d5e"; // Thay bằng _id thật của tác giả
        const categoryIds = ["665f3b7e2c7e4e1a2b3c4d5f"]; // Thay bằng _id thật của danh mục

        const docToSend = {
            ...newDoc,
            authorId,
            categoryIds
        };

        const res = await fetch(`${API_URL}/api/v1/documents`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(docToSend)
        });
        const data = await res.json();
        if (res.ok) {
            setDocuments(docs => [data.data.document, ...docs]);
            setShowAddDoc(false);
            setNewDoc({ title: "", price: 0 });
        } else {
            alert(data.message || "Thêm thất bại!");
            console.log("Lỗi tạo tài liệu:", data);
        }
    };

    // Xem chi tiết user
    const handleViewUser = (id) => {
        if (role === "admin")  {
            const getUser = async () => {
                try {
                    const url = `${API_URL}/api/v1/users/${id}`;
                    const token = localStorage.getItem('token');
                    if (!token) {
                        console.warn('No authentication token found in localStorage.');
                        return;
                    }
                    const response = await fetch(url, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (!response.ok) {
                        const errorData = await response.json();
                        if (response.status === 401 || response.status === 403) {
                            localStorage.removeItem('token');
                        } else {
                            console.error('Error deleting user:', errorData);
                        }
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setSelectedUser(data.data.user || null); // Adjust based on your API response structure
                } catch (err) {
                    console.error('Error deleting user:', err);
                }
            };
            getUser();
        }
    };
    if (selectedUser) {
        console.log(selectedUser);
    }
    // Xóa user
    const handleDeleteUser = (id) => {
        // Clear any previous messages

        if (window.confirm("Bạn chắc chắn muốn xóa user này?")) {
            const deleteUser = async () => {
                try {
                    const url = `${API_URL}/api/v1/users/${id}`;

                    const token = localStorage.getItem('token'); // Use 'token' consistently

                    if (!token) {
                        console.warn('No authentication token found in localStorage.');
                        return;
                    }

                    const response = await fetch(url, {
                        method: 'DELETE',
                        // credentials: 'include', // Only if your backend relies on session cookies alongside token for DELETE
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        if (response.status === 401 || response.status === 403) {
                            localStorage.removeItem('token');
                            // Redirect to login if using React Router: history.push('/login');
                        } else {
                            console.error('Error deleting user:', errorData);
                        }
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    // --- Fix 1: Updating state after successful deletion ---
                    // Option A: Refetch all users (simpler, but less efficient for large lists)
                    // You might need to call your initial fetchUsers function or a dedicated refetch function
                    // fetchUsers(); // If you have a separate function to refetch users

                    // Option B: Optimistically remove the deleted user from the current state (more efficient)
                    setUsers(prevUsers => prevUsers.filter(user => user._id !== id)); // Assuming user objects have an `_id` property



                } catch (err) {
                    console.error('Error deleting user:', err);
                }
            };

            deleteUser(); // Call the async function only if confirmed
        }
    };

    // Sửa user (ví dụ: đổi role)
    // const handleUpdateUser = (id, updateData) => {
    //     axios.patch(`http://localhost:5000/api/users/${id}`, updateData, { withCredentials: true })
    //         .then(() => alert("Cập nhật thành công!"))
    //         .catch(() => alert("Lỗi cập nhật!"));
    // };

    // Lọc user theo search
    const filteredUsers = users?.filter(
        u =>
            u.username?.toLowerCase().includes(search.toLowerCase()) ||
            u.email?.toLowerCase().includes(search.toLowerCase())
    );




    const handleLogout = () => {
        localStorage.removeItem(`username_${userId}`);
        localStorage.removeItem(`user_id`);
        localStorage.removeItem("token");
        // localStorage.removeItem(`viewHistory_${user_id}`);
        window.dispatchEvent(new Event("usernameChanged"));
        navigate("/login"); // Thêm dòng này để chuyển về trang đăng nhập
    };

    return (
        <div className="w-full min-h-screen bg-white rounded-none shadow-lg border border-gray-200 flex flex-col">
            {/* Header */}
            <header className="w-full flex flex-col gap-2 px-8 py-4 border-b bg-white">
                {/* Logo, Search, Avatar Row */}
                <div className="flex items-center justify-between gap-6">
                    {/* Logo bên trái */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <img
                           src={logo}
                            alt="Logo"
                            className="h-10 w-24 object-contain ml-5"
                        />
                    </div>
                    {/* Thanh search ở giữa */}
                    <div className="flex-1 flex justify-center">
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full max-w-md px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    {/* Avatar và chuông bên phải */}
                    <div className="flex items-center gap-6 flex-shrink-0">
                        <button className="relative text-gray-600 hover:text-blue-600 text-xl">
                            <FaBell />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">3</span>
                        </button>
                        <div className="flex items-center gap-2 relative">
                            <img
                                src="https://i.pravatar.cc/40?img=3"
                                alt="Admin Avatar"
                                className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
                            />
                            <span
                                className="font-semibold text-gray-700 cursor-pointer flex items-center gap-1"
                                onClick={() => setShowLogout(!showLogout)}
                            >
                                {username}
                                <FaChevronDown className="ml-1" />
                            </span>
                            {showLogout && (
                                <div className="absolute right-0 top-full mt-2 bg-white border rounded shadow-lg z-10 min-w-[160px]">
                                    <div className="px-4 py-2 border-b text-gray-700 font-semibold flex items-center gap-2">
                                        <FaUser className="text-blue-500" /> {username}
                                    </div>
                                    <button
                                        className="block px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
                                        onClick={handleLogout}
                                    >
                                        Đăng xuất
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            {/* Main content: Navbar + Content */}
            <div className="flex flex-1">
                {/* Navbar bên trái */}
                <nav className="w-64 bg-gray-50 border-r p-8 flex flex-col gap-4">
                    <button
                        className={`text-left px-4 py-2 rounded font-semibold transition ${activeTab === "stats"
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                            }`}
                        onClick={() => setActiveTab("stats")}
                    >
                        Thống kê
                    </button>
                    <button
                        className={`text-left px-4 py-2 rounded font-semibold transition ${activeTab === "users"
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                            }`}
                        onClick={() => setActiveTab("users")}
                    >
                        Người dùng
                    </button>
                    <button
                        className={`text-left px-4 py-2 rounded font-semibold transition ${activeTab === "documents"
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                            }`}
                        onClick={() => setActiveTab("documents")}
                    >
                        Tài liệu
                    </button>
                    <button
                        className={`text-left px-4 py-2 rounded font-semibold transition ${activeTab === "categories"
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                            }`}
                        onClick={() => setActiveTab("categories")}
                    >
                        Danh mục
                    </button>
                </nav>
                {/* Nội dung bên phải */}
                <div className="flex-1 p-8">
                    <h1 className="text-2xl font-bold text-[#e95834] mb-6">Quản trị hệ thống</h1>
                    {activeTab === "users" && (
                        <AdminUsers
        users={users}
        filteredUsers={filteredUsers}
        handleViewUser={handleViewUser}
        handleDeleteUser={handleDeleteUser}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        search={search}
        setSearch={setSearch}
    />
                    )}
                    {activeTab === "stats" && (
    <AdminStats
        users={users}
        documents={documents}
        categories={categories}
    />
)}
                    {activeTab === "documents" && (
                        <AdminDocuments
                            documents={documents}
                            loading={loadingDocuments}
                            onDelete={handleDeleteDocument}
                            onEdit={setEditDoc}
                            onAdd={() => setShowAddDoc(true)}
                            showAddDoc={showAddDoc}
                            setShowAddDoc={setShowAddDoc}
                            newDoc={newDoc}
                            setNewDoc={setNewDoc}
                            handleAddDocument={handleAddDocument}
                            editDoc={editDoc}
                            setEditDoc={setEditDoc}
                        />
                    )}
                    {activeTab === "categories" && (
    <AdminCategories
        API_URL={API_URL}
        categories={categories}
        setCategories={setCategories}
        loadingCategories={loadingCategories}
        setLoadingCategories={setLoadingCategories}
    />
)}
                </div>
            </div>
        </div>
    );
}
