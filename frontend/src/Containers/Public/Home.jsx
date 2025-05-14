import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Categorys, Footers, Product, Slider } from "../../Components";
import { NavLink,} from "react-router-dom";
import assets from "../../Ultis/assets";





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
      <div className="mt-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.0 }}
          className="font-raleway font-bold tracking-widest text-center text-[35px] text-gray-500"
        >
          Trending Documents
        </motion.h1>
        <div className="h-1 w-16 rounded-md bg-slate-200 m-auto mt-4"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          className="mt-4"
        >
          <Product />
        </motion.div>
        
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
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
