import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        password: "",
        passwordConfirm: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const res = await fetch(`http://localhost:5000/api/v1/users/resetPassword/${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (res.ok) {
                setMessage("Đổi mật khẩu thành công! Đang chuyển hướng...");
                setTimeout(() => navigate("/login"), 2000);
            } else {
                setMessage(data.message || "Có lỗi xảy ra!");
            }
        } catch {
            setMessage("Có lỗi xảy ra!");
        }
        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4 text-blue-600">Đặt lại mật khẩu</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <label className="block font-semibold">Mật khẩu mới</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="w-full p-2 border rounded pr-10"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="button"
                        className="absolute right-2 top-8 text-gray-500"
                        tabIndex={-1}
                        onClick={() => setShowPassword(v => !v)}
                    >
                        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                </div>
                <div className="relative">
                    <label className="block font-semibold">Xác nhận mật khẩu mới</label>
                    <input
                        type={showPasswordConfirm ? "text" : "password"}
                        name="passwordConfirm"
                        className="w-full p-2 border rounded pr-10"
                        value={form.passwordConfirm}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="button"
                        className="absolute right-2 top-8 text-gray-500"
                        tabIndex={-1}
                        onClick={() => setShowPasswordConfirm(v => !v)}
                    >
                        {showPasswordConfirm ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                </div>
                <button
                    type="submit"
                    className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
                </button>
            </form>
            {message && <div className="mt-4 text-center text-red-500">{message}</div>}
        </div>
    );
}