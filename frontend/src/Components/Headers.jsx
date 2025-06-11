import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.png";
import icons from "../Ultis/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useAvatar } from "../Context/AvatarContext";
import { FaSignOutAlt } from "react-icons/fa";

const activeStyle = () => `
    relative text-blue-500 after:content-[''] after:absolute after:left-0 after:bottom-[-16px] after:w-full after:h-[2px] after:bg-blue-500 after:scale-x-100
`;

const notActiveStyle = () => `
    relative hover:text-blue-200 after:content-[''] after:absolute after:left-0 after:bottom-[-16px] after:w-full after:h-[2px] after:bg-blue-200 after:scale-x-0 after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100
`;

const { FaCloudDownloadAlt, CiSearch } = icons;

const Headers = () => {
    const { avatar } = useAvatar();
    const navigate = useNavigate();

    // State cho search gợi ý
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [products, setProducts] = useState([]); // Thêm state này
    const user_id = localStorage.getItem(`user_id`);
    const [username, setUsername] = useState(localStorage.getItem(`username_${user_id}`) || "");

    // eslint-disable-next-line no-unused-vars
    const fileInputRef = useRef();

    // Lấy dữ liệu sản phẩm từ API khi mount
    useEffect(() => {
        fetch('http://localhost:5000/api/v1/documents', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((data) => setProducts(data.data.documents || []))
            .catch((err) => console.error('Lỗi khi lấy dữ liệu:', err));
    }, []);

    // Xử lý gợi ý khi nhập
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        if (value.trim()) {
            const filtered = products.filter(
                (item) =>
                    item.title.toLowerCase().includes(value.toLowerCase()) ||
                    (item.authorName && item.authorName.toLowerCase().includes(value.toLowerCase())) ||
                    (Array.isArray(item.categoryIds) && item.categoryIds.some(cat => cat.name && cat.name.toLowerCase().includes(value.toLowerCase())))
            );
            setSuggestions(filtered.slice(0, 5)); // Hiển thị tối đa 5 gợi ý
        } else {
            setSuggestions([]);
        }
    };

    // Khi chọn gợi ý
    const handleSuggestionClick = (id) => {
        setSearch("");
        setSuggestions([]);
        navigate(`/product/${id}`);
    };

    // Cập nhật username khi localStorage thay đổi (đăng nhập/đăng ký thành công)
    useEffect(() => {
        const syncUsername = () => {
            setUsername(localStorage.getItem(`username_${user_id}`)|| "");
        };
        window.addEventListener("usernameChanged", syncUsername);
        window.addEventListener("storage", syncUsername);
        syncUsername();
        return () => {
            window.removeEventListener("usernameChanged", syncUsername);
            window.removeEventListener("storage", syncUsername);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem(`username_${user_id}`);
        localStorage.removeItem(`user_id`);
        localStorage.removeItem("token");
        window.dispatchEvent(new Event("usernameChanged"));
        navigate("/login");
    };

    // Hàm xử lý khi chọn file ảnh mới
    // eslint-disable-next-line no-unused-vars
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                // eslint-disable-next-line no-undef
                setSelectedUser((prev) => ({
                    ...prev,
                    avatar: ev.target.result, // base64 ảnh mới
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="w-full h-[56px] flex justify-between bg-white shadow-lg fixed z-50 m-auto">
            <img src={logo} alt="logo" className="pl-[80px] object-cover" />
            <div className="flex mt-4 ml-[50px] justify-around gap-[60px]">
                <div>
                    <ul className="flex gap-8 font-raleway ml-10">
                        <NavLink to="/" className={({ isActive }) => (isActive ? activeStyle() : notActiveStyle())}>
                            HOME
                        </NavLink>
                        <NavLink to="/books" className={({ isActive }) => (isActive ? activeStyle() : notActiveStyle())}>
                            BOOK
                        </NavLink>
                        <NavLink to="/historie" className={({ isActive }) => (isActive ? activeStyle() : notActiveStyle())}>
                            HISTOIRE
                        </NavLink>
                        <NavLink to="/upload" className={({ isActive }) => (isActive ? activeStyle() : notActiveStyle())}>
                            UPLOAD
                        </NavLink>
                    </ul>
                </div>
                <div className="relative mr-5 flex gap-6">
                    <div className="w-full flex items-center mb-4 relative">
                        <span className="h-10 pl-4 bg-[#e7ebeb] flex items-center justify-center rounded-l-[20px] text-gray-700">
                            <CiSearch size={24} onClick={() => navigate("/search")} />
                        </span>
                        <input
                            type="text"
                            className="outline-none bg-[#e7ebeb] rounded-r-[20px] h-10 w-[300px] text-gray-700 font-raleway text-[13px] pl-3"
                            placeholder="Tìm kiếm tài liệu, giáo án ..."
                            value={search}
                            onChange={handleInputChange}
                        />
                        {/* Gợi ý sản phẩm */}
                        {suggestions.length > 0 && (
                            <ul className="absolute left-0 top-12 w-full bg-white border border-blue-100 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                                {suggestions.map((item) => (
                                    <li
                                        key={item._id}
                                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center gap-3"
                                        onClick={() => handleSuggestionClick(item._id)}
                                    >
                                        <img
                                            src={item.coverImageUrl || item.fileUrl}
                                            alt={item.title}
                                            className="w-10 h-10 object-cover rounded-lg border border-blue-100 bg-[#eaf1fb]"
                                        />
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-[#2563eb]">{item.title}</span>
                                            <span className="text-xs text-gray-500">{item.authorName}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex gap-4 pr-[80px] font-raleway text-[18px] justify-center items-center">
                {username && (
                    <div
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-lg cursor-pointer overflow-hidden"
                        onClick={() => navigate("/user-profile")}
                        title="Trang cá nhân"
                    >
                        {avatar ? (
                            <img
                                src={avatar}
                                className="w-full h-full object-cover rounded-full"
                                alt=""
                            />
                        ) : (
                            <span>
                                {username.charAt(0).toUpperCase()}
                            </span>
                        )}
                    </div>
                )}
                {username ? (
                    <>
                        <span className="font-semibold text-blue-600">{username}</span>
                        <button
                            title="Đăng xuất"
                            onClick={handleLogout}
                            className="ml-2 text-red-500 hover:text-red-700"
                        >
                            <FaSignOutAlt size={22} />
                        </button>
                    </>
                ) : (
                    <NavLink to="/login" className={({ isActive }) => (isActive ? activeStyle() : notActiveStyle())}>
                        LOGIN
                    </NavLink>
                )}
            </div>
        </div>
    );
};

export default Headers;
