const SavedDocument = require('../models/SavedDocument');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getMySavedDocuments = catchAsync(async (req, res, next) => {
    const savedDocuments = await SavedDocument.find({ userId: req.user.id })
        .populate({
            path: 'documentId', // "Populate" thông tin chi tiết của tài liệu
            select: 'title authorName coverImageUrl slug averageRating' // Chỉ lấy các trường cần thiết để hiển thị danh sách
        });
    
    res.status(200).json({
        status: 'success',
        results: savedDocuments.length,
        data: {
            savedDocuments,
        },
    });
});

exports.saveDocument = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const { documentId } = req.body;

    const savedDoc = await SavedDocument.create({ userId, documentId });
    res.status(201).json({
        status: 'success',
        data: {
            savedDocument: savedDoc,
        },
    });
});

exports.unsaveDocument = catchAsync(async (req, res, next) => {
    // Tìm và xóa bản ghi dựa trên ID tài liệu VÀ ID của người dùng hiện tại
    const savedDoc = await SavedDocument.findOneAndDelete({
        documentId: req.params.documentId,
        userId: req.user.id
    });

    if (!savedDoc) {
        return next(new AppError('Không tìm thấy tài liệu đã lưu này trong danh sách của bạn.', 404));
    }

    res.status(204).json({ // 204 No Content
        status: 'success',
        data: null,
    });
});