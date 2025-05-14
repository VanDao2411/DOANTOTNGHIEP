import React, { useState } from "react";
import { useCart } from "../../Context/CartProvide";
import icons from "../../Ultis/icons";

const { MdDelete, FaPlus, FaMinus, BiSolidDiscount, MdKeyboardArrowRight, MdErrorOutline, } = icons;

const Cart = () => {
    const { cartItems, removeCartItem } = useCart();
    const [selectedItems, setSelectedItems] = useState([]);

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    const totalPrice = selectedItems.reduce((total, id) => {
        const item = cartItems.find((item) => item.id === id);
        return total + (item ? item.price * item.quantity : 0);
    }, 0);

    const handleSelect = (id) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };



    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Tài liệu dowload của bạn ({totalItems} tài liệu) </h1>
            <div className="flex gap-5">
                <div className="w-[70%]">
                    <div className="w-full py-3 bg-white shadow-2xl mb-5 rounded-xl flex justify-between">
                        <div className="flex gap-5">
                            <input type="checkbox" checked={selectedItems.length === cartItems.length} onChange={() => {
                                setSelectedItems(selectedItems.length === cartItems.length ? [] : cartItems.map(item => item.id));
                            }} className="w-6 h-7 ml-5 cursor-pointer" />
                            <h3 className="font-raleway text-xl text-gray-600">Chọn tất cả tài liệu dowload ({totalItems} tài liệu)</h3>
                        </div>
                        <div className="flex gap-10 mr-[100px]">
                        
                            <h3 className="font-raleway text-xl text-gray-600">Thành tiền</h3>
                        </div>
                    </div>
                    {cartItems.length === 0 ? (
                        <p>Không có tài liệu dowload</p>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {cartItems.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 border h-[230px] bg-white rounded-lg shadow-2xl">
                                    <input type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => handleSelect(item.id)} className="w-6 h-7 ml-5" />

                                    <div className="w-[200px]">
                                        <img src={item.image} alt={item.name} className="w-full h-[180px] object-cover rounded-md" />
                                    </div>
                                    <div className="flex flex-col justify-start w-[280px]">
                                        <h3 className="text-[22px] font-bold text-[#80244d] mb-10">{item.name}</h3>
                                        <p className="text-[22px] font-bold text-[#e95834]">{item.price.toLocaleString()} VNĐ</p>
                                    </div>
                                    <div className="mr-2">
                                        <p className="text-[#e95834] font-bold text-[22px]">
                                            {(item.price * item.quantity).toLocaleString()} VNĐ
                                        </p>
                                    </div>
                                    <button onClick={() => removeCartItem(item.id)} className="p-2 hover:bg-gray-200 rounded-full transition">
                                        <MdDelete size={28} color="#8e9293" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="w-[30%]">
                    <div className="w-full h-[300px] bg-white shadow-2xl rounded-xl">
                        <div className="flex justify-between p-5 ">
                            <div className=" flex gap-5">
                                <BiSolidDiscount size={24} className="text-blue-400" />
                                <h3 className="font-raleway text-[16px] text-blue-400 font-semibold">KHUYẾN MÃI</h3>
                            </div>
                            <div className="flex gap-2">
                                <h3 className="font-raleway text-[16px] text-blue-400">Xem Thêm</h3>
                                <MdKeyboardArrowRight size={24} className="text-blue-400" />
                            </div>
                        </div>
                        <hr className="ml-5 mr-5" />
                        <div className="flex justify-between ml-5 mr-5 mt-5">
                            <h3 className="font-raleway text-[16px] font-semibold">Mã Giảm 10K - Toàn Sàn </h3>
                            <MdErrorOutline size={24} className="text-blue-400" />
                        </div>
                        <p className="text-[16px] font-raleway w-[280px] ml-5 mb-2">Đơn hàng từ 130k - Không bao gồm giá trị của các sản phẩm sau Manga,...</p>
                        <div className=" flex gap-2 pl-5 pr-5">
                            <div className="w-2/3">
                                <h3 className="text-[16px] font-sans">HSD: 31/03/2025</h3>
                                <div className="py-1 px-10 rounded-full bg-blue-300 mt-1 mb-1"></div>
                                <h3 className="text-[13px] font-sans">Mua thêm 130000đ</h3>
                            </div>
                            <div className="w-1/3 mt-3 ml-4">
                                <button className="w-[100px] h-10 bg-blue-400 text-white font-raleway rounded-lg">Mua thêm</button>
                            </div>
                        </div>
                        <hr className="m-5" />
                        <div className="flex gap-2">
                            <h3 className="text-gray-400 font-raleway ml-5">Có thể áp dụng đồng thời nhiều...</h3>
                            <MdErrorOutline size={24} className="text-gray-400" />
                        </div>
                    </div>
                    <div className="w-full h-[200px] bg-white shadow-2xl rounded-xl mt-5">
                        <div className=" flex justify-between pt-3">
                            <h3 className="text-[16px] font-raleway pl-5 ">Thành Tiền</h3>
                            <h3 className="text-[18px] font-sans text-right pr-5">{totalPrice.toLocaleString()} VNĐ</h3>
                        </div>
                        <hr className="m-5" />
                        <div className=" flex justify-between">
                            <h3 className="text-[18px] font-raleway font-semibold pl-5">Tổng Số Tiền</h3>
                            <h3 className="text-[22px] font-sans text-[#e95834] font-bold text-right pr-5 ">{totalPrice.toLocaleString()} VNĐ</h3>
                        </div>
                        <div className="w-[300px] h-[50px]  flex flex-col justify-center items-center rounded-lg mt-5 ml-16 bg-[#e95834]">
                            <button className="text-[22px] font-raleway font-bold  text-white">THANH TOÁN</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
