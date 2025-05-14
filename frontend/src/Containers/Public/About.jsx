import { useRef } from "react";
import React from "react";
import {
  ShieldCheckIcon,
  LockIcon,
  KeyIcon,
  UsersIcon,
  StarIcon,
} from "lucide-react";

const About = () => {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    videoRef.current.removeAttribute("controls");
  };

  const handleMouseLeave = () => {
    videoRef.current.setAttribute("controls", "");
  };
  return (
    <div>
      <div className="w-full bg-white shadow-lg rounded-lg">
        {/* Header */}
        <div className="w-full bg-white pt-16 pb-24 px-4 flex flex-col items-center text-center">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Bảo vệ thông tin truyền thông <br />
              an toàn nghiệp vụ
            </h1>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Giải pháp bảo mật toàn diện cho doanh nghiệp và cá nhân
            </p>
            <button className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-md transition-colors">
              Tìm hiểu ngay
            </button>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="w-full bg-white py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
              Lợi ích của việc bảo mật thông tin <br />
              cho doanh nghiệp của bạn
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="bg-red-100 p-3 rounded-full mb-4">
                  <ShieldCheckIcon className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Bảo mật dữ liệu</h3>
                <p className="text-gray-600">
                  Bảo vệ thông tin quan trọng của doanh nghiệp khỏi các mối đe
                  dọa
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                  <LockIcon className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Truy cập an toàn</h3>
                <p className="text-gray-600">
                  Kiểm soát quyền truy cập vào hệ thống và dữ liệu quan trọng
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-3 rounded-full mb-4">
                  <KeyIcon className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Mã hóa thông tin</h3>
                <p className="text-gray-600">
                  Đảm bảo dữ liệu được truyền tải an toàn với công nghệ mã hóa
                  cao cấp
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Device Security Section */}
        <div className="w-full bg-white py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  An toàn bảo mật <br />
                  cho mọi thiết bị của bạn
                </h2>
                <p className="text-gray-600 mb-6">
                  Giải pháp bảo mật toàn diện cho mọi thiết bị, từ máy tính đến
                  điện thoại thông minh
                </p>
                <button className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-md transition-colors">
                  Tìm hiểu thêm
                </button>
              </div>
              <div
                className="md:w-1/2 flex justify-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <video
                  ref={videoRef}
                  src="https://mega.io/wp-content/uploads/20221223_Mega_Main_2-big-files-1.webm"
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
            </div>
          </div>
        </div>

        {/* Platform Protection Section */}
        <div className="w-full bg-white py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row-reverse items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Bảo vệ dữ liệu cá nhân <br />
                  trên mọi nền tảng
                </h2>
                <p className="text-gray-600 mb-6">
                  Giải pháp bảo vệ dữ liệu cá nhân toàn diện cho mọi nền tảng và
                  ứng dụng
                </p>
                <button className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-md transition-colors">
                  Tìm hiểu thêm
                </button>
              </div>
              <div
                className="md:w-1/2 flex justify-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <video
                  ref={videoRef}
                  src="https://mega.io/wp-content/uploads/20221223_Mega_Main_3-files-sharing-1.webm"
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
            </div>
          </div>
        </div>

        {/* Identity Protection Section */}
        <div className="w-full bg-white py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Bảo mật danh tính <br />
                  và quyền riêng tư
                </h2>
                <p className="text-gray-600 mb-6">
                  Giải pháp bảo vệ danh tính và quyền riêng tư trên môi trường
                  số
                </p>
                <button className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-md transition-colors">
                  Tìm hiểu thêm
                </button>
              </div>
              <div
                className="md:w-1/2 flex justify-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <video
                  ref={videoRef}
                  src="https://mega.io/wp-content/uploads/20221223_Mega_Main_4-safebox-1.webm"
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
            </div>
          </div>
        </div>

        {/* Trust Section */}
        <div className="w-full bg-white py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
              Tại sao các công ty tin tưởng <br />
              và lựa chọn chúng tôi?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="flex flex-col items-center text-center">
                <ShieldCheckIcon className="w-10 h-10 text-red-500 mb-4" />
                <h3 className="text-3xl font-bold mb-2">1.5K+</h3>
                <p className="text-gray-600">Doanh nghiệp tin dùng</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <UsersIcon className="w-10 h-10 text-blue-500 mb-4" />
                <h3 className="text-3xl font-bold mb-2">500K+</h3>
                <p className="text-gray-600">Người dùng cá nhân</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <StarIcon className="w-10 h-10 text-yellow-500 mb-4" />
                <h3 className="text-3xl font-bold mb-2">4.9/5</h3>
                <p className="text-gray-600">Đánh giá từ khách hàng</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="w-full bg-white py-16 px-4 border-t border-gray-200">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Bắt đầu sử dụng giải pháp bảo mật <br />
                của chúng tôi ngay hôm nay
              </h2>

              <button className="bg-red-500 hover:bg-red-600 text-white font-medium px-8 py-3 rounded-md mt-8 transition-colors">
                Đăng ký ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
