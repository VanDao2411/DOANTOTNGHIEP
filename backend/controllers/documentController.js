const Document = require('../models/Document');
const Author = require('../models/Author');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const Notification = require('../models/Notification');
const Tag = require('../models/Tag');
const Category = require('../models/Category'); 

exports.getAllDocuments = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Document.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    
    features.query = features.query
    .populate({
        path: 'authorId',
        select: 'name' // Khi hiển thị danh sách, thường chỉ cần tên tác giả
    }).populate({
        path: 'categoryIds',
        select: 'name' // Chỉ cần tên danh mục
    });

    const documents = await features.query;

    res.status(200).json({
        status: 'success',
        results: documents.length,
        data: {
            documents,
        },
    });
});

exports.getDocument = catchAsync(async (req, res, next) => {
    const document = await Document.findById(req.params.id)
        .populate({ path: 'uploader', select: 'username fullName avatarUrl' })
        .populate({ path: 'authorId', select: 'name slug bio' })
        .populate({ path: 'categoryIds', select: 'name slug' })
        .populate({ path: 'tagIds', select: 'name slug' });

    if (!document) {
        return next(new AppError('Không tìm thấy tài liệu với ID này', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            document,
        },
    });
});

exports.createDocument = catchAsync(async (req, res, next) => {
    // 1. Lấy dữ liệu từ req.body (dữ liệu text)
    const documentData = { ...req.body };
    
    // 2. Gán thông tin người upload
    documentData.uploader = req.user.id;

    if (typeof documentData.categoryIds === 'string') {
        documentData.categoryIds = documentData.categoryIds.split(',').map(item => item.trim());
    }
    if (typeof documentData.tagIds === 'string') {
        documentData.tagIds = documentData.tagIds.split(',').map(item => item.trim());
    }
    // Chuyển đổi năm xuất bản từ chuỗi thành số
    if (documentData.publicationYear) {
        documentData.publicationYear = parseInt(documentData.publicationYear, 10);
    }

    // 3. Xử lý thông tin file upload từ req.files (nếu có)
    if (req.files) {
        if (req.files.coverImage) {
            // Lưu đường dẫn file ảnh bìa vào database
            // Ví dụ: 'uploads/images/coverImage-userId-timestamp.jpeg'
            documentData.coverImageUrl = `uploads/images/${req.files.coverImage[0].filename}`;
        }
        if (req.files.documentFile) {
            // Lưu đường dẫn file tài liệu vào database
            documentData.fileUrl = `uploads/documents/${req.files.documentFile[0].filename}`;
            documentData.fileType = req.files.documentFile[0].mimetype;
            documentData.fileSize = req.files.documentFile[0].size;
        }
    }
    
    // 4. Logic denormalize authorName
    if (documentData.authorId) {
        const author = await Author.findById(documentData.authorId);
        if (author) {
            documentData.authorName = author.name;
        }
    }

    // 5. Tạo document mới
    const newDocument = await Document.create(documentData);

    res.status(201).json({
        status: 'success',
        data: {
            document: newDocument,
        },
    });
});

const updateAssociatedCounts = async (oldDoc, newDoc) => {
    try {
        const oldAuthorId = oldDoc.authorId?.toString();
        const newAuthorId = newDoc.authorId?.toString();
        const oldCategoryIds = (oldDoc.categoryIds || []).map(id => id.toString());
        const newCategoryIds = (newDoc.categoryIds || []).map(id => id.toString());
        const oldTagIds = (oldDoc.tagIds || []).map(id => id.toString());
        const newTagIds = (newDoc.tagIds || []).map(id => id.toString());

        // Xử lý Tác giả
        if (oldAuthorId !== newAuthorId) {
            if (oldAuthorId) await Author.updateOne({ _id: oldAuthorId, documentCount: { $gt: 0 } }, { $inc: { documentCount: -1 } });
            if (newAuthorId) await Author.updateOne({ _id: newAuthorId }, { $inc: { documentCount: 1 } });
        }

        // Xử lý Danh mục
        const addedCategories = newCategoryIds.filter(id => !oldCategoryIds.includes(id));
        const removedCategories = oldCategoryIds.filter(id => !newCategoryIds.includes(id));
        if (addedCategories.length > 0) await Category.updateMany({ _id: { $in: addedCategories } }, { $inc: { documentCount: 1 } });
        if (removedCategories.length > 0) await Category.updateMany({ _id: { $in: removedCategories }, documentCount: { $gt: 0 } }, { $inc: { documentCount: -1 } });

        // Xử lý Tags
        const addedTags = newTagIds.filter(id => !oldTagIds.includes(id));
        const removedTags = oldTagIds.filter(id => !oldTagIds.includes(id));
        if (addedTags.length > 0) await Tag.updateMany({ _id: { $in: addedTags } }, { $inc: { documentCount: 1 } });
        if (removedTags.length > 0) await Tag.updateMany({ _id: { $in: removedTags }, documentCount: { $gt: 0 } }, { $inc: { documentCount: -1 } });

    } catch (err) {
        console.error('Lỗi nghiêm trọng khi cập nhật documentCount:', err);
        // Trong một ứng dụng thực tế, bạn có thể muốn ghi log lỗi này vào một hệ thống giám sát
    }
};

exports.updateDocument = catchAsync(async (req, res, next) => {
    const originalDoc = await Document.findById(req.params.id);
    if (!originalDoc) {
        return next(new AppError('Không tìm thấy tài liệu với ID này', 404));
    }

    const documentData = { ...req.body };
    if ('authorId' in req.body) {
        const author = await Author.findById(req.body.authorId);
        documentData.authorName = author ? author.name : null;
    }
    
    const updatedDoc = await Document.findByIdAndUpdate(req.params.id, documentData, {
        new: true,
        runValidators: true,
    });

    // Gọi hàm helper để cập nhật các count
    await updateAssociatedCounts(originalDoc, updatedDoc);

    // Logic tạo notification (giữ nguyên)
    if (req.body.status && originalDoc.status === 'pending_approval') {
        let notificationMessage = '';
        let notificationType = '';
        if (req.body.status === 'approved') {
            notificationType = 'document_approved';
            notificationMessage = `Tài liệu "${updatedDoc.title}" của bạn đã được duyệt và hiển thị trên trang chủ.`;
        } else if (req.body.status === 'rejected') {
            notificationType = 'document_rejected';
            notificationMessage = `Rất tiếc, tài liệu "${updatedDoc.title}" của bạn đã bị từ chối.`;
        }
        if (notificationType && updatedDoc.uploader.toString() !== req.user.id) {
            await Notification.create({
                recipientId: updatedDoc.uploader,
                senderId: req.user.id,
                type: notificationType,
                message: notificationMessage,
                link: `/documents/${updatedDoc._id}`,
                documentId: updatedDoc._id,
            });
        }
    }

    res.status(200).json({
        status: 'success',
        data: {
            document: updatedDoc,
        },
    });
});


exports.deleteDocument = catchAsync(async (req, res, next) => {
    const document = await Document.findByIdAndDelete(req.params.id);

    if (!document) {
        return next(new AppError('Không tìm thấy tài liệu với ID này', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null,
    });
});