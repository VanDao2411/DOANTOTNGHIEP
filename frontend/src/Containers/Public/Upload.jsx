import React, { useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const API_URL = "http://localhost:5000";

export default function Upload() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState(""); // Thêm state lưu url ảnh
  const [imageUrl, setImageUrl] = useState(""); // Thêm state cho ảnh
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [coverImage, setCoverImage] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [documentFile, setDocumentFile] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]); // Thêm state này
  const user_id = localStorage.getItem(`user_id`) || "default_user";


  useEffect(() => {
    const stored = localStorage.getItem(`uploadedFiles_${user_id}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const onlyUploads = parsed.filter(item => item.type === "upload");
        setUploadedFiles(onlyUploads);
      } catch {
        setUploadedFiles([]);
      }
    } else {
      setUploadedFiles([]);
    }
  }, [user_id]);

  // Lấy danh mục từ API
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/categories")
      .then((res) => res.json())
      .then((data) => {
        const apiCategories = data.data.categories || [];
        setCategories([{ _id: "all", name: "Tất cả", slug: "tat-ca" }, ...apiCategories]);
      })
      .catch((err) => {
        setCategories([{ _id: "all", name: "Tất cả", slug: "tat-ca" }]);
        console.error("Lỗi khi lấy category:", err);
      });
  }, []);



  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
      // Nếu là ảnh thì tạo url tạm để hiển thị
      const file = event.target.files[0];
      if (file.type.startsWith("image/")) {
        setFileUrl(URL.createObjectURL(file));
      } else {
        setFileUrl("");
      }
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!fileName || !title || !category || !price || !description) return;

    const newFile = {
      fileName,
      fileUrl: fileUrl || imageUrl,
      title,
      category,
      price,
      description,
      type: 'upload', // Thêm loại upload
    };

    const newFiles = [...uploadedFiles, newFile];
    setUploadedFiles(newFiles);
    localStorage.setItem(`uploadedFiles_${user_id}`, JSON.stringify(newFiles));

    // Reset form
    setFileName("");
    setFileUrl("");
    setImageUrl("");
    setTitle("");
    setCategory("");
    setPrice("");
    setDescription("");
    setIsModalOpen(false);
  };


  const handleCardClick = (idx) => {
    setEditIndex(idx);
    setEditData({ ...uploadedFiles[idx] });
    setEditModalOpen(true);
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    const updated = [...uploadedFiles];
    updated[editIndex] = { ...editData };
    setUploadedFiles(updated);
    setEditModalOpen(false);
  };

  const handleDelete = (idx) => {
    setUploadedFiles(files => files.filter((_, i) => i !== idx));
  };

  // eslint-disable-next-line no-unused-vars
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (coverImage) formData.append("coverImage", coverImage);
    if (documentFile) formData.append("documentFile", documentFile);

    try {
      const res = await fetch(`${API_URL}/api/v1/documents/upload`, {
        method: "POST",
        body: formData,
        // Nếu cần token:
        // headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Tải lên thành công!");
      } else {
        setMessage(data.message || "Tải lên thất bại!");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setMessage("Lỗi kết nối server!");
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
              {index === 0 && (
                <img
                  src="https://cdn1.fahasa.com/media/wysiwyg/Thang-05-2025/Manifest_310x210.png" // Đường dẫn ảnh của bạn
                  alt="Tiếp cận hàng ngàn độc giả"
                  className="w-16 h-16 rounded-full shadow-md object-cover"
                />
              )}
              {index === 1 && (
                <img
                  src="https://cdn1.fahasa.com/media/wysiwyg/Thang-05-2025/NgoaiVan155_310x210.png"
                  alt="Cơ hội nhận quà tặng"
                  className="w-16 h-16 rounded-full shadow-md object-cover"
                />
              )}
              {index === 2 && (
                <img
                  src="https://cdn1.fahasa.com/media/wysiwyg/Thang-05-2025/DinhTi_small_310x210.png"
                  alt="Gia tăng thu nhập"
                  className="w-16 h-16 rounded-full shadow-md object-cover"
                />
              )}
              {index === 3 && (
                <img
                  src="https://cdn1.fahasa.com/media/wysiwyg/Thang-05-2025/MayTinh_T5_310X210.png"
                  alt="Phân tích và báo cáo"
                  className="w-16 h-16 rounded-full shadow-md object-cover"
                />
              )}
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
            className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-lg md:max-w-xl lg:max-w-2xl relative min-h-[400px] max-h-[80vh] overflow-y-auto"
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
            <form onSubmit={handleUpload}>
              <div className="border-2 border-dashed border-gray-300 p-6 text-center rounded-md">
                <p className="text-gray-700 font-medium">Kéo thả file hoặc</p>
                <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md mt-2 inline-block">
                  Chọn tập tin
                  <input type="file" className="hidden" onChange={handleFileChange} />
                </label>
                {fileName && <p className="text-gray-700 mt-2">Tệp đã chọn: {fileName}</p>}
                {/* Hiển thị ảnh preview nếu là ảnh */}
                {fileUrl && (
                  <img src={fileUrl} alt="preview" className="mx-auto mt-2 max-h-32 rounded shadow" />
                )}
                <p className="text-gray-500 mt-2">Hỗ trợ định dạng: PDF, Word, Ảnh (tối đa 20MB)</p>
              </div>

              <div className="mt-4">
                <label className="block font-medium">Tiêu đề (*)</label>
                <input type="text" className="w-full p-2 border rounded-md" placeholder="Nhập tiêu đề..."
                  value={title} onChange={e => setTitle(e.target.value)} />

                <label className="block font-medium mt-2">Danh mục (*)</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                >
                  <option value="">-Chọn danh mục-</option>
                  {categories
                    .filter(cat => cat._id !== "all")
                    .map(cat => (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                </select>
                <label className="block font-medium mt-2">Điểm (*)</label>
                <input type="text" className="w-full p-2 border rounded-md" placeholder="Nhập..."
                  value={price} onChange={e => setPrice(e.target.value)} />
                <label className="block font-medium mt-2">Mô tả (*)</label>
                <textarea className="w-full p-2 border rounded-md" rows="3" placeholder="Mô tả nội dung..."
                  value={description} onChange={e => setDescription(e.target.value)}></textarea>
                <label className="block font-medium mt-2">Link hình ảnh (tùy chọn)</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Dán link ảnh hoặc để trống"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                />

                <button
                  type="submit"
                  className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md"
                >
                  Upload file
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {editModalOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative min-h-[700px] max-h-[50vh] overflow-y-auto"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
              onClick={() => setEditModalOpen(false)}
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Chỉnh sửa tài liệu</h2>
            <form onSubmit={handleEditSave}>
              {/* Hiển thị ảnh hiện tại */}
              {editData.fileUrl ? (
                <img
                  src={editData.fileUrl}
                  alt="uploaded"
                  className="mx-auto mb-2 max-h-32 rounded shadow"
                />
              ) : (
                <div className="w-full h-32 flex items-center justify-center bg-gray-100 text-gray-400 italic mb-2">
                  Không có ảnh
                </div>
              )}
              {/* Chọn ảnh mới */}
              <label className="block font-medium">Chọn ảnh mới</label>
              <input
                type="file"
                className="w-full p-2 border rounded-md mb-2"
                accept="image/*"
                onChange={e => {
                  if (e.target.files.length > 0) {
                    setEditData({
                      ...editData,
                      fileUrl: URL.createObjectURL(e.target.files[0])
                    });
                  }
                }}
              />
              {/* Hoặc nhập link ảnh */}
              <label className="block font-medium">Hoặc dán link ảnh</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md mb-2"
                value={editData.fileUrl || ""}
                onChange={e => setEditData({ ...editData, fileUrl: e.target.value })}
                placeholder="Dán link ảnh hoặc để trống"
              />

              <label className="block font-medium">Tiêu đề</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md mb-2"
                value={editData.title || ""}
                onChange={e => setEditData({ ...editData, title: e.target.value })}
              />
              <label className="block font-medium">Danh mục</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md mb-2"
                value={editData.category || ""}
                onChange={e => setEditData({ ...editData, category: e.target.value })}
              />
              <label className="block font-medium">Giá</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md mb-2"
                value={editData.price || ""}
                onChange={e => setEditData({ ...editData, price: e.target.value })}
              />
              <label className="block font-medium">Mô tả</label>
              <textarea
                className="w-full p-2 border rounded-md mb-2"
                rows={3}
                value={editData.description || ""}
                onChange={e => setEditData({ ...editData, description: e.target.value })}
              />
              <button
                type="submit"
                className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
              >
                Lưu thay đổi
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}

      <div className="w-full max-w-4xl mt-10">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Tài liệu bạn đã upload</h3>
        {uploadedFiles.length === 0 ? (
          <p className="text-gray-500">Chưa có tài liệu nào.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {uploadedFiles.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col overflow-hidden hover:shadow-2xl transition cursor-pointer relative"
                onClick={() => handleCardClick(idx)}
              >
                {item.fileUrl ? (
                  <img
                    src={item.fileUrl}
                    alt="uploaded"
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center bg-gray-100 text-gray-400 italic">
                    Không có ảnh
                  </div>
                )}
                <div className="p-4 flex-1 flex flex-col">
                  <h4 className="font-bold text-lg text-purple-700 mb-1 truncate">{item.title}</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-semibold">
                      {item.category}
                    </span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                      {item.price} điểm
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm flex-1 mb-2 line-clamp-3">{item.description}</p>
                  {/* Nút xóa */}
                  <button
                    className="mt-2 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs self-end"
                    onClick={e => {
                      e.stopPropagation(); // Không mở modal chỉnh sửa khi bấm xóa
                      handleDelete(idx);
                    }}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
