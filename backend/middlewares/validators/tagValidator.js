const { body } = require('express-validator');

exports.createTagRules = [
    body('name', 'Thẻ danh mục là bắt buộc và không được để trống.')
        .isString()
        .notEmpty({ ignore_whitespace: true })
        .trim(),
    
    body('description', 'Mô tả phải là một chuỗi ký tự.')
        .optional()
        .isString()
        .trim()
];

exports.updateTagRules = [
    body('name', 'Thẻ danh mục là bắt buộc và không được để trống.')
        .optional()
        .isString()
        .notEmpty({ ignore_whitespace: true })
        .trim(),

    body('description', 'Mô tả phải là một chuỗi ký tự.')
        .optional()
        .isString()
        .trim()
];