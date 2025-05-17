import React, { useState } from "react";
import logo from "../assets/logo.png";
import icons from "../Ultis/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useAvatar } from "../Context/AvatarContext";
import apiProducts from "../apis/apiProducts.json";

const activeStyle = (bottom) => `
    relative text-blue-500 after:content-[''] after:absolute after:left-0 after:bottom-[${bottom}px] after:w-full after:h-[2px] after:bg-blue-500 after:scale-x-100
`;

const notActiveStyle = (bottom) => `
    relative hover:text-blue-200 after:content-[''] after:absolute after:left-0 after:bottom-[${bottom}px] after:w-full after:h-[2px] after:bg-blue-200 after:scale-x-0 after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100
`;

const { FaCloudDownloadAlt, CiSearch } = icons;

const Headers = () => {
    const { avatar } = useAvatar();
    const navigate = useNavigate();

    // State cho search gợi ý
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    // Xử lý gợi ý khi nhập
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        if (value.trim()) {
            const filtered = apiProducts.filter(
                (item) =>
                    item.name.toLowerCase().includes(value.toLowerCase()) ||
                    (item.author && item.author.toLowerCase().includes(value.toLowerCase())) ||
                    (item.category && item.category.toLowerCase().includes(value.toLowerCase()))
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

    return (
        <div className="w-full h-[56px] flex justify-between bg-white shadow-lg fixed z-50 m-auto">
            <img src={logo} alt="logo" className="pl-[80px] object-cover" />
            <div className="flex mt-4 ml-[50px] justify-around gap-[60px]">
                <div>
                    <ul className="flex gap-8 font-raleway ml-10">
                        <NavLink to="/" className={({ isActive }) => (isActive ? activeStyle("-16") : notActiveStyle("-16"))}>
                            HOME
                        </NavLink>
                        <NavLink to="/doc" className={({ isActive }) => (isActive ? activeStyle("-16") : notActiveStyle("-16"))}>
                            DOC
                        </NavLink>
                        <NavLink to="/books" className={({ isActive }) => (isActive ? activeStyle("-16") : notActiveStyle("-16"))}>
                            BOOK
                        </NavLink>
                        <NavLink to="/historie" className={({ isActive }) => (isActive ? activeStyle("-16") : notActiveStyle("-16"))}>
                            HISTOIRE
                        </NavLink>
                        <NavLink to="/upload" className={({ isActive }) => (isActive ? activeStyle("-16") : notActiveStyle("-16"))}>
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
                                        key={item.id}
                                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center gap-3"
                                        onClick={() => handleSuggestionClick(item.id)}
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-10 h-10 object-cover rounded-lg border border-blue-100 bg-[#eaf1fb]"
                                        />
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-[#2563eb]">{item.name}</span>
                                            <span className="text-xs text-gray-500">{item.author}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            <div className=" flex gap-4 pr-[80px] font-raleway text-[18px] justify-center items-center">
                <div className="w-10 h-10 ">
                    <img src={avatar} className=" w-full h-full object-cover rounded-full " alt="" onClick={() => navigate("/user-profile")} />
                </div>
                <NavLink to="/login" className={({ isActive }) => (isActive ? activeStyle("-16") : notActiveStyle("-16"))}>
                    LOGIN
                </NavLink>
            </div>
        </div>
    );
};

export default Headers;
