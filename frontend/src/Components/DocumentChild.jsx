export const DocumentChild = ({ uploadedFiles, type }) => {
  const filteredFiles = uploadedFiles.filter(file => file.type === type);

  return (
    <div className="py-8 px-4 text-gray-600 border-b border-x rounded-b-md">
      {filteredFiles.length === 0 ? (
        <div className="text-center">Không có tài liệu nào thuộc mục này.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFiles.map((file, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col overflow-hidden hover:shadow-2xl transition cursor-pointer group"
            >
              {file.coverImage || file.fileUrl ? (
                <img
                  src={file.coverImage || file.fileUrl}
                  alt={file.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-gray-100 text-gray-400 italic">
                  Không có ảnh
                </div>
              )}
              <div className="p-4 flex-1 flex flex-col">
                <h4 className="font-bold text-lg text-blue-700 mb-1 truncate">{file.title}</h4>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                    {file.category}
                  </span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                    {file.price} điểm
                  </span>
                </div>
                <p className="text-gray-600 text-sm flex-1 mb-2 line-clamp-3">{file.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
