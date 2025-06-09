const sendEmail = async options => {
    console.log('--- GỬI EMAIL (GIẢ LẬP) ---');
    console.log('Đến:', options.email);
    console.log('Chủ đề:', options.subject);
    console.log('Nội dung:', options.message);
    console.log('URL Reset:', options.resetURL); // Để dễ dàng copy/paste khi test
    console.log('---------------------------');
    // Đây là nơi bạn sẽ tích hợp nodemailer
};

module.exports = sendEmail;