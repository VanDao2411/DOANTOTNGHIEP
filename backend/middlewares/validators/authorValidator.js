const { body } = require('express-validator');

exports.createAuthorRules = [
    body('name', 'Tên tác giả là bắt buộc và không được để trống.')
        .isString()
        .notEmpty({ ignore_whitespace: true })
        .trim(),
    
    body('bio', 'Mô tả phải là một chuỗi ký tự.')
        .optional()
        .isString()
        .trim()
];

exports.updateAuthorRules = [
    body('name', 'Tên tác giả là bắt buộc và không được để trống.')
        .optional()
        .isString()
        .notEmpty({ ignore_whitespace: true })
        .trim(),

    body('bio', 'Mô tả phải là một chuỗi ký tự.')
        .optional()
        .isString()
        .trim()
];