const AppError = require('../utils/AppError');

// Xử lý lỗi CastError từ Mongoose (ví dụ: sai định dạng ObjectId)
const handleCastErrorDB = (err) => {
    const message = `Giá trị không hợp lệ '${err.path}': '${err.value}'.`;
    return new AppError(message, 400);
};

// Xử lý lỗi Duplicate Key từ MongoDB (code 11000)
const handleDuplicateFieldsDB = (err) => {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    const message = `Trường '${field}' với giá trị '${value}' đã tồn tại. Vui lòng sử dụng giá trị khác.`;
    return new AppError(message, 400);
};

// Xử lý lỗi ValidationError từ Mongoose
const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Dữ liệu nhập vào không hợp lệ: ${errors.join('. ')}`;
    return new AppError(message, 400);
};

// Xử lý lỗi JWT không hợp lệ
const handleJWTError = () => new AppError('Token không hợp lệ. Vui lòng đăng nhập lại!', 401);

// Xử lý lỗi JWT hết hạn
const handleJWTExpiredError = () => new AppError('Token đã hết hạn. Vui lòng đăng nhập lại!', 401);


const sendErrorDev = (err, res) => {
    console.log('--- Gửi lỗi cho DEV ---');
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrorProd = (err, res) => {
    console.log('--- Gửi lỗi cho PROD ---');
    console.log('Lỗi isOperational?:', err.isOperational);

    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    
    return res.status(500).json({
        status: 'error',
        message: 'Đã có lỗi xảy ra phía server!',
    });
};


module.exports = (err, req, res, next) => {
    // --- BẮT ĐẦU DEBUG TRONG MIDDLEWARE CHÍNH ---
    console.log('--- GLOBAL ERROR HANDLER ĐÃ BẮT ĐƯỢC LỖI ---');
    console.log('Tên lỗi ban đầu (err.name):', err.name);
    console.log('Mã lỗi ban đầu (err.code):', err.code);
    console.log('Giá trị process.env.NODE_ENV:', process.env.NODE_ENV); // <<<--- RẤT QUAN TRỌNG
    // --- KẾT THÚC DEBUG ---

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };
        error.message = err.message;
        
        console.log('--- Đang xử lý lỗi cho môi trường PRODUCTION ---');

        if (err.name === 'CastError') {
            console.log('Đã nhận diện CastError, đang xử lý...');
            error = handleCastErrorDB(error);
        }
        if (err.code === 11000 || err.code === 11001) {
            console.log('Đã nhận diện DuplicateKeyError, đang xử lý...');
            error = handleDuplicateFieldsDB(error);
        }
        if (err.name === 'ValidationError') {
            console.log('Đã nhận diện ValidationError, đang xử lý...');
            error = handleValidationErrorDB(error);
        }
        if (err.name === 'JsonWebTokenError') {
            console.log('Đã nhận diện JsonWebTokenError, đang xử lý...');
            error = handleJWTError();
        }
        if (err.name === 'TokenExpiredError') {
            console.log('Đã nhận diện TokenExpiredError, đang xử lý...');
            error = handleJWTExpiredError();
        }
        if (err.code === 'LIMIT_FILE_SIZE') {
            error = new AppError('File upload quá lớn! Vui lòng chọn file có dung lượng nhỏ hơn 20MB.', 400);   
        }

        console.log('Đối tượng lỗi cuối cùng trước khi gửi đi:', error);
        sendErrorProd(error, res);
    } else {
        // Trường hợp NODE_ENV không phải 'development' cũng không phải 'production'
        console.log(`NODE_ENV là '${process.env.NODE_ENV}', không phải 'development' hay 'production'. Gửi lỗi mặc định.`);
        res.status(500).json({
            status: 'error',
            message: 'Đã có lỗi xảy ra phía server do cấu hình môi trường không xác định.'
        });
    }
};