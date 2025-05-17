import React from 'react'
import icons from '../Ultis/icons'
const { LuSend, CiMail, TiSocialFacebook, BsInstagram, IoLocationSharp, MdLocalPhone } = icons
const Footers = () => {
    return (
        <div className="">
            <div className='flex justify-center bg-blue-300 w-full h-[150px] mb-10 gap-10 pr-40'>
                <div className="flex flex-col items-end">
                    <div className="flex gap-5 mt-5 ">
                        <LuSend size={24} color='blue' className='mt-2' />
                        <h1 className='font-raleway font-bold tracking-widest text-center text-[30px] text-white'>Join InBook Community</h1>
                    </div>
                    <div className="flex flex-col items-center text-right">
                        <p className='text-white font-raleway text-[18px] max-w-[800px] tracking-wider '>
                            A book is a garden, an orchard, a storehouse, a party, a company by the way, a counselor<span>a multitude of counselors</span>
                        </p>

                    </div>
                </div>
                <div className="flex mt-10">
                    <div className="h-[55px] w-[40px] bg-white pt-4 pl-2 rounded-l-lg">
                        <CiMail size={24} color='black' />
                    </div>
                    <input type="text" placeholder='Vui lòng nhập email của bạn...' className='h-[55px] w-[280px] focus:outline-none' />
                    <button className='h-[55px] w-[120px] bg-[#e95834] rounded-r-lg border-4 border-white text-white font-raleway'>
                        Đăng Ký
                    </button>
                </div>
            </div>
            <div className="pl-[80px] pr-[80px] mb-5">
                <div className=" flex gap-10 justify-around">
                    <div className="w-[400px]">
                        <h3 className='text-gray-400 font-raleway font-bold text-[22px]'>Về InBook</h3>
                        <p className='text-gray-400 font-raleway text-[16px] break-work w-[400px] mt-5 '>
                            InBook được thành lập với sứ mệnh mang thế giới sách ngoại văn tinh tuyển về Việt Nam, giúp bạn đọc trong nước được tiếp cận và thưởng thức các tác phẩm nổi bật trên thế giới ngay sau khi xuất bản, với giá thành hợp lý và chất lượng tư vấn, chăm sóc khách hàng tuyệt vời
                        </p>
                        <img className='object-cover w-[100px] h-10 mt-2' src="https://theme.hstatic.net/200000896417/1001260822/14/footer_logobct_img.png?v=789" alt="" />
                        <div className="flex gap-5 mt-3">
                            <div className="flex flex-col items-center justify-center w-8 h-8 rounded-md border border-gray-400 text-gray-400 transition-all duration-300 hover:border-blue-500 hover:text-blue-500">
                                <TiSocialFacebook size={24} />
                            </div>
                            <div className="flex flex-col items-center justify-center w-8 h-8 rounded-md border border-gray-400 text-gray-400 transition-all duration-300 hover:border-blue-500 hover:text-blue-500">
                                <BsInstagram size={24} />
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <h3 className='text-gray-400 font-raleway font-bold text-[22px]'>Thông tin liên hệ</h3>
                        <div className=" flex gap-2 mt-5">
                            <IoLocationSharp size={24} className='text-gray-400' />
                            <h3 className='text-gray-400 font-raleway text-[16px]'>Nhà sách InBook - Thế giới sách Ngoại văn</h3>
                        </div>
                        <p className='text-gray-400 font-raleway text-[16px] mt-10'>
                        Tầng 7, số 93 đường Thụy Khuê, phường Thụy <br /> Khuê, quận Tây Hồ, Tp. Hà Nội.
                        </p>
                        <div className=" flex gap-5 mt-5">
                            <MdLocalPhone size={24} className='text-gray-400'/>
                            <h3 className='text-gray-400 font-sans text-[16px]'>08.181.181.89</h3>
                        </div>
                        <div className=" flex gap-5 mt-5">
                            <CiMail size={24} className='text-gray-400'/>
                            <h3 className='text-gray-400 font-sans text-[16px]'>info@inbook.vn</h3>
                        </div>
                    </div>
                    <div className="w-[220px]">
                        <h3 className='text-gray-400 font-raleway font-bold text-[22px]'>Hỗ trợ khách hàng</h3>
                        <ul className='mt-5'>
                            <div className="flex gap-2 group ">
                                <div className="h-2 px-1 rounded-full bg-gray-400 mt-2 group-hover:bg-blue-400"></div>
                                <li className="text-gray-400 font-raleway text-[16px] cursor-pointer group-hover:text-blue-400 ">Tìm kiếm</li>
                            </div>
                            <div className="flex gap-2 group mt-3 mb-3">
                                <div className="h-2 px-1 rounded-full bg-gray-400 mt-2 group-hover:bg-blue-400"></div>
                                <li className="text-gray-400 font-raleway text-[16px] cursor-pointer group-hover:text-blue-400 ">Giới thiệu</li>
                            </div>
                            <div className="flex gap-2 group ">
                                <div className="h-2 px-1 rounded-full bg-gray-400 mt-2 group-hover:bg-blue-400"></div>
                                <li className="text-gray-400 font-raleway text-[16px] cursor-pointer group-hover:text-blue-400 ">Điều khoản dịch vụ</li>
                            </div>
                            <div className="flex gap-2 group  mt-3 mb-3 ">
                                <div className="h-2 px-1 rounded-full bg-gray-400 mt-2 group-hover:bg-blue-400"></div>
                                <li className="text-gray-400 font-raleway text-[16px] cursor-pointer group-hover:text-blue-400 ">Phương thức thanh toán</li>
                            </div>
                            <div className="flex gap-2 group mb-3 ">
                                <div className="h-2 px-1 rounded-full bg-gray-400 mt-2 group-hover:bg-blue-400"></div>
                                <li className="text-gray-400 font-raleway text-[16px] cursor-pointer group-hover:text-blue-400 ">Phương thức vận chuyển</li>
                            </div>
                            <div className="flex gap-2 group ">
                                <div className="h-2 px-1 rounded-full bg-gray-400 mt-2 group-hover:bg-blue-400"></div>
                                <li className="text-gray-400 font-raleway text-[16px] cursor-pointer group-hover:text-blue-400 ">Liên hệ</li>
                            </div>
                        </ul>
                    </div>
                    <div className="">
                        <h3 className='text-gray-400 font-raleway font-bold text-[22px]'>Chính sách</h3>
                        <ul className='mt-5'>
                            <div className="flex gap-2 group mt-3 mb-3">
                                <div className="h-2 px-1 rounded-full bg-gray-400 mt-2 group-hover:bg-blue-400"></div>
                                <li className="text-gray-400 font-raleway text-[16px] cursor-pointer group-hover:text-blue-400 ">Chính sách bảo mật</li>
                            </div>
                            <div className="flex gap-2 group ">
                                <div className="h-2 px-1 rounded-full bg-gray-400 mt-5 group-hover:bg-blue-400"></div>
                                <li className="text-gray-400 font-raleway text-[16px] cursor-pointer group-hover:text-blue-400 ">Chính sách kiểm hàng, đổi <br /> trả và hoàn hàng</li>
                            </div>
                            <div className="flex gap-2 group  mt-3 mb-3 ">
                                <div className="h-2 px-1 rounded-full bg-gray-400 mt-5 group-hover:bg-blue-400"></div>
                                <li className="text-gray-400 font-raleway text-[16px] cursor-pointer group-hover:text-blue-400 ">Phân định trách nhiệm của <br /> thương nhân, tổ chức cung</li>
                            </div>
                            <div className="flex gap-2 group mb-3 ">
                                <div className="h-2 px-1 rounded-full bg-gray-400 mt-8 group-hover:bg-blue-400"></div>
                                <li className="text-gray-400 font-raleway text-[16px] cursor-pointer group-hover:text-blue-400 ">ứng dịch vụ logistics về cung <br /> cấp chứng từ hàng hóa <br /> trong quá trình giao nhận.</li>
                            </div>
                            
                        </ul>
                    </div>
                </div>
                <p className='text-gray-400 font-raleway text-[16px] mt-5 ml-5'>CÔNG TY TNHH GIÁO DỤC CHÂN TRỜI XANH <br />
                 Giấy chứng nhận Đăng ký Kinh doanh số 0107714889 do Sở Kế Hoạch và Đầu Tư Thành phố Hà Nội cấp ngày 24/01/2017</p>
            </div>
            <hr />
            <p className='text-gray-400 font-raleway text-[14px] text-center p-5'>Copyright © 2025 InBook.vn - Nhà sách Quốc tế. Powered by Harava</p>
        </div>
    )
}

export default Footers