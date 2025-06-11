const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const reviewRouter = require('./reviewRoutes');
const { protect, restrictTo } = require('../middlewares/authMiddleware');
const { uploadCoverImage } = require('../middlewares/uploadMiddleware');
const { validate } = require('../middlewares/validationMiddleware');
const { createDocumentRules, updateDocumentRules } = require('../middlewares/validators/documentValidator');

/**
 * @openapi
 * tags:
 *   - name: Documents
 *     description: API cho việc quản lý tài liệu, sách
 */

router.use('/:documentId/reviews', reviewRouter);

/**
 * @openapi
 * /documents:
 *   get:
 *     summary: Lấy danh sách tất cả tài liệu
 *     description: Hỗ trợ lọc, sắp xếp, chọn lọc trường và phân trang.
 *     tags: [Documents]
 *     parameters:
 *         in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sắp xếp theo trường. Ví dụ `sort=-createdAt` để lấy mới nhất.
 *         in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Số trang hiện tại.
 *         in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Số lượng kết quả trên mỗi trang.
 *         in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Các trường muốn lấy về, cách nhau bởi dấu phẩy. Ví dụ `title,authorName`.
 *         in: query
 *         name: publicationYear
 *         schema:
 *           type: integer
 *         description: Lọc theo năm xuất bản.
 *     responses:
 *       '200':
 *         description: Một danh sách các tài liệu.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 results:
 *                   type: integer
 *                 data:
 *                   type: object
 *                   properties:
 *                     documents:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Document'
 *   post:
 *     summary: Tạo một tài liệu mới (có upload file)
 *     tags: [Documents]
 *     security:
 *        bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, authorId, categoryIds, fileUrl]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               authorId:
 *                 type: string
 *                 description: ID của tác giả
 *               categoryIds:
 *                 type: string
 *                 description: Các ID danh mục, cách nhau bởi dấu phẩy
 *               tagIds:
 *                 type: string
 *                 description: Các ID tag, cách nhau bởi dấu phẩy
 *               publicationYear:
 *                 type: integer
 *                 example: 2024
 *               language:
 *                 type: string
 *                 enum: ['english', 'none']
 *                 default: 'none'
 *               coverImage:
 *                 type: string
 *                 format: binary
 *                 description: File ảnh bìa
 *               documentFile:
 *                 type: string
 *                 format: binary
 *                 description: File tài liệu (pdf, doc, docx)
 *     responses:
 *       '201':
 *         description: Tạo tài liệu thành công.
 *       '400':
 *         description: Dữ liệu đầu vào không hợp lệ.
 *       '401':
 *         description: Unauthorized - Yêu cầu token xác thực.
 */
router
    .route('/')
    .get(documentController.getAllDocuments)
    .post(protect, uploadCoverImage, createDocumentRules, validate, documentController.createDocument); 


/**
 * @openapi
 * /documents/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết của một tài liệu
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của tài liệu
 *     responses:
 *       '200':
 *         description: Thành công, trả về chi tiết tài liệu với các thông tin đã được populate.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       '404':
 *         description: Không tìm thấy tài liệu.
 *   patch:
 *     summary: Cập nhật một tài liệu
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Các trường cần cập nhật. Có thể có file hoặc không.
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               authorId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Cập nhật thành công.
 *       '404':
 *         description: Không tìm thấy tài liệu.
 *   delete:
 *     summary: Xóa một tài liệu (Admin/Librarian)
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Xóa thành công, không có nội dung trả về.
 *       '403':
 *         description: Forbidden - Không có quyền thực hiện.
 */
router
    .route('/:id')
    .get(documentController.getDocument)
    .patch(protect, uploadCoverImage, createDocumentRules, validate, documentController.updateDocument)
    .delete(protect, restrictTo('admin'), documentController.deleteDocument);

// Ví dụ route tìm kiếm
// router.get('/search/results', documentController.searchDocuments);

router.get('/test-populate/:id', async (req, res) => {
    try {
        console.log(`--- Đang test populate cho document ID: ${req.params.id} ---`);

        const doc = await require('../models/Document').findById(req.params.id)
            .populate('authorId')
            .populate('categoryIds')
            .populate('tagIds')
            .populate('uploader');

        if (!doc) {
            return res.status(404).json({ message: 'Document not found' });
        }

        console.log('--- Dữ liệu đã được Populate: ---');
        console.log(doc); // In toàn bộ document đã populate ra console của server

        res.status(200).json(doc);
    } catch (err) {
        console.error('--- LỖI TRONG ROUTE TEST ---', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;