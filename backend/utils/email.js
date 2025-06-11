const sgMail = require('@sendgrid/mail');

// Thiết lập API Key cho SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async options => {
    // 1. Định nghĩa email
    const msg = {
        to: options.email, // Người nhận
        from: `Thư Viện Online <${process.env.EMAIL_FROM}>`, // Người gửi đã được xác thực trên SendGrid
        subject: options.subject,
        text: options.message,
    };

    // 2. Gửi email
    try {
        console.log('Đang chuẩn bị gửi email qua SendGrid...');
        await sgMail.send(msg);
        console.log('Email đã được gửi thành công!');
    } catch (error) {
        console.error('Lỗi khi gửi email bằng SendGrid:', error);
        // Lỗi có thể bao gồm chi tiết nếu API key sai hoặc email người gửi chưa được xác thực
        if (error.response) {
            console.error(error.response.body);
        }
        // Ném lỗi để global error handler có thể bắt
        throw new AppError('Không thể gửi email. Vui lòng thử lại sau.', 500);
    }
};

module.exports = sendEmail;