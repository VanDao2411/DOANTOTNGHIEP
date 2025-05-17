import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Categorys, Footers, Product, Slider } from "../../Components";
import { NavLink } from "react-router-dom";
import assets from "../../Ultis/assets";
import { FaBook, FaUserGraduate, FaFeatherAlt, FaChartLine, FaMicrochip } from "react-icons/fa";
import HotProducts from "../../Components/HotProducts";

const { pic, pic_1, pic_2, pic_3, pic_4 } = assets;

const Home = () => {
  const pictures = [
    "https://theme.hstatic.net/200000896417/1001260822/14/categorybanner_1_img.jpg?v=789",
    "https://theme.hstatic.net/200000896417/1001260822/14/categorybanner_2_img.jpg?v=789",
    "https://theme.hstatic.net/200000896417/1001260822/14/categorybanner_3_img.jpg?v=789",
    "https://theme.hstatic.net/200000896417/1001260822/14/categorybanner_4_img.jpg?v=789",
  ];

  return (
    <div className="">
      <Slider />
      <div className="mt-10 mb-40">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.0 }}
          className="font-raleway flex gap-5 font-bold tracking-widest text-center text-[35px] text-gray-500"
        >
          <div className="h-1 w-[400px] rounded-md bg-slate-200 m-auto mt-5"></div>
          Hot Documents
          <div className="h-1 w-[400px] rounded-md bg-slate-200 m-auto mt-5"></div>
        </motion.h1>
        
        <HotProducts />
      </div>
       <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.0 }}
          className="mt-10 flex gap-5 justify-center items-center font-raleway font-bold tracking-widest text-center text-[35px] text-gray-500"
        >
           <div className="h-1 w-[450px] rounded-md bg-slate-200 m-auto mt-5"></div>
          Topic - Chủ Đề
           <div className="h-1 w-[450px] rounded-md bg-slate-200 m-auto mt-5"></div>
        </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 80, damping: 15 }}
          whileHover={{ scale: 1.08, transition: { duration: 0.5, type: "spring", stiffness: 120, damping: 10 } }}
          className="rounded-xl p-6 bg-blue-100 shadow text-blue-900 flex flex-col items-center cursor-pointer transition-transform duration-100"
        >
          <FaBook className="text-3xl mb-2 text-blue-500" />
          <h2 className="font-bold text-lg mb-2">Tài liệu học tập</h2>
          <p>Sách học tập, giáo trình, tài liệu tham khảo.</p>
          <span className="mt-2 text-xs bg-blue-200 px-2 py-1 rounded">#HọcTập</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 80, damping: 15 }}
          whileHover={{ scale: 1.08, transition: { duration: 0.5, type: "spring", stiffness: 120, damping: 10 } }}
          className="rounded-xl p-6 bg-green-100 shadow text-green-900 flex flex-col items-center cursor-pointer transition-transform duration-100"
        >
          <FaUserGraduate className="text-3xl mb-2 text-green-500" />
          <h2 className="font-bold text-lg mb-2">Phát triển bản thân</h2>
          <p>Kỹ năng sống, phát triển bản thân.</p>
          <span className="mt-2 text-xs bg-green-200 px-2 py-1 rounded">#KỹNăng</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, type: "spring", stiffness: 80, damping: 15 }}
          whileHover={{ scale: 1.08, transition: { duration: 0.5, type: "spring", stiffness: 120, damping: 10 } }}
          className="rounded-xl p-6 bg-yellow-100 shadow text-yellow-900 flex flex-col items-center cursor-pointer transition-transform duration-100"
        >
          <FaFeatherAlt className="text-3xl mb-2 text-yellow-500" />
          <h2 className="font-bold text-lg mb-2">Văn học & Truyện</h2>
          <p>Văn học, truyện ngắn, tiểu thuyết.</p>
          <span className="mt-2 text-xs bg-yellow-200 px-2 py-1 rounded">#VănHọc</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, type: "spring", stiffness: 80, damping: 15 }}
          whileHover={{ scale: 1.08, transition: { duration: 0.5, type: "spring", stiffness: 120, damping: 10 } }}
          className="rounded-xl p-6 bg-pink-100 shadow text-pink-900 flex flex-col items-center cursor-pointer transition-transform duration-100"
        >
          <FaChartLine className="text-3xl mb-2 text-pink-500" />
          <h2 className="font-bold text-lg mb-2">Kinh tế & Marketing</h2>
          <p>Kinh tế, quản trị, marketing.</p>
          <span className="mt-2 text-xs bg-pink-200 px-2 py-1 rounded">#KinhTế</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, type: "spring", stiffness: 80, damping: 15 }}
          whileHover={{ scale: 1.08, transition: { duration: 0.5, type: "spring", stiffness: 120, damping: 10 } }}
          className="rounded-xl p-6 bg-purple-100 shadow text-purple-900 flex flex-col items-center cursor-pointer transition-transform duration-100"
        >
          <FaMicrochip className="text-3xl mb-2 text-purple-500" />
          <h2 className="font-bold text-lg mb-2">Công nghệ & Kỹ thuật</h2>
          <p>Khoa học, công nghệ, kỹ thuật số.</p>
          <span className="mt-2 text-xs bg-purple-200 px-2 py-1 rounded">#CôngNghệ</span>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0 }}
      >
        <h1 className="font-raleway font-bold tracking-widest text-center text-[35px] text-gray-500 mt-10">
          Trending Books
        </h1>
      </motion.div>
      <div className="h-1 w-16 rounded-md bg-slate-200 m-auto mt-4"></div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0 }}
        className="mt-4"
      >
        <Product />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5"
      >
        {pictures.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Banner ${index + 1}`}
            className="w-full h-auto rounded-lg shadow-md"
          />
        ))}
      </motion.div>
      <div className="w-full h-[650px] bg-white rounded-lg shadow-2xl mt-5 pl-10">
        <h1 className="font-raleway font-bold text-gray-400 tracking-widest text-[20px] pl-14 pt-5">
          OUR JOURNAL
        </h1>
        <div className=" flex gap-5">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
          >
            <img
              src={pic}
              alt=""
              className="ml-10 transition-transform duration-500 hover:scale-110"
            />
          </motion.div>
          <div className="pl-12 mt-5">
            <div className="flex gap-4 ">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0 }}
              >
                <img
                  src={pic_1}
                  alt=""
                  className="w-[173px] h-[73] rounded-xl transition-transform duration-500 hover:scale-110"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0 }}
              >
                <p className="font-sans text-gray-400 font-semibold text-[18px]">
                  100 cuốn sách hay nhất thế kỷ 21 - phần 5 (The Guardian -
                  2019)
                </p>
                <h3 className="font-sans text-gray-400 font-semibold text-[16px]">
                  03 Tháng 02, 2025
                </h3>
              </motion.div>
            </div>
            <div className="flex gap-4 mt-5 mb-5 ">
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0 }}
              >
                <img
                  src={pic_2}
                  alt=""
                  className="w-[173px] h-[73] rounded-xl transition-transform duration-500 hover:scale-110"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 110 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0 }}
              >
                <p className="font-sans text-gray-400 font-semibold text-[18px]">
                  100 cuốn sách hay nhất thế kỷ 21 - phần 5 (The Guardian -
                  2019)
                </p>
                <h3 className="font-sans text-gray-400 font-semibold text-[16px]">
                  03 Tháng 02, 2025
                </h3>
              </motion.div>
            </div>
            <div className="flex gap-4 ">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0 }}
              >
                <img
                  src={pic_3}
                  alt=""
                  className="w-[173px] h-[73] rounded-xl transition-transform duration-500 hover:scale-110"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0 }}
              >
                <p className="font-sans text-gray-400 font-semibold text-[18px]">
                  100 cuốn sách hay nhất thế kỷ 21 - phần 5 (The Guardian -
                  2019)
                </p>
                <h3 className="font-sans text-gray-400 font-semibold text-[16px]">
                  03 Tháng 02, 2025
                </h3>
              </motion.div>
            </div>
            <div className="flex gap-4 mt-5">
              <motion.div
                initial={{ opacity: 0, y: 130 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0 }}
              >
                <img
                  src={pic_4}
                  alt=""
                  className="w-[173px] h-[73] rounded-xl transition-transform duration-500 hover:scale-110"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 130 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0 }}
              >
                <p className="font-sans text-gray-400 font-semibold text-[18px]">
                  100 cuốn sách hay nhất thế kỷ 21 - phần 5 (The Guardian -
                  2019)
                </p>
                <h3 className="font-sans text-gray-400 font-semibold text-[16px]">
                  03 Tháng 02, 2025
                </h3>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
