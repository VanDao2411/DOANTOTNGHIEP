const { body } = require('express-validator');

const toArray = (value) => {
    if (typeof value === 'string' && value.length > 0) {
        return value.split(',').map(item => item.trim());
    }
    return value;
};

exports.createDocumentRules = [
    body('title', 'Tiêu đề là bắt buộc.').notEmpty({ ignore_whitespace: true }).trim(),
    body('authorId', 'ID Tác giả không hợp lệ.').notEmpty().isMongoId().trim(),
];

exports.updateDocumentRules = [
    body('title', 'Tiêu đề phải là một chuỗi ký tự.')
        .optional()
        .isString()
        .notEmpty({ ignore_whitespace: true })
        .trim(),

    body('authorId', 'ID Tác giả không hợp lệ.')
        .optional()
        .isMongoId(),

    // Cập nhật validator cho categoryIds và tagIds
    body('categoryIds')
        .optional()
        .customSanitizer(toArray) // Tự động chuyển chuỗi thành mảng
        .isArray().withMessage('Danh mục phải là một mảng các ID.'),

    body('categoryIds.*', 'ID Danh mục không hợp lệ.')
        .isMongoId(),

    body('tagIds')
        .optional()
        .customSanitizer(toArray) // Tự động chuyển chuỗi thành mảng
        .isArray().withMessage('Tags phải là một mảng các ID.'),

    body('tagIds.*', 'ID Tag không hợp lệ.')
        .isMongoId(),
];