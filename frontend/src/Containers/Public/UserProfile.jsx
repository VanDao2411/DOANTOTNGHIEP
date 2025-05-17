import React, { useEffect } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAvatar } from "../../Context/AvatarContext";

export default function UserProfile() {
  const { avatar, setAvatar } = useAvatar();
  const navigate = useNavigate();
  const location = useLocation();

  // Điều hướng mặc định đến "account" nếu truy cập "/user-profile"
  useEffect(() => {
    if (location.pathname === "/user-profile") {
      navigate("/user-profile/account", { replace: true });
    }
  }, [location.pathname, navigate]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); // Cập nhật hình ảnh trong context
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 mt-5 rounded-lg">
      {/* Sidebar */}
      <div className="w-1/5 bg-white p-6 shadow-md">
        <div className="flex flex-col items-center mb-4">
          <img
            src={avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover mb-2"
          />
          <label
            htmlFor="avatar-upload"
            className="cursor-pointer px-4 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
          >
            Chọn ảnh
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>

        <ul className="space-y-4 mt-4">
          <li>
            <NavLink
              to="/user-profile/account"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold" : ""
              }
            >
              Quản lý tài khoản
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user-profile/documents"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold" : ""
              }
            >
              Quản lý tài liệu
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user-profile/finance"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold" : ""
              }
            >
              Quản lý tài chính
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}