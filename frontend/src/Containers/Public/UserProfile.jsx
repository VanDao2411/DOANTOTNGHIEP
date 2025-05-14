import React, { useState } from "react";

import { AccountProfilr, DocumentsProfile, FinanceProfile } from "../../Components";

export default function UserProfile() {
  const [user, setUser] = useState({
    fullName: "",
    dob: "",
    gender: "male",
    address: "",
    occupation: "",
    email: "",
    phone: "",
    avatar:
      "https://i.pinimg.com/236x/c6/5b/88/c65b884bfdd87ad7963f8e59c3e97667.jpg",
  });

  const [activeTab, setActiveTab] = useState("account");
  const [message] = useState("");



  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({
          ...user,
          avatar: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };




  return (
    <div className="flex min-h-screen bg-gray-100 mt-5 rounded-lg">
      {/* Sidebar */}
      <div className="w-1/5 bg-white p-6 shadow-md">
        <div className="flex w-16 h-16 justify-center items-center mb-4 mx-auto relative">
          <img
            src={user.avatar}
            className="w-full h-full rounded-full object-cover"
            alt="Avatar"
          />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="block mx-auto mt-2"
        />
        <ul className="space-y-4 mt-4">
          <li
            className={`cursor-pointer ${
              activeTab === "account" ? "text-blue-600 font-semibold" : ""
            }`}
            onClick={() => setActiveTab("account")}
          >
            Quản lý tài khoản
          </li>
          <li
            className={`cursor-pointer ${
              activeTab === "documents" ? "text-blue-600 font-semibold" : ""
            }`}
            onClick={() => setActiveTab("documents")}
          >
            Quản lý tài liệu
          </li>
          <li
            className={`cursor-pointer ${
              activeTab === "finance" ? "text-blue-600 font-semibold" : ""
            }`}
            onClick={() => setActiveTab("finance")}
          >
            Quản lý tài chính
          </li>
          <li className="cursor-pointer">Setting</li>
          <li className="cursor-pointer">Thông báo</li>
          <li className="cursor-pointer">Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {message && (
          <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
            {message}
          </div>
        )}

        {activeTab === "account" && (
          <AccountProfilr/>
        )}
        {activeTab === 'documents' && (
         <DocumentsProfile /> 
        )}
        {activeTab === "finance" && (
            <FinanceProfile />
        )}
      </div>
    </div>
  );
}