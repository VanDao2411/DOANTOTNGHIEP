const mongoose = require('mongoose');
const Category = require('./Category');
const Author = require('./Author');
const Tag = require('./Tag');

const documentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Tiêu đề tài liệu là bắt buộc'],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        authorId: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Author',
            // required: true,
        },
        publisher: {
            type: String,
            trim: true,
        },
        publicationYear: {
            type: Number,
        },
        categoryIds: [ // Tham chiếu đến nhiều danh mục
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Category',
            },
        ],
        tagIds: [ // Tham chiếu đến nhiều tags
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Tag', 
            },
        ],
        language: {
            type: String,
            trim: true,
            default: 'none',
            enum: ['english', 'french', 'spanish', 'russian','vietnam','none'],        
        },
        fileUrl: {
            type: String,
            required: [true, 'Đường dẫn file tài liệu là bắt buộc'],
        },
        coverImageUrl: {
            type: String,
        },
        fileType: { //'pdf', 'docx', 'epub'
            type: String,
            trim: true,
        },
        fileSize: {
            type: Number,
        },
        uploader: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        downloadCount: {
            type: Number,
            default: 0,
            min: 0,
        },
        viewCount: {
            type: Number,
            default: 0,
            min: 0,
        },
        averageRating: {
            type: Number,
            default: 0.0,
            min: 0,
            max: 5,
            set: (val) => Math.round(val * 10) / 10,
        },
        totalRatings: {
            type: Number,
            default: 0,
            min: 0,
        },
        status: {
            type: String,
            enum: ['pending_approval', 'approved', 'rejected'],
            default: 'pending_approval',
        },
        authorName: { // Trường mới để lưu tên tác giả dạng chuỗi
            type: String,
            trim: true
        },    
        isbn: {
            type: String,
            trim: true,
            // unique: true, // Nếu ISBN là duy nhất và bạn muốn DB enforce
            // sparse: true   // Nếu không phải document nào cũng có ISBN
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        versionKey: false
    }
);

documentSchema.statics.updateDocumentCount = async function(doc, change) {
    try {
        const promises = [];
        const operation = { $inc: { documentCount: change } };
        const queryCondition = change === -1 ? { documentCount: { $gt: 0 } } : {}; // Chỉ giảm nếu count > 0

        // Cập nhật cho categories
        if (doc.categoryIds && doc.categoryIds.length > 0) {
            promises.push(
                Category.updateMany({ _id: { $in: doc.categoryIds }, ...queryCondition }, operation)
            );
        }

        // Cập nhật cho author
        if (doc.authorId) {
            promises.push(
                Author.findOneAndUpdate({ _id: doc.authorId, ...queryCondition }, operation)
            );
        }

        // Cập nhật cho tags
        if (doc.tagIds && doc.tagIds.length > 0) {
            promises.push(
                Tag.updateMany({ _id: { $in: doc.tagIds }, ...queryCondition }, operation)
            );
        }

        await Promise.all(promises);
    } catch (err) {
        console.error('Lỗi khi cập nhật documentCount:', err);
    }
}

// Middleware chạy sau khi một document mới được LƯU
documentSchema.post('save', async function(doc, next) {
    await doc.constructor.updateDocumentCount(doc, 1);
    next();
});

// Middleware chạy TRƯỚC khi một document bị XÓA bằng findByIdAndDelete
// Chúng ta cần lấy document trước khi nó bị xóa để biết các ID liên quan
documentSchema.pre('findOneAndDelete', async function(next) {
    this.docToDelete = await this.clone().findOne();
    next();
});

// Middleware chạy SAU khi document đã bị xóa
documentSchema.post('findOneAndDelete', async function() {
    if (this.docToDelete) {
        await this.constructor.updateDocumentCount(this.docToDelete, -1);
    }
});

documentSchema.index({ title: 'text', description: 'text', authorName: 'text', tags: 'text' });

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;