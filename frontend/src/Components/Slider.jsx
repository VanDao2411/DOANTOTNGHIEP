import React, { useEffect, useState } from "react";
import icons from "../Ultis/icons";
import assets from "../Ultis/assets";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";

const { banner_1, banner_2, slider_3, slider_4, slider_5 } = assets;
const { MdKeyboardArrowLeft, MdKeyboardArrowRight } = icons;

const images = [banner_1, banner_2, slider_3, slider_4, slider_5];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <div className="mt-5 relative ">
        <AnimatePresence mode="wait"> 
            <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt="slider"
                initial={{ opacity: 0, x: -70 }} // Bắt đầu từ bên phải
                animate={{ opacity: 1, x: 0 }} // Hiển thị ở vị trí trung tâm
                exit={{ opacity: 0, x: 70 }} // Rời khỏi sang bên trái
                transition={{ duration: 1.0 }} // Thời gian chuyển động
                className="w-full h-[350px]  rounded-lg object-cover"
            />
        </AnimatePresence>
      <div className="flex justify-center">
        <div
          className="py-4 w-[60px] bg-blue-500 opacity-20 rounded-full absolute top-32 left-2 cursor-pointer"
          onClick={prevSlide}
        >
          <MdKeyboardArrowLeft size={28} color="white" className="ml-3" />
        </div>
        <div
          className="py-4 w-[60px] bg-blue-500 opacity-20 rounded-full absolute top-32 right-2 cursor-pointer "
          onClick={nextSlide}
        >
          <MdKeyboardArrowRight size={28} color="white" className="ml-4 bg-" />
        </div>
      </div>
      {/* <div className="absolute top-24 left-36">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 5, x: 0 }}
          transition={{ duration: 1.0 }}
          className="text-[50px] font-raleway font-bold text-[#80244d] tracking-widest"
        >
          SÁCH HAY{" "}
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          className="text-[50px] font-raleway font-bold text-[#e95834] pl-[160px] tracking-widest"
        >
          CHO GIỚI TRẺ{" "}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          className="text-[22px] text-white font-raleway tracking-widest font-light mt-5"
        >
          Sách mở ra trước mắt ta những chân trời mới
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          className="text-[22px] text-white font-raleway tracking-widest font-light break-words w-[550px]"
        >
          Đọc sách như thả mình vào dòng chảy của bất tận, nơi ta có thể sống
          hàng triệu cuộc đời chỉ bằng một trang giấy.
        </motion.p>
        <button className="absolute mt-10 py-3 px-10 border border-[#80244d] rounded-md text-[20px] tracking-wider text-[#80244d] cursor-pointer ">
          {" "}
          Khám Phá
        </button>
      </div> */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-3">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 
                        ${
                          currentIndex === index
                            ? "bg-blue-500 scale-125"
                            : "bg-gray-300"
                        }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
