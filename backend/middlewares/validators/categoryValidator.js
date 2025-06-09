const { body } = require('express-validator');

exports.createCategoryRules = [
    body('name', 'Tên danh mục là bắt buộc và không được để trống.')
        .isString()
        .notEmpty({ ignore_whitespace: true })
        .trim(),
    
    body('description', 'Mô tả phải là một chuỗi ký tự.')
        .optional()
        .isString()
        .trim()
];

exports.updateCategoryRules = [
    body('name', 'Tên danh mục là bắt buộc và không được để trống.')
        .optional()
        .isString()
        .notEmpty({ ignore_whitespace: true })
        .trim(),

    body('description', 'Mô tả phải là một chuỗi ký tự.')
        .optional()
        .isString()
        .trim()
];