const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(
            new AppError('Bạn chưa đăng nhập! Vui lòng đăng nhập để truy cập.', 401) // 401 Unauthorized
        );
    }

    let decoded;
    try {
        decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return next(new AppError('Token không hợp lệ. Vui lòng đăng nhập lại!', 401));
        }
        if (err.name === 'TokenExpiredError') {
            return next(new AppError('Token đã hết hạn. Vui lòng đăng nhập lại!', 401));
        }
        return next(new AppError('Có lỗi xảy ra với token của bạn. Vui lòng đăng nhập lại.', 401));
    }

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(
            new AppError(
                'Người dùng sở hữu token này không còn tồn tại.',
                401
            )
        );
    }

    // 4. (Tùy chọn nâng cao) Kiểm tra xem người dùng có đổi mật khẩu sau khi token được cấp không
    //    Điều này yêu cầu bạn phải có trường 'passwordChangedAt' trong User model.
    //    Nếu bạn có trường đó:
    //    if (currentUser.changedPasswordAfter(decoded.iat)) { // decoded.iat là "issued at time"
    //        return next(
    //            new AppError('Mật khẩu người dùng đã được thay đổi gần đây. Vui lòng đăng nhập lại.', 401)
    //        );
    //    }
    //    Phương thức changedPasswordAfter(JWTTimestamp) cần được định nghĩa trong User model:
    //    userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    //        if (this.passwordChangedAt) {
    //            const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    //            return JWTTimestamp < changedTimestamp;
    //        }
    //        return false; // Mật khẩu chưa bao giờ thay đổi
    //    };

    req.user = currentUser;
    next();
});

// Placeholder cho middleware giới hạn quyền truy cập theo vai trò (sẽ hoàn thiện sau)
exports.restrictTo = (...roles) => {
    // return (req, res, next) => {
    //     if (!roles.includes(req.user.role)) {
    //         // Nếu không, trả về lỗi 403 Forbidden  
    //         return next(
    //             new AppError('Bạn không có quyền thực hiện hành động này.', 403)
    //         );
    //     }

    //     next();
    // };
    return (req, res, next) => {
        console.log('--- BÊN TRONG restrictTo MIDDLEWARE ---');
        console.log('Các vai trò được phép (roles):', roles);
        console.log('Đối tượng req.user:', req.user);

        // Kiểm tra xem req.user có tồn tại không và vai trò của user có trong danh sách được phép không
        if (req.user && roles.includes(req.user.role)) {
            // Nếu có quyền, cho phép đi tiếp
            console.log(`QUYỀN HỢP LỆ: User có vai trò '${req.user.role}'. Cho phép đi tiếp.`);
            next();
        } else {
            // Nếu không có quyền
            console.log(`TRUY CẬP BỊ TỪ CHỐI: User có vai trò '${req.user ? req.user.role : 'KHÔNG XÁC ĐỊNH'}' không nằm trong danh sách được phép.`);
            return next(
                new AppError('Bạn không có quyền thực hiện hành động này.', 403)
            );
        }
    };
};