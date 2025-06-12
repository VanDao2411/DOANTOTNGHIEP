const nodemailer = require('nodemailer');

const sendEmail = async options => {
    try {
        // --- BẮT ĐẦU DEBUG ---
        console.log('--- ĐANG CHUẨN BỊ GỬI EMAIL ---');
        console.log('Host:', process.env.EMAIL_HOST);
        console.log('Port:', process.env.EMAIL_PORT);
        console.log('Username:', process.env.EMAIL_USERNAME);
        // Không log password ra để đảm bảo an toàn
        console.log('Gửi đến:', options.email);
        console.log('Chủ đề:', options.subject);
        // --- KẾT THÚC DEBUG ---

        // 1. Tạo một "người vận chuyển" (transporter)
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        // 2. Định nghĩa các tùy chọn cho email
        const mailOptions = {
            from: `Thư Viện Online <${process.env.EMAIL_FROM}>`,
            to: options.email,
            subject: options.subject,
            text: options.message,
        };

        // 3. Thực sự gửi email đi và log kết quả
        console.log('Đang thực hiện transporter.sendMail...');
        const info = await transporter.sendMail(mailOptions);

        console.log('Email đã được gửi thành công! Message ID:', info.messageId);
        // Bạn cũng có thể xem preview URL của Ethereal (nếu dùng) hoặc response từ Mailtrap
        console.log('Preview URL:', nodemailer.getTestMessageUrl(info));

    } catch (err) {
        // Bắt lỗi nếu có vấn đề trong quá trình gửi
        console.error('!!! ĐÃ CÓ LỖI BÊN TRONG HÀM sendEmail:', err);
        // Ném lỗi ra ngoài để catchAsync có thể bắt được
        throw new Error('Lỗi khi gửi email, vui lòng thử lại.');
    }
};

module.exports = sendEmail;