import React from 'react';
import icons from '../Ultis/icons';
import { jsPDF } from 'jspdf';

const { FaDownload } = icons;

const ProductCard = ({ product, onClick, onDownload }) => {
  return (
    <div
      onClick={() => onClick(product)}
      className="bg-white rounded-2xl shadow hover:shadow-xl cursor-pointer transition-transform hover:-translate-y-1 flex flex-col w-full border border-blue-100"
      style={{ minHeight: '360px', maxWidth: '340px', flexShrink: 0 }}
    >
      <img
        src={product.fileUrl}
        alt={product.title}
        className="w-full h-[190px] object-cover rounded-t-2xl bg-[#eaf1fb]"
      />
      <div className="px-4 py-3 flex-1 flex flex-col justify-between">
        <h3 className="text-[#2563eb] font-bold text-lg truncate mb-1">{product.title}</h3>

        <div className="flex flex-wrap gap-2 text-xs text-blue-700 mb-2">
          <span>
            <span className="font-semibold">Thể loại:</span>{" "}
            <span className="text-[#2563eb]">
              {Array.isArray(product.categoryIds) && product.categoryIds.length > 0
                ? product.categoryIds.map(cat => cat.name).join(", ")
                : "Đang cập nhật"}
            </span>
          </span>
          <span>
            <span className="font-semibold">Tác giả: {product.authorName} </span>{" "}
            <span className="text-[#2563eb]">{product.downloaded}</span>
          </span>
        </div>
        <div className="line-clamp-2 text-blue-900 text-xs mb-2">{product.description}</div>
        <div className="flex gap-2 justify-between items-center mt-2">
          <button
            className="flex items-center gap-1 px-4 py-1.5 bg-gradient-to-r from-[#2563eb] to-[#60a5fa] rounded-lg text-white text-xs font-semibold hover:from-[#1d4ed8] hover:to-[#3b82f6] transition"
            onClick={(e) => {
              e.stopPropagation();
              const doc = new jsPDF();
              doc.text(`Product Name: ${product.name}`, 10, 10);
              doc.text(`Product ID: ${product.id}`, 10, 20);
              doc.text(`Description: ${product.description || 'No description'}`, 10, 30);
              doc.save(`${product.name}.pdf`);
              onDownload(product);
            }}
          >
            <FaDownload className="text-base" />
            Download
          </button>
          <span className="px-4 py-1.5 bg-[#eaf1fb] text-[#2563eb] rounded-lg text-xs font-semibold border border-blue-200">
            5 điểm
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;