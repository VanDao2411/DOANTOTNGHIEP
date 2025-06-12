const { body } = require('express-validator');

exports.createReviewRules = [
    body('rating', 'Vui lòng cung cấp điểm đánh giá.')
        .notEmpty(),
    
    body('rating', 'Điểm đánh giá phải là một số nguyên từ 1 đến 5.')
        .isInt({ min: 1, max: 5 }),

    body('comment', 'Bình luận phải là một chuỗi ký tự.')
        .optional() // Cho phép trường này có thể có hoặc không
        .isString()
        .trim() // Loại bỏ khoảng trắng thừa
];

exports.updateReviewRules = [
    body('rating', 'Điểm đánh giá phải là một số nguyên từ 1 đến 5.')
        .optional() // Chỉ validate nếu trường 'rating' được gửi lên
        .isInt({ min: 1, max: 5 }),

    body('comment', 'Bình luận phải là một chuỗi ký tự.')
        .optional() // Chỉ validate nếu trường 'comment' được gửi lên
        .isString()
        .trim()
];