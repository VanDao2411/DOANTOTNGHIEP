const mongoose = require('mongoose');
const slugify = require('slugify');

const tagSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Tên tag là bắt buộc'],
            unique: true,
            trim: true,
            lowercase: true,
        },
        slug: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true,
        },
        description: {
            type: String,
            trim: true,
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

// Middleware: Tự động tạo slug từ 'name' trước khi lưu
tagSchema.pre('save', function (next) {
    if (this.isModified('name') || this.isNew) {
        this.slug = slugify(this.name, { // 'name' của tag đã được lowercase ở schema
            lower: true, // Vẫn nên có để đảm bảo, hoặc nếu name không có lowercase
            strict: true,
            replacement: '-',
        });
    }
    next();
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;