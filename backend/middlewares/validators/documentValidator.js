const { body } = require('express-validator');

exports.createDocumentRules = [
    body('title', 'Tiêu đề là bắt buộc và phải là một chuỗi ký tự.')
        .isString()
        .notEmpty({ ignore_whitespace: true })
        .trim(),
    
    body('description', 'Mô tả phải là một chuỗi ký tự.')
        .optional() // Trường này không bắt buộc
        .isString()
        .trim(),

    body('authorId', 'ID Tác giả không hợp lệ.')
        .notEmpty()
        .withMessage('ID Tác giả là bắt buộc.')
        .isMongoId() // Kiểm tra xem có phải là định dạng ObjectId của MongoDB không
        .trim(),

    body('categoryIds', 'Danh mục phải là một mảng các ID.')
        .isArray({ min: 1 }) // Phải là một mảng có ít nhất 1 phần tử
        .withMessage('Tài liệu phải thuộc về ít nhất một danh mục.'),

    body('categoryIds.*', 'ID Danh mục không hợp lệ.') // Ký tự '*' kiểm tra từng phần tử trong mảng
        .isMongoId(),

    body('tagIds', 'Tags phải là một mảng các ID.')
        .optional()
        .isArray(),

    body('tagIds.*', 'ID Tag không hợp lệ.')
        .optional()
        .isMongoId(),

    body('publicationYear', 'Năm xuất bản không hợp lệ.')
        .optional()
        .isInt({ min: 1900, max: new Date().getFullYear() }),
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

    body('categoryIds', 'Danh mục phải là một mảng.')
        .optional()
        .isArray(),
        
    body('categoryIds.*', 'ID Danh mục không hợp lệ.')
        .optional()
        .isMongoId(),
];