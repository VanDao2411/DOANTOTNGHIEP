const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

/**
 * @openapi
 * tags:
 *     name: Users
 *     description: API cho việc quản lý người dùng (cả người dùng tự quản lý và admin)
 */

// Các route này yêu cầu người dùng phải đăng nhập
router.use(protect);

/**
 * @openapi
 * /users/updateMe:
 *   patch:
 *     summary: Người dùng tự cập nhật thông tin cá nhân
 *     description: Cập nhật các thông tin không nhạy cảm như fullName, bio, avatarUrl. Không dùng để đổi mật khẩu.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Các trường cần cập nhật.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "Người Dùng Mới"
 *               bio:
 *                 type: string
 *                 example: "Đây là tiểu sử của tôi."
 *     responses:
 *       '200':
 *         description: Cập nhật thành công, trả về thông tin người dùng đã cập nhật.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '401':
 *         description: Unauthorized - Token không hợp lệ.
 */
router.patch('/updateMe', userController.updateMe);

/**
 * @openapi
 * /users/deleteMe:
 *   delete:
 *     summary: Người dùng tự vô hiệu hóa (xóa mềm) tài khoản của mình
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '204':
 *         description: Vô hiệu hóa tài khoản thành công.
 *       '401':
 *         description: Unauthorized - Token không hợp lệ.
 */
router.delete('/deleteMe', userController.deleteMe);

// Các route bên dưới chỉ dành cho admin
router.use(restrictTo('admin'));

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Lấy danh sách tất cả người dùng (Admin)
 *     description: Hỗ trợ phân trang, lọc và sắp xếp.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Thành công, trả về một danh sách người dùng.
 *       '403':
 *         description: Forbidden - Không có quyền admin.
 */
router
    .route('/')
    .get(userController.getAllUsers);

    /**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết một người dùng (Admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng
 *     responses:
 *       '200':
 *         description: Thành công.
 *       '404':
 *         description: Không tìm thấy người dùng.
 *   patch:
 *     summary: Cập nhật thông tin một người dùng bởi Admin
 *     tags: [Users]
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
 *               role:
 *                 type: string
 *                 enum: [user, admin, librarian]
 *               active:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Cập nhật thành công.
 *   delete:
 *     summary: Xóa vĩnh viễn một người dùng bởi Admin
 *     tags: [Users]
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
 */
router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;