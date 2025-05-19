import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function AccountProfile({ setMessage }) {
  const [activeTab, setActiveTab] = useState('account');
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

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.endsWith('/password')) {
      setActiveTab('password');
    } else {
      setActiveTab('account');
    }
  }, [location.pathname]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'password') {
      // Đặt URL chính xác là /user-profile/password
      if (location.pathname !== '/user-profile/password') {
        navigate('/user-profile/password');
      }
    } else {
      // Khi quay lại tab account, về đúng /user-profile
      if (location.pathname !== '/user-profile') {
        navigate('/user-profile');
      }
    }
  };

  const handleUpdate = () => {
    setMessage("Cập nhật thông tin thành công!");
    setTimeout(() => setMessage(""), 3000);
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage("Mật khẩu mới không khớp!");
    } else {
      setMessage("Đổi mật khẩu thành công!");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordInputChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'account' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabChange('account')}
        >
          Tài khoản
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'password' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabChange('password')}
        >
          Thay đổi mật khẩu
        </button>
      </div>

      {/* Content */}
      {activeTab === 'account' && (
        <div>
          <div className="space-y-4">
            {/* Các input tài khoản */}
            {[
              { label: "Full Name", name: "fullName" },
              { label: "Date of Birth", name: "dob", type: "date" },
              { label: "Address", name: "address" },
              { label: "Occupation", name: "occupation" },
              { label: "Email", name: "email" },
              { label: "Phone", name: "phone" }
            ].map(({ label, name, type = "text" }) => (
              <div key={name}>
                <label className="block font-semibold">{label}</label>
                <input
                  type={type}
                  className="w-full p-2 border rounded"
                  name={name}
                  value={user[name]}
                  onChange={handleChange}
                />
              </div>
            ))}

            {/* Gender select */}
            <div>
              <label className="block font-semibold">Gender</label>
              <select
                className="w-full p-2 border rounded"
                name="gender"
                value={user.gender}
                onChange={handleChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="text-center">
              <button
                className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                onClick={handleUpdate}
              >
                Cập Nhật
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'password' && (
        <div>
          <div className="space-y-4">
            {[
              { label: "Mật khẩu hiện tại", name: "currentPassword", type: "password" },
              { label: "Mật khẩu mới", name: "newPassword", type: "password" },
              { label: "Xác nhận mật khẩu mới", name: "confirmPassword", type: "password" }
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label className="block font-semibold">{label}</label>
                <input
                  type={type}
                  className="w-full p-2 border rounded"
                  name={name}
                  value={passwordData[name]}
                  onChange={handlePasswordInputChange}
                />
              </div>
            ))}

            <div className="text-center">
              <button
                className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                onClick={handlePasswordChange}
              >
                Đổi Mật Khẩu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountProfile;
