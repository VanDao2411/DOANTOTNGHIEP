const Notification = require('../models/Notification');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

// @desc    Lấy tất cả thông báo của người dùng hiện tại
// @route   GET /api/v1/notifications
// @access  Private
exports.getMyNotifications = catchAsync(async (req, res, next) => {
    // Chỉ tìm các thông báo mà recipientId là ID của người dùng đang đăng nhập
    const filter = { recipientId: req.user.id };

    const features = new APIFeatures(Notification.find(filter), req.query)
        .sort() // Mặc định sẽ sort theo -createdAt (mới nhất trước)
        .paginate();

    const notifications = await features.query.populate({
        path: 'senderId',
        select: 'username fullName avatarUrl'
    });

    res.status(200).json({
        status: 'success',
        results: notifications.length,
        data: {
            notifications,
        },
    });
});


// @desc    Đánh dấu một thông báo đã đọc
// @route   PATCH /api/v1/notifications/:id/read
// @access  Private
exports.markNotificationAsRead = catchAsync(async (req, res, next) => {
    // Tìm thông báo dựa trên ID VÀ đảm bảo nó thuộc về người dùng đang đăng nhập
    const notification = await Notification.findOneAndUpdate(
        { _id: req.params.id, recipientId: req.user.id },
        { isRead: true },
        { new: true, runValidators: true }
    );

    if (!notification) {
        return next(new AppError('Không tìm thấy thông báo hoặc bạn không có quyền.', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            notification,
        },
    });
});

// @desc    Đánh dấu tất cả thông báo đã đọc
// @route   PATCH /api/v1/notifications/read-all
// @access  Private
exports.markAllNotificationsAsRead = catchAsync(async (req, res, next) => {
    await Notification.updateMany(
        { recipientId: req.user.id, isRead: false },
        { isRead: true }
    );

    res.status(200).json({
        status: 'success',
        message: 'Tất cả thông báo đã được đánh dấu là đã đọc.'
    });
});