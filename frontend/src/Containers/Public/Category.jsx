import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { NavLink, useParams } from "react-router-dom";
import Categorys from "../../Components/Categorys";
const categories = [
  { name: "Tất cả", slug: "" },
  {
    name: "Lớp 1",
    slug: "lop-1",
    subcategories: [
      { title: "Thư viện đề thi" },
      { name: "Đề thi giữa kì 1", slug: "de-thi-giua-ki-1" },
      { name: "Đề thi học kì 1", slug: "de-thi-hoc-ki-1" },
      { name: "Đề thi học kì 2", slug: "de-thi-hoc-ki-2" },
      { name: "Đề thi giữa kì 2", slug: "de-thi-giua-ki-2" },
      { name: "Đề thi giữa kì 2", slug: "de-thi-giua-ki-2" },
      { title: "Trắc nghiệm" },
      { name: "Toán", slug: "toan" },
      { name: "Tiếng việt", slug: "tieng-viet" },
      { name: "Tiếng anh", slug: "tieng-anh" },
      { title: "Tài liệu giáo viên" },
      { name: "Toán", slug: "toan" },
      { name: "Tiếng việt", slug: "tieng-viet" },
      { name: "Tiếng anh", slug: "tieng-anh" },
      { title: "Bài tập hằng ngày" },
      { name: "Toán", slug: "toan" },
      { name: "Tiếng việt", slug: "tieng-viet" },
      { name: "Tiếng anh", slgp: "tieng-anh" },
    ],
  },
  { name: "Lớp 2", slug: "lop-2" },
  { name: "Lớp 3", slug: "lop-3" },
  { name: "Lớp 4", slug: "lop-4" },
  { name: "Lớp 5", slug: "lop-5" },
  { name: "Lớp 6", slug: "lop-6" },
  { name: "Lớp 7", slug: "lop-7" },
  { name: "Lớp 8", slug: "lop-8" },
  { name: "Lớp 9", slug: "lop-9" },
  { name: "Lớp 10", slug: "lop-10" },
  { name: "Lớp 11", slug: "lop-11" },
  { name: "Lớp 12", slug: "lop-12" },
  { name: "Thi Chuyển Cấp", slug: "th-chuyen-cap" },
];

const activeStyle = `
  relative text-blue-500 after:content-[''] after:absolute after:left-0 after:bottom-[-16px] 
  after:w-full after:h-[2px] after:bg-blue-500 after:scale-x-100
`;

const notActiveStyle = `
  relative hover:text-blue-200 after:content-[''] after:absolute after:left-0 after:bottom-[-16px] 
  after:w-full after:h-[2px] after:bg-blue-200 after:scale-x-0 after:origin-center 
  after:transition-transform after:duration-300 hover:after:scale-x-100
`;
const Category = () => {
  const { categorySlug } = useParams();
  return (
   <div className="">
    <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          className="w-full h-[140px] bg-white shadow-xl rounded-xl mt-10"
        >
        <motion.h1 className="font-raleway font-bold tracking-widest text-center text-[35px]  text-gray-500">
              Document Types
            </motion.h1>
          <div className="h-1 w-16 rounded-md bg-slate-200 m-auto mt-2"></div>
          <div className="mt-5 ml-5">
            <ul className="flex gap-4 font-raleway text-[20px]">
              {categories.map((category, index) => {
                const isActive = categorySlug
                  ? category.slug === categorySlug ||
                    (category.subcategories &&
                      category.subcategories.some(
                        (sub) => sub.slug === categorySlug
                      ))
                  : index === 0; // Chỉ active "Tất cả" nếu không có categorySlug

                return (
                  <li
                    key={index}
                    className={`relative group ${
                      index === 0 ? "hover:bg-gray-100" : ""
                    }`}
                  >
                    <NavLink
                      to={category.slug ? `/category/${category.slug}` : "/"}
                      className={`${isActive ? activeStyle : notActiveStyle} ${
                        index === 0 ? "hover:text-blue-600" : ""
                      }`}
                    >
                      {category.name} 
                    </NavLink>

                    {/* Dropdown menu */}
                    {category.subcategories && (
                      <div
                        className="absolute left-0 top-full mt-2 w-[80rem] bg-white shadow-lg rounded-md py-4 z-10
            opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform"
                      >
                        <div className="grid grid-cols-4 gap-6 p-4">
                          {(() => {
                            const groups = [];
                            let currentGroup = null;

                            category.subcategories.forEach((item) => {
                              if (item.title) {
                                currentGroup = { title: item.title, items: [] };
                                groups.push(currentGroup);
                              } else if (currentGroup) {
                                currentGroup.items.push(item);
                              }
                            });

                            return groups.map((group, groupIndex) => (
                              <div
                                key={`group-${groupIndex}`}
                                className="space-y-2"
                              >
                                <h3 className="font-bold text-lg border-b pb-2 text-gray-700">
                                  {group.title}
                                </h3>
                                <div className="space-y-1">
                                  {group.items.map((item, itemIndex) => (
                                    <NavLink
                                      key={`item-${groupIndex}-${itemIndex}`}
                                      to={`/category/${category.slug}/${item.slug}`}
                                      className="block py-1 px-2 hover:bg-blue-50 rounded text-gray-600 hover:text-blue-600 transition-colors"
                                    >
                                      {item.name}
                                    </NavLink>
                                  ))}
                                </div>
                              </div>
                            ));
                          })()}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          className=""
        >
          <Categorys selectedCategory={categorySlug || "Tất cả"} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          className="flex justify-center m-5"
        >
          <button className="py-3 px-8 bg-[#e95834] rounded-md text-[20px] font-raleway text-white ">
            Xem Thêm
          </button>
        </motion.div>
   </div>
  )
}

export default Category