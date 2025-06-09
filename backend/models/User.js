const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Vui lòng nhập tên đăng nhập của bạn'],
            unique: true,
            trim: true,
            minlength: [3, 'Tên đăng nhập phải có ít nhất 3 ký tự'],
        },
        email: {
            type: String,
            required: [true, 'Vui lòng nhập email của bạn'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                'Vui lòng nhập một địa chỉ email hợp lệ',
            ],
        },
        password: {
            type: String,
            required: [true, 'Vui lòng nhập mật khẩu'],
            minlength: [6, 'Mật khẩu phải có ít nhất 6 ký tự'],
            select: false, // Mặc định không trả về trường password khi query
        },
        fullName: {
            type: String,
            trim: true,
        },
        avatarUrl: {
            type: String,
            default: 'default_avatar_url_placeholder',
        },
        bio: {
            type: String,
            maxlength: [500, 'Tiểu sử không được vượt quá 500 ký tự'],
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
        active: {
        type: Boolean,
        default: true,
        select: false
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// Middleware: Hash mật khẩu trước khi lưu (chỉ khi mật khẩu được thay đổi)
userSchema.pre('save', async function (next) {
    // Chỉ chạy hàm này nếu password thực sự được thay đổi (hoặc là document mới)
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    if (!this.isNew) {
        this.passwordChangedAt = Date.now() - 1000;
    }

    next();
});

userSchema.pre(/^find/, function(next) {
    this.find({ active: { $ne: false } });
    next();
});

// Instance method: So sánh mật khẩu đã nhập với mật khẩu đã hash trong DB
userSchema.methods.comparePassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = require('crypto').randomBytes(32).toString('hex');

    // Hash token này và lưu vào DB
    this.passwordResetToken = require('crypto')
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // Đặt thời gian hết hạn: 10 phút
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    // Trả về token chưa hash để gửi cho người dùng
    return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;