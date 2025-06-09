// backend/utils/catchAsync.js

/**
 * Hàm bậc cao (Higher-Order Function) để bắt lỗi trong các hàm async middleware/controller của Express.
 * Nó nhận vào một hàm async (fn) và trả về một hàm mới.
 * Hàm mới này sẽ thực thi fn và nếu fn trả về một Promise bị reject (có lỗi),
 * lỗi đó sẽ được tự động bắt và chuyển đến middleware xử lý lỗi toàn cục thông qua next(error).
 * @param {Function} fn - Hàm async controller hoặc middleware.
 * @returns {Function} - Một hàm mới đã được bọc để tự động bắt lỗi.
 */
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(err => next(err));
    };
};

module.exports = catchAsync;