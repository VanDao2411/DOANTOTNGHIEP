// backend/models/Review.js
const mongoose = require('mongoose');
const Document = require('./Document');

const reviewSchema = new mongoose.Schema(
    {
        documentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Document',
            required: [true, 'Đánh giá phải thuộc về một tài liệu.'],
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Đánh giá phải được thực hiện bởi một người dùng.'],
        },
        rating: {
            type: Number,
            required: [true, 'Vui lòng cung cấp điểm đánh giá.'],
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            trim: true,
            maxlength: [1000, 'Bình luận không được vượt quá 1000 ký tự'],
        },
    },
    {
        timestamps: true,
        index: { userId: 1, documentId: 1, unique: true },
        versionKey: false,
    }
);

reviewSchema.statics.calculateAverageRating = async function (documentId) {
    const stats = await this.aggregate([
        {
            $match: { documentId: documentId },
        },
        {
            $group: {
                _id: '$documentId',
                totalRatings: { $sum: 1 },
                averageRating: { $avg: '$rating' },
            },
        },
    ]);

    try {
        if (stats.length > 0) {
            await Document.findByIdAndUpdate(documentId, {
                totalRatings: stats[0].totalRatings,
                averageRating: stats[0].averageRating,
            });
        } else {
            await Document.findByIdAndUpdate(documentId, {
                totalRatings: 0,
                averageRating: 0.0,
            });
        }
    } catch (err) {
        console.error('Lỗi khi cập nhật average rating:', err);
    }
};

reviewSchema.post('save', function () {
    this.constructor.calculateAverageRating(this.documentId);
});

reviewSchema.pre(/^findOneAnd/, async function(next) {
    this.r = await this.clone().findOne();
    next();
});

reviewSchema.post(/^findOneAnd/, async function() {
    if (this.r) {
        await this.r.constructor.calculateAverageRating(this.r.documentId);
    }
});


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;    