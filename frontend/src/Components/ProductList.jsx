import React from 'react'
import { useCart } from '../Context/CartProvide';



const ProductList = ({ products }) => {
    const {addToCart} = useCart(); 
    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-5">
                {products.map((product) => (
                    <div key={product.id} className="h-[400px] w-[280px] bg-white rounded-lg mb-5 flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105 cursor-pointer shadow-2xl">
                        <img src={product.image} alt={product.name} className="w-full h-4/5 object-cover rounded-t-lg" />
                        <h3 className=" font-raleway text-[#80244d] text-[18px] font-semibold ">{product.name}</h3>
                        <h3 className="text-[#8e9293] text-[18px]">Đã tải về: <span className='font-sans text-[#e95834] text-[16px]'> {product.viewed} </span> </h3>
                        <h3 className='text-[#8e9293] text-[14px]'>Đã xem: <span className='font-sans text-[#e95834]'> {product.downloaded} </span> </h3>
                        <div className="">
                            <button className='py-2 px-10 bg-[#e95834] rounded-lg text-white mb-2' onClick={() => addToCart(product)} >Download</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductList