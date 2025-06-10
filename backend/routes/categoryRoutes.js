const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validationMiddleware');
const { createCategoryRules, updateCategoryRules } = require('../middlewares/validators/categoryValidator');

/**
 * @openapi
 * tags:
 *   - name: Categories
 *     description: API quản lý các danh mục
 */

/**
 * @openapi
 * /categories:
 *   get:
 *     summary: Lấy tất cả danh mục
 *     tags: [Categories]
 *     responses:
 *       '200':
 *         description: Thành công.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
*/

/**
 * @openapi
 * /categories:
 *   post:
 *     summary: Tạo danh mục mới (Admin/Librarian)
 *     tags: [Categories]
 *     security:
 *       bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Danh mục mới"
 *               description:
 *                 type: string
 *                 example: "Mô tả cho danh mục"
 *     responses:
 *       '201':
 *         description: Tạo thành công.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '401':
 *         description: Unauthorized - Yêu cầu xác thực
 *       '403':
 *         description: Forbidden - Không có quyền thực hiện
 */
// Public routes
router.route('/')
    .get(categoryController.getAllCategories);
router.route('/:id')
    .get(categoryController.getCategory);

// Private/Admin routes
router.use(protect, restrictTo('admin'));

/**
 * @openapi
 * /categories/{id}:
 *   get:
 *     summary: Lấy chi tiết một danh mục
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "60d21b4667d0d8992e610c85"
 *         description: ID của danh mục
 *     responses:
 *       '200':
 *         description: Thành công.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '404':
 *         description: Không tìm thấy danh mục
 *   patch:
 *     summary: Cập nhật một danh mục (Admin/Librarian)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Tên danh mục cập nhật"
 *               description:
 *                 type: string
 *                 example: "Mô tả cập nhật"
 *     responses:
 *       '200':
 *         description: Cập nhật thành công.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '401':
 *         description: Unauthorized - Yêu cầu xác thực
 *       '403':
 *         description: Forbidden - Không có quyền thực hiện
 *       '404':
 *         description: Không tìm thấy danh mục
 *   delete:
 *     summary: Xóa một danh mục (Admin/Librarian)
 *     tags: [Categories]
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
 *         description: Xóa thành công.
 *       '401':
 *         description: Unauthorized - Yêu cầu xác thực
 *       '403':
 *         description: Forbidden - Không có quyền thực hiện
 *       '404':
 *         description: Không tìm thấy danh mục
 */
router.route('/')
    .post(
        createCategoryRules,
        validate,
        categoryController.createCategory
    );

router.route('/:id')
    .patch(
        updateCategoryRules,
        validate,
        categoryController.updateCategory
    )
    .delete(categoryController.deleteCategory);

module.exports = router;