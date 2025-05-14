import { useState } from "react";
import { FaUpload } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function Upload() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileName, setFileName] = useState("");
    
  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <p className="text-center text-gray-700 max-w-2xl text-lg leading-relaxed">
        Nơi chia sẻ tài liệu của Bạn bằng cách Upload files để mọi người có thể xem, tải và kết nối cùng Bạn.
        Chúng tôi sẽ mang đến cho các bạn hơn 10 triệu độc giả, thu nhập, danh tiếng và hơn thế nữa.
      </p>

      <h2 className="mt-8 text-2xl font-bold text-gray-900">Upload files để tận hưởng những ưu đãi khác biệt:</h2>
      <div className="mt-6 p-6 flex justify-around w-full max-w-4xl bg-white shadow-lg rounded-2xl border border-gray-200">
        {['Tiếp cận hàng ngàn độc giả', 'Cơ hội nhận quà tặng', 'Gia tăng thu nhập', 'Phân tích và báo cáo']
          .map((text, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full shadow-md"></div>
              <p className="text-md font-medium text-gray-800 mt-3">{text}</p>
            </div>
        ))}
      </div>

      <div className="mt-8 p-8 bg-white shadow-lg rounded-2xl w-full max-w-lg flex flex-col items-center border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900">Tải tài liệu lên</h3>
        <button
          className="mt-5 bg-green-500 hover:bg-green-600 transition-all text-white px-8 py-3 rounded-lg flex items-center text-lg shadow-md"
          onClick={() => setIsModalOpen(true)}
        >
          <FaUpload className="mr-3" /> Tải lên
        </button>
      </div>

      {isModalOpen && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white rounded-lg shadow-lg p-6 w-1/2 relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
              onClick={() => setIsModalOpen(false)}
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Upload Tài Liệu</h2>
            <div className="border-2 border-dashed border-gray-300 p-6 text-center rounded-md">
              <p className="text-gray-700 font-medium">Kéo thả file hoặc</p>
              <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md mt-2 inline-block">
                Chọn tập tin
                <input type="file" className="hidden" onChange={handleFileChange} />
              </label>
              {fileName && <p className="text-gray-700 mt-2">Tệp đã chọn: {fileName}</p>}
              <p className="text-gray-500 mt-2">Hỗ trợ định dạng: PDF, Word (tối đa 20MB)</p>
            </div>

            <div className="mt-4">
              <label className="block font-medium">Tiêu đề (*)</label>
              <input type="text" className="w-full p-2 border rounded-md" placeholder="Nhập tiêu đề..." />

              <label className="block font-medium mt-2">Danh mục (*)</label>
              <select className="w-full p-2 border rounded-md">
                <option>-Chọn danh mục-</option>
                <option>Giáo dục</option>
                <option>Kinh tế</option>
                <option>Kỹ thuật</option>
              </select>
              <label className="block font-medium mt-2">Giá cả (*)</label>
              <input type="text" className="w-full p-2 border rounded-md" placeholder="Nhập..." />
              <label className="block font-medium mt-2">Mô tả (*)</label>
              <textarea className="w-full p-2 border rounded-md" rows="3" placeholder="Mô tả nội dung..."></textarea>

              <button className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md">
                Upload file
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
