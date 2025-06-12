const { body } = require('express-validator');

// Quy tắc cho việc Đăng ký
exports.signupRules = [
    body('username', 'Tên đăng nhập là bắt buộc và phải có ít nhất 3 ký tự.')
        .trim()
        .isLength({ min: 3 }),

    body('email', 'Vui lòng nhập một địa chỉ email hợp lệ.')
        .isEmail()
        .normalizeEmail(),

    body('password', 'Mật khẩu phải có ít nhất 6 ký tự.')
        .isLength({ min: 6 }),

    body('passwordConfirm', 'Xác nhận mật khẩu không được để trống.')
        .notEmpty(),

    body('passwordConfirm').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Xác nhận mật khẩu không khớp với mật khẩu mới.');
        }
        return true;
    })
];

// Quy tắc cho việc Đăng nhập
exports.loginRules = [
    body('email', 'Vui lòng nhập một địa chỉ email hợp lệ.')
        .isEmail()
        .normalizeEmail(),

    body('password', 'Mật khẩu không được để trống.')
        .notEmpty()
];

// Quy tắc cho việc Cập nhật mật khẩu
exports.updatePasswordRules = [
    body('passwordCurrent', 'Vui lòng nhập mật khẩu hiện tại của bạn.')
        .notEmpty(),
    
    body('password', 'Mật khẩu mới phải có ít nhất 6 ký tự.')
        .isLength({ min: 6 }),

    body('passwordConfirm', 'Xác nhận mật khẩu không được để trống.')
        .notEmpty(),
    
    body('passwordConfirm').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Xác nhận mật khẩu không khớp với mật khẩu mới.');
        }
        return true;
    })
];