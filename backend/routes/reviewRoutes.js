const express = require('express');
const router = express.Router({ mergeParams: true });
const reviewController = require('../controllers/reviewController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validationMiddleware');
const { createReviewRules, updateReviewRules } = require('../middlewares/validators/reviewValidator');

/**
 * @openapi
 * tags:
 *   - name: Reviews
 *     description: API quản lý các đánh giá cho tài liệu
 */
router.use(protect);

/**
 * @openapi
 * /documents/{documentId}/reviews:
 *   get:
 *     summary: Lấy tất cả đánh giá của một tài liệu
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: documentId
 *         required: true
 *         schema:
 *           type: string
 *           example: "60d21b4667d0d8992e610c85"
 *         description: ID của tài liệu
 *     responses:
 *       '200':
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *   post:
 *     summary: Tạo một đánh giá mới cho một tài liệu
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: documentId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [rating]
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 4
 *               comment:
 *                 type: string
 *                 example: "Tài liệu rất hữu ích"
 *     responses:
 *       '201':
 *         description: Tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       '400':
 *         description: Dữ liệu không hợp lệ
 *       '401':
 *         description: Unauthorized
 */

router
    .route('/')
    .get(reviewController.getAllReviews)
    .post(restrictTo('user'), 
        createReviewRules,
        validate,
        reviewController.createReview); 

        /**
 * @openapi
 * /reviews/{id}:
 *   patch:
 *     summary: Cập nhật đánh giá của chính mình
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của review
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: "Cập nhật nhận xét"
 *     responses:
 *       '200':
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       '403':
 *         description: Không có quyền chỉnh sửa
 *       '404':
 *         description: Không tìm thấy review
 *   delete:
 *     summary: Xóa đánh giá (chủ sở hữu hoặc admin)
 *     tags: [Reviews]
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
 *         description: Xóa thành công
 *       '403':
 *         description: Không có quyền xóa
 *       '404':
 *         description: Không tìm thấy review
 */
router
    .route('/:id')
    .get(reviewController.getReview)
    .patch(restrictTo('user', 'admin'), 
        updateReviewRules,
        validate,
        reviewController.updateReview)
    .delete(restrictTo('user', 'admin'), reviewController.deleteReview); 

module.exports = router;