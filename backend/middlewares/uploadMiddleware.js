// const multer = require('multer');
// const AppError = require('../utils/AppError');
// const fs = require('fs');
// const path = require('path');

// // Hàm để đảm bảo thư mục tồn tại
// const ensureDirectoryExistence = (filePath) => {
//     const dirname = path.dirname(filePath);
//     if (fs.existsSync(dirname)) {
//         return true;
//     }
//     ensureDirectoryExistence(dirname);
//     fs.mkdirSync(dirname);
// };

// // Cấu hình nơi lưu trữ và tên file
// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         // Phân loại file vào các thư mục khác nhau dựa trên fieldname
//         let uploadPath = 'public/uploads/';
//         if (file.fieldname === 'coverImage') {
//             uploadPath += 'images/';
//         } else if (file.fieldname === 'documentFile') {
//             uploadPath += 'documents/';
//         }
        
//         // Đảm bảo thư mục tồn tại trước khi lưu
//         ensureDirectoryExistence(path.join(uploadPath, file.originalname));
//         cb(null, uploadPath);
//     },
//     filename: (req, file, cb) => {
//         const ext = file.mimetype.split('/')[1];
//         const uniqueSuffix = `${req.user.id}-${Date.now()}`;
//         cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
//     }
// });

// // Cấu hình bộ lọc file (chỉ cho phép một số loại file nhất định)
// const multerFilter = (req, file, cb) => {
//     if (file.fieldname === 'coverImage') {
//         if (file.mimetype.startsWith('image')) {
//             cb(null, true); // Chấp nhận file ảnh
//         } else {
//             cb(new AppError('File không phải là ảnh! Vui lòng chỉ tải lên file ảnh.', 400), false);
//         }
//     } else if (file.fieldname === 'documentFile') {
//         const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
//         if (allowedTypes.includes(file.mimetype)) {
//             cb(null, true); // Chấp nhận file PDF/DOC/DOCX
//         } else {
//             cb(new AppError('Loại file tài liệu không được hỗ trợ! Vui lòng tải lên PDF, DOC, hoặc DOCX.', 400), false);
//         }
//     } else {
//         cb(null, false); // Bỏ qua các file khác
//     }
// };

// // Khởi tạo multer upload instance
// const upload = multer({
//     storage: multerStorage,
//     fileFilter: multerFilter,
//     limits: {
//         fileSize: 1024 * 1024 * 20 // Giới hạn là 20 Megabytes
//     }
// });

// exports.uploadDocumentFiles = upload.fields([
//     { name: 'coverImage', maxCount: 1 },
//     { name: 'documentFile', maxCount: 1 }
// ]);

// backend/middlewares/uploadMiddleware.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary'); // Import cấu hình cloudinary
const AppError = require('../utils/AppError');

// Cấu hình lưu trữ cho ảnh bìa trên Cloudinary
const coverImageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'thu-vien-online/cover_images', // Tên thư mục trên Cloudinary
        allowed_formats: ['jpeg', 'png', 'jpg'],
        // (Tùy chọn) Tạo tên file duy nhất trên Cloudinary
        public_id: (req, file) => {
            const uniqueSuffix = `${req.user.id}-${Date.now()}`;
            return `${file.fieldname}-${uniqueSuffix}`;
        },
    },
});

// Cấu hình lưu trữ cho file tài liệu trên server local (chúng ta vẫn giữ lại)
const documentFileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'public/uploads/documents/';
        require('fs').mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const ext = require('path').extname(file.originalname);
        const uniqueSuffix = `${req.user.id}-${Date.now()}`;
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    }
});


// Middleware để upload chỉ ảnh bìa lên Cloudinary
exports.uploadCoverImage = multer({ storage: coverImageStorage }).single('coverImage');


// Middleware để xử lý cả ảnh bìa (lên cloud) và file tài liệu (lên local server)
const upload = multer({
    storage: multer.diskStorage({}), // Dùng storage tạm thời, sẽ quyết định trong fileFilter
    fileFilter: (req, file, cb) => {
        // Bạn có thể thêm logic filter ở đây nếu cần
        cb(null, true);
    }
}).fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'documentFile', maxCount: 1 }
]);

// Chúng ta sẽ không dùng upload.fields trực tiếp nữa mà sẽ tạo một middleware tùy chỉnh
// để xử lý logic phức tạp này sau nếu cần. Trước mắt, hãy tập trung vào upload ảnh bìa.