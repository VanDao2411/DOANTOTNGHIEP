const { validationResult } = require('express-validator');
const AppError = require('../utils/AppError');

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg).join('. ');
        return next(new AppError(`Dữ liệu không hợp lệ: ${errorMessages}`, 400));
    }
    next();
};