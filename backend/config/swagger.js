const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Thư Viện Online API',
            version: '1.0.0',
            description: 'Tài liệu API cho dự án Thư Viện Online - Đồ án tốt nghiệp. API này quản lý người dùng, tài liệu, danh mục, tác giả, và các tài nguyên khác.',
            contact: {
                name: 'Nguyễn Đồng Hải Đăng',
                email: 'haidang12122003@gmail.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:5000/api/v1', // URL của server development
                description: 'Development Server'
            },
            {
                url: 'https://thuvienonlineapi.onrender.com/api/v1', // <<<--- THAY BẰNG URL PRODUCTION CỦA BẠN
                description: 'Production Server'
            }
        ],
        components: {
            // Định nghĩa các schema để tái sử dụng
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', description: 'ID của người dùng', example: '68423906551028d6d615b10e' },
                        username: { type: 'string', description: 'Tên đăng nhập', example: 'testuser' },
                        email: { type: 'string', format: 'email', description: 'Email của người dùng', example: 'test@example.com' },
                        fullName: { type: 'string', description: 'Tên đầy đủ', example: 'Test User' },
                        role: { type: 'string', enum: ['user', 'admin', 'librarian'], description: 'Vai trò người dùng', example: 'user' },
                        avatarUrl: { type: 'string', format: 'uri', description: 'URL ảnh đại diện' },
                    }
                },
                Category: {
                    type: 'object',
                    properties: {
                         _id: { type: 'string' },
                         name: { type: 'string' },
                         slug: { type: 'string' },
                    }
                },
                Author: {
                    type: 'object',
                    properties: {
                         _id: { type: 'string' },
                         name: { type: 'string' },
                         slug: { type: 'string' },
                         bio: { type: 'string' },
                    }
                },
                Tag: {
                    type: 'object',
                    properties: {
                         _id: { type: 'string' },
                         name: { type: 'string' },
                         slug: { type: 'string' },
                    }
                },
                Document: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        title: { type: 'string' },
                        description: { type: 'string' },
                        authorName: { type: 'string' },
                        publicationYear: { type: 'integer' },
                        averageRating: { type: 'number', format: 'float' },
                        totalRatings: { type: 'integer' },
                        coverImageUrl: { type: 'string', format: 'uri' },
                        fileUrl: { type: 'string', format: 'uri' },
                        uploader: { $ref: '#/components/schemas/User' },
                        authorId: { $ref: '#/components/schemas/Author' },
                        categoryIds: { type: 'array', items: { $ref: '#/components/schemas/Category' } },
                        tagIds: { type: 'array', items: { $ref: '#/components/schemas/Tag' } },
                    }
                },
                Review: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        rating: { type: 'integer', min: 1, max: 5 },
                        comment: { type: 'string' },
                        userId: { $ref: '#/components/schemas/User' },
                        documentId: { type: 'string' }
                    }
                },
                SavedDocument: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        savedAt: { type: 'string', format: 'date-time' },
                        documentId: { $ref: '#/components/schemas/Document' }
                    }
                },
                Notification: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        message: { type: 'string' },
                        type: { type: 'string' },
                        link: { type: 'string' },
                        isRead: { type: 'boolean' },
                        createdAt: { type: 'string', format: 'date-time' },
                        senderId: { $ref: '#/components/schemas/User' }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        status: { type: 'string', example: 'fail' },
                        message: { type: 'string', example: 'Thông báo lỗi chi tiết.' }
                    }
                }
            },
            // Định nghĩa cơ chế xác thực
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        // Yêu cầu xác thực cho hầu hết các API
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    // Đường dẫn đến các file chứa định nghĩa API (các file routes)
    apis: ['./routes/.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;