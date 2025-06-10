const dotenv = require('dotenv');
dotenv.config()

const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./middlewares/errorMiddleware');
const path = require('path');

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

// --- Application Routes ---
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const documentRoutes = require('./routes/documentRoutes'); 
const categoryRoutes = require('./routes/categoryRoutes'); 
const authorRoutes = require('./routes/authorRoutes');     
const tagRoutes = require('./routes/tagRoutes');           
const reviewRoutes = require('./routes/reviewRoutes');       
const savedDocumentRoutes = require('./routes/savedDocumentRoutes'); 
const notificationRoutes = require('./routes/notificationRoutes'); 

const app = express();
app.set('trust proxy', 1); 

connectDB();

app.use(helmet());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Giới hạn số lượng request từ một IP
const limiter = rateLimit({
    max: 100, // Tối đa 100 request
    windowMs: 60 * 60 * 1000, // Trong 1 giờ
    message: 'Quá nhiều request từ IP này, vui lòng thử lại sau 1 giờ!'
});

app.use('/api', limiter); // Áp dụng cho tất cả các route bắt đầu bằng /api

app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(hpp({
    whitelist: [
        'publicationYear',
        'averageRating',
        'language',
        'fileType'
    ]
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/documents', documentRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/authors', authorRoutes);
app.use('/api/v1/tags', tagRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/saved-documents', savedDocumentRoutes);
app.use('/api/v1/notifications', notificationRoutes);

app.use((req, res, next) => {
    // new AppError() sẽ được bắt bởi globalErrorHandler
    next(new AppError(`Không thể tìm thấy ${req.originalUrl} trên server này!`, 404));
});

// Global Error Handling Middleware
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server đang chạy ở chế độ ${process.env.NODE_ENV} trên cổng ${PORT}`);
});

process.on('unhandledRejection', (err, promise) => {
    console.error(`Lỗi Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
});
