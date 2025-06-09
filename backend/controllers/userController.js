const User = require('../models/User');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

/**
 * Hàm tiện ích để lọc các trường được phép cập nhật
 * @param {object} obj - Đối tượng gốc (ví dụ: req.body)
 * @param  {...string} allowedFields - Các trường được phép giữ lại
 * @returns {object} - Một đối tượng mới chỉ chứa các trường được phép
 */
const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) {
            newObj[el] = obj[el];
        }
    });
    return newObj;
};

// --- CÁC HÀM CHO NGƯỜI DÙNG TỰ QUẢN LÝ ---

// @desc    Người dùng tự cập nhật thông tin (không phải mật khẩu)
// @route   PATCH /api/v1/users/updateMe
// @access  Private
exports.updateMe = catchAsync(async (req, res, next) => {
    // 1. Báo lỗi nếu người dùng cố gắng cập nhật mật khẩu ở route này
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError('Route này không dùng để cập nhật mật khẩu. Vui lòng sử dụng /updateMyPassword.', 400));
    }

    // 2. Lọc ra các trường không được phép cập nhật (như 'role')
    // Người dùng chỉ được phép cập nhật fullName, bio, avatarUrl
    const filteredBody = filterObj(req.body, 'fullName', 'bio', 'avatarUrl');

    // 3. Cập nhật thông tin người dùng
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    });
});

// @desc    Người dùng tự "xóa" (vô hiệu hóa) tài khoản
// @route   DELETE /api/v1/users/deleteMe
// @access  Private
exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
        status: 'success',
        data: null
    });
});

// --- CÁC HÀM DÀNH CHO ADMIN ---

// @desc    Lấy tất cả người dùng (Admin)
// @route   GET /api/v1/users
// @access  Private (Admin)
exports.getAllUsers = catchAsync(async (req, res, next) => {
    // .find().select('+active') để lấy cả các user đã bị vô hiệu hóa nếu admin muốn
    const features = new APIFeatures(User.find().select('+active'), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    
    const users = await features.query;
    
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    });
});

// @desc    Lấy một người dùng theo ID (Admin)
// @route   GET /api/v1/users/:id
// @access  Private (Admin)
exports.getUser = catchAsync(async (req, res, next) => {
    // Admin có thể xem cả user không hoạt động
    const user = await User.findById(req.params.id).select('+active');
    if (!user) {
        return next(new AppError('Không tìm thấy người dùng với ID này', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});


// @desc    Cập nhật người dùng bởi Admin
// @route   PATCH /api/v1/users/:id
// @access  Private (Admin)
exports.updateUser = catchAsync(async (req, res, next) => {
    // Admin có thể cập nhật mọi thứ, bao gồm cả 'role' và 'active'
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!user) {
        return next(new AppError('Không tìm thấy người dùng với ID này', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

// @desc    Xóa người dùng bởi Admin (Hard Delete)
// @route   DELETE /api/v1/users/:id
// @access  Private (Admin)
exports.deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return next(new AppError('Không tìm thấy người dùng với ID này', 404));
    }
    // TODO: Xử lý các nội dung của người dùng này (ví dụ: tài liệu, review) nếu cần
    res.status(204).json({
        status: 'success',
        data: null
    });
});