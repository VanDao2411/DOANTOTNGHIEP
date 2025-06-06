import React, { useState } from "react";
import {
  FileIcon,
  DownloadIcon,
  UsersIcon,
  CheckCircleIcon,
  StarIcon,
  BookOpenIcon,
  LogInIcon,
  UserPlusIcon,
} from 'lucide-react';

// Danh sách tên ngân hàng Việt Nam (ví dụ, bạn có thể bổ sung thêm)
const BANKS = [
  "Vietcombank",
  "VietinBank",
  "BIDV",
  "Agribank",
  "Techcombank",
  "MB Bank",
  "ACB",
  "Sacombank",
  "VPBank",
  "SHB",
  "TPBank",
  "Eximbank",
  "HDBank",
  "SeABank",
  "OCB",
  "VIB",
  "LienVietPostBank",
  "SCB",
  "Nam A Bank",
  "ABBANK",
  "Bac A Bank",
  "PVcomBank",
  "Saigonbank",
  "PG Bank",
  "BaoViet Bank",
  "NCB",
  "Kienlongbank",
  "VietBank",
  "CBBank"
];

function FinanceProfile() {
  // State điểm và lịch sử nhiệm vụ
  const [points, setPoints] = useState(100);
  const [history, setHistory] = useState([
    { type: "Đăng ký tài khoản", points: 50, date: "01/06/2025" },
    { type: "Đăng nhập mỗi ngày", points: 10, date: "03/06/2025" },
    { type: "Đọc sách", points: 5, date: "03/06/2025" },
    { type: "Đánh giá sách", points: 5, date: "03/06/2025" },
  ]);
  const [showExchange, setShowExchange] = useState(false);

  // Thêm state cho form đổi điểm
  const [exchangePoints, setExchangePoints] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [exchangeMsg, setExchangeMsg] = useState("");

  // Thêm state cho gợi ý ngân hàng
  const [bankSuggestions, setBankSuggestions] = useState([]);

  // Nhiệm vụ mẫu
  const missions = [
    {
      icon: <UserPlusIcon className="text-blue-500" size={20} />,
      label: "Đăng ký tài khoản",
      points: 50,
      done: history.some(h => h.type === "Đăng ký tài khoản"),
    },
    {
      icon: <LogInIcon className="text-green-500" size={20} />,
      label: "Đăng nhập mỗi ngày",
      points: 10,
      done: history.some(h => h.type === "Đăng nhập mỗi ngày" && h.date === "03/06/2025"),
    },
    {
      icon: <BookOpenIcon className="text-orange-500" size={20} />,
      label: "Đọc sách",
      points: 5,
      done: history.some(h => h.type === "Đọc sách" && h.date === "03/06/2025"),
    },
    {
      icon: <StarIcon className="text-yellow-400" size={20} />,
      label: "Đánh giá sách",
      points: 5,
      done: history.some(h => h.type === "Đánh giá sách" && h.date === "03/06/2025"),
    },
  ];

  // Đổi điểm sang tiền (giả sử 1 điểm = 100đ)
  const money = points * 100;

  // Xử lý xác nhận đổi điểm
  const handleExchange = () => {
    const pointsNumber = Number(exchangePoints);
    if (pointsNumber < 1000) {
      setExchangeMsg("Bạn cần nhập ít nhất 1.000 điểm để rút tiền!");
      return;
    }
    if (!bankName.trim() || !bankAccount.trim()) {
      setExchangeMsg("Vui lòng nhập đầy đủ và hợp lệ thông tin!");
      return;
    }
    setExchangeMsg("Yêu cầu đổi điểm đã được gửi! Chúng tôi sẽ xử lý trong 24h.");
    setExchangePoints(1000);
    setBankName("");
    setBankAccount("");
    // setPoints(points - exchangePoints); // Nếu muốn trừ điểm
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Tổng quan điểm */}
        <div className="bg-white rounded-md shadow p-6 flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold text-blue-700">Điểm thưởng của bạn</div>
            <div className="text-3xl font-bold text-orange-500">{points} điểm</div>
            <div className="text-gray-500 mt-1">Tương đương: <span className="font-semibold text-green-600">{money.toLocaleString()}đ</span></div>
          </div>
          <div className="flex flex-col items-end">
            <button
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 font-semibold shadow"
              onClick={() => setShowExchange(true)}
            >
              Đổi điểm lấy tiền
            </button>
            <span className="text-xs text-gray-400 mt-2">1 điểm = 100đ</span>
          </div>
        </div>

        {/* Quy trình đổi điểm */}
        {showExchange && (
          <div className="bg-white rounded-md shadow p-6">
            <div className="text-lg font-semibold text-blue-700 mb-2">Quy trình đổi điểm lấy tiền</div>
            <ol className="list-decimal pl-6 text-gray-700 space-y-1 text-sm mb-2">
              <li>Bạn cần tối thiểu <b>1.000 điểm</b> để rút tiền về tài khoản.</li>
              <li>Nhập số điểm muốn đổi (tối thiểu 1.000 điểm).</li>
              <li>Nhập tên ngân hàng và số tài khoản nhận tiền.</li>
              <li>Nhấn xác nhận để hoàn tất quy trình đổi điểm.</li>
            </ol>
            <div className="flex flex-col gap-2 mt-4">
              <input
                type="number"
                value={exchangePoints}
                onChange={e => setExchangePoints(e.target.value)}
                placeholder="Nhập số điểm muốn đổi (>= 1000)"
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Tên ngân hàng"
                value={bankName}
                onChange={e => {
                  setBankName(e.target.value);
                  // Gợi ý ngân hàng khi nhập
                  if (e.target.value.trim() === "") {
                    setBankSuggestions([]);
                  } else {
                    setBankSuggestions(
                      BANKS.filter(b =>
                        b.toLowerCase().includes(e.target.value.toLowerCase())
                      )
                    );
                  }
                }}
                className="p-2 border rounded"
              />
              {/* Hiển thị gợi ý ngân hàng */}
              {bankSuggestions.length > 0 && (
                <ul className="border rounded bg-white shadow max-h-40 overflow-y-auto z-10 absolute mt-12 w-full">
                  {bankSuggestions.map((bank, idx) => (
                    <li
                      key={idx}
                      className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                      onClick={() => {
                        setBankName(bank);
                        setBankSuggestions([]);
                      }}
                    >
                      {bank}
                    </li>
                  ))}
                </ul>
              )}
              <input
                type="text"
                placeholder="Số tài khoản ngân hàng"
                value={bankAccount}
                onChange={e => setBankAccount(e.target.value)}
                className="p-2 border rounded"
              />
              <button
                className={`px-4 py-2 rounded font-semibold shadow mt-2 ${
                  bankName && bankAccount && exchangePoints >= 1000
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!bankName || !bankAccount || exchangePoints < 1000}
                onClick={handleExchange}
              >
                Xác nhận đổi điểm
              </button>
              <button
                className="text-sm text-red-500 underline mt-1"
                onClick={() => {
                  setShowExchange(false);
                  setExchangeMsg("");
                }}
              >
                Đóng
              </button>
              {exchangeMsg && (
                <div className="text-red-500 text-sm mt-2">{exchangeMsg}</div>
              )}
            
            </div>
          </div>
        )}

        {/* Nhiệm vụ nhận điểm */}
        <div className="bg-white rounded-md shadow p-6">
          <div className="text-lg font-semibold mb-4 text-blue-700">Nhiệm vụ nhận điểm</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {missions.map((m, idx) => (
              <div key={idx} className={`flex items-center gap-3 p-4 rounded-lg border ${m.done ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}>
                {m.icon}
                <div className="flex-1">
                  <div className="font-medium">{m.label}</div>
                  <div className="text-xs text-gray-500">+{m.points} điểm</div>
                </div>
                {m.done ? (
                  <span className="text-green-500 font-semibold">Đã nhận</span>
                ) : (
                  <button className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">Nhận</button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Lịch sử nhiệm vụ */}
        <div className="bg-white rounded-md shadow p-6">
          <div className="text-lg font-semibold mb-4 text-blue-700">Lịch sử nhận điểm</div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 font-medium">Nhiệm vụ</th>
                  <th className="text-left py-2 px-4 font-medium">Điểm</th>
                  <th className="text-left py-2 px-4 font-medium">Ngày</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-2 px-4">{h.type}</td>
                    <td className="py-2 px-4 text-orange-500 font-semibold">+{h.points}</td>
                    <td className="py-2 px-4">{h.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Hướng dẫn */}
        <div className="bg-white rounded-md shadow p-6">
          <div className="text-lg font-semibold mb-2 text-blue-700">Hướng dẫn tích điểm</div>
          <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
            <li>Mỗi tài khoản mới sẽ nhận <b>100 điểm</b> khi đăng ký.</li>
            <li>Đăng nhập mỗi ngày nhận <b>10 điểm</b>.</li>
            <li>Đọc sách nhận <b>5 điểm</b> mỗi cuốn.</li>
            <li>Đánh giá sách nhận <b>5 điểm</b> mỗi lần đánh giá.</li>
            <li>Đổi điểm lấy tiền: <b>1 điểm = 100đ</b>. Tối thiểu 1.000 điểm mới được rút.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FinanceProfile;
