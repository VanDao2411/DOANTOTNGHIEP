const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const crypto = require('crypto');
const sendEmail = require('../utils/email');

const signToken = (id) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    const { username, email, password, passwordConfirm, fullName } = req.body;
    const userData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        fullName: req.body.fullName,
        role: 'user',
    };

    console.log('Dữ liệu gửi để tạo User:', userData);
    console.log('Thông tin từ req.body:', req.body);

    const newUser = await User.create(userData);

    const token = signToken(newUser._id);

    newUser.password = undefined;

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser,
        },
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email }).select('+password');

    if (!user || !(await user.comparePassword(password, user.password))) {
        return next(new AppError('Email hoặc mật khẩu không chính xác.', 401)); // 401 Unauthorized
    }

    const token = signToken(user._id);

    res.status(200).json({
        status: 'success',
        token,
        data: {
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
                avatarUrl: user.avatarUrl
            }
        }
    });
});

exports.getMe = catchAsync(async (req, res, next) => {
    if (!req.user) {
        return next(new AppError('Không tìm thấy thông tin người dùng. Có thể bạn chưa đăng nhập hoặc token không hợp lệ.', 401));
    }

    const user = req.user; 

    res.status(200).json({
        status: 'success',
        data: {
            user: { 
                _id: user._id,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
                avatarUrl: user.avatarUrl
            }
        }
    });
});

exports.updateMyPassword = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    const { passwordCurrent, password } = req.body;

    if (!(await user.comparePassword(passwordCurrent, user.password))) {
        return next(new AppError('Mật khẩu hiện tại không chính xác.', 401)); // 401 Unauthorized
    }

    user.password = password;

    await user.save();

    const token = signToken(user._id);

    res.status(200).json({
        status: 'success',
        token,
        message: 'Cập nhật mật khẩu thành công!'
    });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        console.log('Forgot Password: Không tìm thấy user với email', req.body.email);
        return res.status(200).json({
            status: 'success',
            message: 'Nếu email tồn tại trong hệ thống, bạn sẽ nhận được một link reset mật khẩu.',
        });
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/auth/resetPassword/${resetToken}`;
    const message = `Bạn đã quên mật khẩu? Hãy truy cập đường dẫn sau để đặt lại mật khẩu của bạn: ${resetURL}.\nĐường dẫn này sẽ hết hạn sau 10 phút. Nếu bạn không yêu cầu điều này, vui lòng bỏ qua email này.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Yêu cầu reset mật khẩu (Hiệu lực trong 10 phút)',
            message,
            resetURL,
        });

        res.status(200).json({
            status: 'success',
            message: 'Token reset mật khẩu đã được gửi tới email!',
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(
            new AppError('Đã có lỗi xảy ra khi gửi email. Vui lòng thử lại sau.', 500)
        );
    }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });

    // 3. Nếu token không hợp lệ hoặc đã hết hạn
    if (!user) {
        return next(new AppError('Token không hợp lệ hoặc đã hết hạn.', 400));
    }

    // 4. Đặt mật khẩu mới
    if (!req.body.password || req.body.password !== req.body.passwordConfirm) {
        return next(new AppError('Vui lòng cung cấp mật khẩu mới và xác nhận mật khẩu phải trùng khớp.', 400));
    }

    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    const token = signToken(user._id);

    res.status(200).json({
        status: 'success',
        token,
        message: 'Reset mật khẩu thành công!'
    });
});

exports.logout = (req, res, next) => {
    console.log('Auth Controller: logout');
    res.status(200).json({ status: 'success', message: 'Đăng xuất thành công' });
};