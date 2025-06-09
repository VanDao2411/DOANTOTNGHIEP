const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Tên danh mục là bắt buộc'],
            unique: true,
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
        },
        description: {
            type: String,
            trim: true,
        },
        coverImageUrl: {
            type: String,
        },
        parentCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            default: null,
        },
        documentCount: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

categorySchema.pre('save', function (next) {
    // Chỉ tạo slug nếu 'name' được thay đổi hoặc là document mới
    if (this.isModified('name') || this.isNew) {
        this.slug = slugify(this.name, {
            lower: true,    
            strict: true,  
            replacement: '-', 
            remove: /[*+~.()'"!:@]/g,
        });
    }
    next();
});

// Đảm bảo khi query có populate parentCategory, nó sẽ trả về toàn bộ object
// Hoặc khi query lấy children, nó cũng trả về object
categorySchema.set('toObject', { virtuals: true });
categorySchema.set('toJSON', { virtuals: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;