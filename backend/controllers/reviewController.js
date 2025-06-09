const Notification = require('../models/Notification');
const Document = require('../models/Document'); 
const Review = require('../models/Review');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

// @desc    Lấy tất cả reviews (có thể lọc theo document)
// @route   GET /api/v1/reviews hoặc GET /api/v1/documents/:documentId/reviews
// @access  Public
exports.getAllReviews = catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.documentId) filter = { documentId: req.params.documentId };

    const reviews = await Review.find(filter).populate({ path: 'userId', select: 'username avatarUrl' });

    res.status(200).json({
        status: 'success',
        results: reviews.length,
        data: {
            reviews,
        },
    });
});

// @desc    Tạo một review mới
// @route   POST /api/v1/documents/:documentId/reviews
// @access  Private (User)
exports.createReview = catchAsync(async (req, res, next) => {
    // Cho phép nested routes: lấy documentId từ params nếu có, hoặc từ body nếu không
    if (!req.body.documentId) req.body.documentId = req.params.documentId;
    // Lấy userId từ người dùng đang đăng nhập (gắn bởi middleware 'protect')
    if (!req.body.userId) req.body.userId = req.user.id;

    // Kiểm tra xem user đã review document này chưa (do unique index trong model)
    const existingReview = await Review.findOne({
        documentId: req.body.documentId,
        userId: req.body.userId
    });

    if (existingReview) {
        return next(new AppError('Bạn đã đánh giá tài liệu này rồi.', 400));
    }

    const newReview = await Review.create(req.body);

    const reviewedDocument = await Document.findById(newReview.documentId);
    
    if (reviewedDocument && reviewedDocument.uploader.toString() !== newReview.userId.toString()) {
        await Notification.create({
            recipientId: reviewedDocument.uploader, // Người nhận là người upload tài liệu
            senderId: newReview.userId,             // Người gửi là người vừa review
            type: 'new_review',
            message: `Người dùng '${req.user.username}' đã để lại một đánh giá cho tài liệu "${reviewedDocument.title}" của bạn.`,
            link: `/documents/${reviewedDocument._id}`, // Link để frontend điều hướng tới
            documentId: reviewedDocument._id,
        });
    }

    res.status(201).json({
        status: 'success',
        data: {
            review: newReview,
        },
    });
});


// @desc    Lấy một review
// @route   GET /api/v1/reviews/:id
// @access  Public
exports.getReview = catchAsync(async (req, res, next) => {
    const review = await Review.findById(req.params.id);

    if (!review) {
        return next(new AppError('Không tìm thấy review với ID này', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            review,
        },
    });
});


// @desc    Cập nhật một review
// @route   PATCH /api/v1/reviews/:id
// @access  Private (Chủ sở hữu review hoặc Admin)
exports.updateReview = catchAsync(async (req, res, next) => {
    let review = await Review.findById(req.params.id);

    if (!review) {
        return next(new AppError('Không tìm thấy review với ID này', 404));
    }

    // Chỉ chủ sở hữu review hoặc admin mới được cập nhật
    if (review.userId.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new AppError('Bạn không có quyền cập nhật review này.', 403));
    }

    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: 'success',
        data: {
            review
        }
    });
});

// @desc    Xóa một review
// @route   DELETE /api/v1/reviews/:id
// @access  Private (Chủ sở hữu review hoặc Admin)
exports.deleteReview = catchAsync(async (req, res, next) => {
    let review = await Review.findById(req.params.id);

    if (!review) {
        return next(new AppError('Không tìm thấy review với ID này', 404));
    }
    
    // Chỉ chủ sở hữu review hoặc admin mới được xóa
    if (review.userId.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new AppError('Bạn không có quyền xóa review này.', 403));
    }

    await Review.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: 'success',
        data: null,
    });
});