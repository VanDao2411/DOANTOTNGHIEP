const mongoose = require('mongoose');
const slugify = require('slugify');

const authorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Tên tác giả là bắt buộc'],
            unique: true,
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true,
        },
        bio: {
            type: String,
            trim: true,
        },
        avatarUrl: {
            type: String,
        },
        website: {
            type: String,
            trim: true,
        },
        birthDate: {
            type: Date,
        },
        deathDate: {
            type: Date,
            default: null,
        },
        nationality: {
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
authorSchema.pre('save', function (next) {
    if (this.isModified('name') || this.isNew) {
        this.slug = slugify(this.name, {
            lower: true,
            strict: true,
            replacement: '-',
        });
    }
    next();
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;