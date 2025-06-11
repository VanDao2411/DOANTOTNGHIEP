import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { ThumbsUpIcon, ShareIcon, UserIcon, X, ChevronLeft, ChevronRight, Heart } from 'lucide-react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ProductDetails = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState(null);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const [showDownloadMsg, setShowDownloadMsg] = useState(false);
  const pdfRef = useRef(null);

  // State cho bình luận
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    // Bình luận mẫu ban đầu (có thể lấy từ API)
    {
      user: "test2",
      rating: 5,
      content: "good!!",
      date: "27/05/2024 15:05",
    },
  ]);
  // State cho đánh giá sao của người dùng
  const [userRating, setUserRating] = useState(5);

  // State cho yêu thích
  const [isFavorite, setIsFavorite] = useState(false);
  const user_id = localStorage.getItem("user_id") || "default_user";

  const handleWhitList = () => {
    const whitelistKey = `uploadedFiles_${user_id}`;
    const currentWhitelist = JSON.parse(localStorage.getItem(whitelistKey)) || [];

    if (isFavorite) {
      // Xoá khỏi whitelist
      const updatedWhitelist = currentWhitelist.filter(item => item.id !== productDetail.id);
      localStorage.setItem(whitelistKey, JSON.stringify(updatedWhitelist));
      setIsFavorite(false);
    } else {
      // Thêm vào whitelist
      const newItem = {
        id: productDetail.id,
        fileName: productDetail.title,
        title: productDetail.title,
        category: productDetail.category || "Chưa cập nhật",
        price: productDetail.price || "Chưa cập nhật",
        description: productDetail.description || "Chưa cập nhật",
        fileUrl: productDetail.fileUrl || "",
        type: "whitelist",
      };
      const updatedWhitelist = [newItem, ...currentWhitelist.filter(item => item.id !== newItem.id)];
      localStorage.setItem(whitelistKey, JSON.stringify(updatedWhitelist));
      setIsFavorite(true);
    }
  };

  // Hàm gửi bình luận
  const handleSendComment = () => {
    if (!comment.trim()) return;
    const now = new Date();
    setComments([
      {
        user: "Bạn",
        rating: userRating,
        content: comment,
        date: now.toLocaleString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      ...comments,
    ]);
    setComment("");
    setUserRating(5); // Reset về 5 sao sau khi gửi
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/documents/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((data) => {
        // Giả sử API trả về { data: { document: {...} } }
        setProductDetail(data.data?.document || null);
      })
      .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
  }, [id]);
  // console.log('Product Detail:', productDetail);

  if (!productDetail) {
    return <p className="text-center mt-5 text-lg text-gray-500">Đang tải...</p>;
  }

  // Danh sách ảnh phụ
  const subImages = [productDetail.picture_1, productDetail.picture_2, productDetail.picture_3].filter(Boolean);

  // Xử lý chuyển ảnh
  const handlePrev = () => setLightboxIndex((prev) => (prev === 0 ? subImages.length - 1 : prev - 1));
  const handleNext = () => setLightboxIndex((prev) => (prev === subImages.length - 1 ? 0 : prev + 1));

  // Download PDF
  const handleDownload = async () => {
    setShowDownloadMsg(true);
    setTimeout(() => setShowDownloadMsg(false), 2000);

    const input = pdfRef.current;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height]
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${productDetail.name}.pdf`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-100 rounded mt-5"
    >
      {/* Lightbox modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <button
            className="absolute top-6 right-8 text-white text-3xl hover:text-red-400"
            onClick={() => setLightboxOpen(false)}
            aria-label="Đóng"
          >
            <X size={36} />
          </button>
          <button
            className="absolute left-4 md:left-16 text-white text-4xl hover:text-emerald-400"
            onClick={handlePrev}
            aria-label="Trước"
          >
            <ChevronLeft size={48} />
          </button>
          <img
            src={subImages[lightboxIndex]}
            alt={`Ảnh phóng to ${lightboxIndex + 1}`}
            className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-2xl border-4 border-white"
          />
          <button
            className="absolute right-4 md:right-16 text-white text-4xl hover:text-emerald-400"
            onClick={handleNext}
            aria-label="Sau"
          >
            <ChevronRight size={48} />
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8 flex flex-col lg:flex-row gap-8">
        {/* Ảnh và ảnh phụ */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <img
            src={productDetail.fileUrl}
            alt={productDetail.title}
            className="w-48 h-64 sm:w-64 sm:h-80 md:w-72 md:h-[350px] object-cover rounded-xl shadow-lg bg-blue-100"
          />
          <div className="flex justify-center gap-4 mt-4">
            {subImages.map((pic, idx) => (
              <img
                key={idx}
                src={pic}
                alt={`Ảnh phụ ${idx + 1}`}
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border border-blue-200 shadow bg-blue-50 cursor-pointer transition-transform hover:scale-105"
                onClick={() => {
                  setLightboxIndex(idx);
                  setLightboxOpen(true);
                }}
              />
            ))}
          </div>
          <div className="flex gap-4 mt-4 text-blue-700 text-sm">
            <span><UserIcon className="inline w-4 h-4 mr-1" /> Đã xem: <b>{productDetail.viewCount}</b></span>
            <span><ThumbsUpIcon className="inline w-4 h-4 mr-1" /> Đã tải: <b>{productDetail.downloadCount}</b></span>
            <span><ShareIcon className="inline w-4 h-4 mr-1" /> Còn lại: <b>{productDetail.in_stock}</b></span>
          </div>
        </div>
        {/* Thông tin chi tiết */}
        <div
          ref={pdfRef}
          className="w-full lg:w-1/2 flex flex-col justify-center pl-0 lg:pl-6 mt-6 lg:mt-0 bg-white p-6 rounded-xl shadow-xl border border-blue-100"
        >
          <h2 className="text-3xl font-bold text-[#2563eb] mb-3">{productDetail.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-base sm:text-lg text-blue-900 mb-4">
            <p><span className="font-semibold">Thể loại:</span>{" "}
              {Array.isArray(productDetail.categoryIds) && productDetail.categoryIds.length > 0
                ? productDetail.categoryIds.map(cat => cat.name).join(", ")
                : "Đang cập nhật"}
            </p>
            <p><span className="font-semibold">Mã sản phẩm:</span> {productDetail.id_product || "Đang cập nhật"}</p>
            <p><span className="font-semibold">Nhà cung cấp:</span> {productDetail.name_supplier || "Đang cập nhật"}</p>
            <p><span className="font-semibold">Tác giả:</span> {productDetail.authorName || "Đang cập nhật"}</p>
            <p><span className="font-semibold">Dịch giả:</span> {productDetail.translator || "Đang cập nhật"}</p>
            <p><span className="font-semibold">Nhà xuất bản:</span> {productDetail.name_nxb || "Đang cập nhật"}</p>
            <p><span className="font-semibold">Năm xuất bản:</span> {productDetail.publicationYear || "Đang cập nhật"}</p>
            <p><span className="font-semibold">Ngôn ngữ:</span> {productDetail.language || "Đang cập nhật"}</p>
            <p><span className="font-semibold">Trọng lượng:</span> {productDetail.weight ? productDetail.weight + "g" : "Đang cập nhật"}</p>
            <p><span className="font-semibold">Kích thước:</span> {productDetail.averageRating || "Đang cập nhật"}</p>
            <p><span className="font-semibold">Số trang:</span> {productDetail.number_pages || "Đang cập nhật"}</p>
            <p><span className="font-semibold">Số lượng còn lại:</span> {productDetail.in_stock || "Đang cập nhật"}</p>
          </div>
          <p className="text-base sm:text-lg text-blue-900 mb-4">
            <span className="font-semibold">Mô tả:</span> {productDetail.description || "Đang cập nhật"}
          </p>
          <div className="flex gap-3 mt-4">
            <button
              className="px-6 py-3 bg-gradient-to-r from-[#2563eb] to-[#60a5fa] text-white rounded-lg hover:from-[#1d4ed8] hover:to-[#3b82f6] transition font-semibold shadow"
              onClick={handleDownload}
            >
              Download
            </button>
            <button
              className={`px-6 py-3 flex items-center justify-center bg-[#eaf1fb] rounded-lg hover:bg-[#dbeafe] transition shadow border border-blue-200`}
              onClick={handleWhitList}
            >
              <Heart
                fill={isFavorite ? "#ef4444" : "none"}
                color={isFavorite ? "#ef4444" : "#2563eb"}
                className="w-6 h-6"
              />
            </button>
          </div>
          {showDownloadMsg && (
            <div className="fixed top-8 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-50">
              Download thành công!
            </div>
          )}
        </div>
      </div>
      {/* Bình luận mẫu */}
      <div className="p-6 border-t bg-gray-50">
        {/* Đánh giá sao */}
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-blue-700">Đánh giá của bạn:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setUserRating(star)}
              className="focus:outline-none"
            >
              <span
                className={
                  star <= userRating
                    ? "text-yellow-400 text-2xl"
                    : "text-gray-300 text-2xl"
                }
              >
                ★
              </span>
            </button>
          ))}
          <span className="ml-2 text-blue-700 font-medium">{userRating} sao</span>
        </div>
        <textarea
          className="w-full p-3 border rounded resize-none focus:ring-2 focus:ring-emerald-400"
          placeholder="Viết bình luận..."
          rows={3}
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <div className="flex justify-end mt-2">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition font-semibold shadow"
            onClick={handleSendComment}
          >
            Gửi bình luận
          </button>
        </div>
        <div className="mt-6 space-y-6">
          {comments
            .filter(cmt => cmt.rating >= 1)
            .map((cmt, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{cmt.user}</span>
                    <div className="flex">
                      {"★★★★★".split("").map((star, i) => (
                        <span
                          key={i}
                          className={
                            i < cmt.rating ? "text-yellow-400" : "text-gray-300"
                          }
                        >
                          {star}
                        </span>
                      ))}
                    </div>
                    <span className="text-gray-500 text-sm">{cmt.date}</span>
                  </div>
                  <p className="text-gray-600 mt-1">{cmt.content}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
