import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import icons from "../Ultis/icons";
import { ThumbsUpIcon, ShareIcon, ClockIcon, UserIcon } from 'lucide-react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'


const { SiHomeassistantcommunitystore, TbTruckDelivery,
  MdAssignmentReturn, MdKeyboardArrowRight, } = icons
const ProductDetails = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [productDetail, setProductDetail] = useState(null);

  useEffect(() => {
    fetch("/src/apis/apiProducts.json") // Đặt file JSON trong thư mục public
      .then((response) => response.json())
      .then((data) => {
        const product = data.find((item) => item.id.toString() === id); // Tìm sản phẩm có id khớp
        setProductDetail(product);
      })
      .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
  }, [id]);

  if (!productDetail) {
    return <p className="text-center mt-5 text-lg text-gray-500">Đang tải...</p>;
  }

  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.5 }}
    className="min-h-screen bg-gray-50 mt-5"
  >
    {/* Top Navigation */}
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">{productDetail.name}</span>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <ClockIcon className="w-4 h-4" />
            <span>27/05/2024 15:05</span>
          </div>
          <div className="flex items-center space-x-1">
            <UserIcon className="w-4 h-4" />
            <span>0</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-600 rounded">
            <ThumbsUpIcon className="w-4 h-4" />
            <span>Like</span>
          </button>
          <button className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-600 rounded">
            <ShareIcon className="w-4 h-4" />
            <span>Thêm vào bộ sưu tập</span>
          </button>
          <button className="px-3 py-1 bg-green-500 text-white rounded">
            Download
          </button>
          <button className="px-3 py-1 bg-orange-500 text-white rounded">
            Submit
          </button>
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="max-w-7xl mx-auto px-4 py-4 flex">
      <div className="flex-1 mr-4">
        <div className="bg-white rounded-lg shadow">
          <div className="border-8 border-emerald-500 rounded-lg relative">
            <div className="absolute top-2 right-2 bg-white px-2 text-sm">2/3</div>
            <div className="p-8">
              <img
                src={productDetail.image}
                alt="Document content"
                className="w-full"
              />
            </div>
            <div className="absolute bottom-2 right-2 bg-white px-2 text-sm">2/3</div>
          </div>
          <div className="flex justify-center p-4">
            <button className="px-4 py-2 bg-gray-800 text-white rounded">
              Xem thêm 3/8
            </button>
          </div>
          <div className="p-4 border-t">
            <textarea
              className="w-full p-3 border rounded resize-none"
              placeholder="Viết bình luận..."
              rows={3}
            />
            <div className="flex justify-end mt-2">
              <button className="px-4 py-2 bg-green-500 text-white rounded">
                Gửi bình luận
              </button>
            </div>
            <div className="mt-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">test2</span>
                    <div className="flex">
                      {'★★★★★'.split('').map((star, i) => (
                        <span key={i} className="text-yellow-400">{star}</span>
                      ))}
                    </div>
                    <span className="text-gray-500 text-sm">27/05/2024 15:05</span>
                  </div>
                  <p className="text-gray-600 mt-1">good!!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-64">
        <div className="bg-blue-100 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span>Hỏi đáp với AI</span>
            <button className="text-blue-600">
              <ClockIcon className="w-4 h-4" />
            </button>
          </div>
          <button className="w-full bg-green-500 text-white rounded py-2 text-sm">
            Gợi ý bài trong exam này
          </button>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-medium mb-2">Đề giữa kì môn IT</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <UserIcon className="w-4 h-4" />
            <span>Trần Nam</span>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
  );
};

export default ProductDetails;
