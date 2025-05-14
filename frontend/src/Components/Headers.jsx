
import React from "react";
import logo from "../assets/logo.png";
import icons from "../Ultis/icons";

import { NavLink } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const activeStyle = (bottom) => `
    relative text-blue-500 after:content-[''] after:absolute after:left-0 after:bottom-[${bottom}px] after:w-full after:h-[2px] after:bg-blue-500 after:scale-x-100
`

const notActiveStyle = (bottom) => `

    relative hover:text-blue-200 after:content-[''] after:absolute after:left-0 after:bottom-[${bottom}px] after:w-full after:h-[2px] after:bg-blue-200 after:scale-x-0 after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100
`
// const activeStyle = "relative text-blue-500 after:content-[''] after:absolute after:left-0 after:bottom-[-16px] after:w-full after:h-[2px] after:bg-blue-500 after:scale-x-100";


const { FaCloudDownloadAlt, CiSearch } = icons;

const Headers = () => {

    // const { cartCount } = useCart();
    const navigate = useNavigate();

    // const handleAuthSubmit = () => {
    //   // Xử lý logic đăng nhập/đăng ký ở đây nếu cần

    //   // Chuyển hướng về trang home
    //   navigate("/user-profile");
    // };
    return (
        <div className="w-full h-[56px] flex justify-between bg-white shadow-lg fixed z-50 m-auto">
            <img src={logo} alt="logo" className="pl-[210px] object-cover" />
            <div className="flex mt-4 justify-around gap-[60px]">
                <div>
                    <ul className="flex gap-8 font-raleway ml-10">
                        <NavLink to="/" className={({ isActive }) => (isActive ? activeStyle("-16") : notActiveStyle("-16"))}>
                            HOME
                        </NavLink>
                        <NavLink to="/about" className={({ isActive }) => (isActive ? activeStyle("-16") : notActiveStyle("-16"))}>
                            ABOUT
                        </NavLink>
                        <NavLink to="/category" className={({ isActive }) => (isActive ? activeStyle("-16") : notActiveStyle("-16"))}>
                            CATEGORY
                        </NavLink>
                        <NavLink to="/historie" className={({ isActive }) => (isActive ? activeStyle("-16") : notActiveStyle("-16"))}>
                            HISTOIRE
                        </NavLink>
                        <NavLink to="/upload" className={({ isActive }) => (isActive ? activeStyle("-16") : notActiveStyle("-16"))}>
                            UPLOAD
                        </NavLink>
                    </ul>
                </div>
                <div className=" relative mr-5 flex gap-6">
                    <div className='w-full flex items-center mb-4'>
                        <span className='h-10 pl-4 bg-[#e7ebeb] flex items-center justify-center rounded-l-[20px] text-gray-700'>
                            <CiSearch size={24} onClick={() => navigate("/search")} />
                        </span>
                        <input
                            type='text'
                            className='outline-none bg-[#e7ebeb] rounded-r-[20px] h-10 w-[300px] text-gray-700 font-raleway text-[13px] pl-3'
                            placeholder='Tìm kiếm tài liệu, giáo án ...'
                        />
                    </div>
                </div>
            </div>
            <div className=" flex gap-4 pr-[220px] font-raleway text-[18px] justify-center items-center">
                <div className="w-10 h-10 ">
                    <img src="https://i.pinimg.com/236x/c6/5b/88/c65b884bfdd87ad7963f8e59c3e97667.jpg" className=" w-full h-full object-cover rounded-full " alt="" onClick={() => navigate("/user-profile")} />
                </div>
                <NavLink to="/login" className={({ isActive }) => (isActive ? activeStyle("-16") : notActiveStyle("-16"))}>
                    LOGIN
                </NavLink>
            </div>
        </div>
    );
};

export default Headers;
