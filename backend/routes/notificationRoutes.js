const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { protect } = require('../middlewares/authMiddleware');

/**
 * @openapi
 * tags:
 *   - name: Notifications
 *     description: API quản lý thông báo của người dùng
 */

// Tất cả các route này đều yêu cầu người dùng phải đăng nhập
router.use(protect);

/**
 * @openapi
 * /notifications:
 *   get:
 *     summary: Lấy danh sách thông báo của người dùng hiện tại
 *     description: Trả về danh sách các thông báo chưa đọc trước, sau đó đến các thông báo đã đọc
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Số lượng thông báo muốn lấy
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Trang hiện tại
 *     responses:
 *       '200':
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 results:
 *                   type: integer
 *                   example: 5
 *                 data:
 *                   type: object
 *                   properties:
 *                     notifications:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Notification'
 *       '401':
 *         description: Unauthorized - Yêu cầu đăng nhập
 */
router.get('/', notificationController.getMyNotifications);

/**
 * @openapi
 * /notifications/read-all:
 *   patch:
 *     summary: Đánh dấu tất cả thông báo là đã đọc
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Đã đánh dấu tất cả thông báo là đã đọc"
 *       '401':
 *         description: Unauthorized - Yêu cầu đăng nhập
 */
router.patch('/read-all', notificationController.markAllNotificationsAsRead);

/**
 * @openapi
 * /notifications/{id}/read:
 *   patch:
 *     summary: Đánh dấu một thông báo là đã đọc
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "5f8d04b3ab35a62d6c4b5e9a"
 *         description: ID của thông báo
 *     responses:
 *       '200':
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       '401':
 *         description: Unauthorized - Yêu cầu đăng nhập
 *       '404':
 *         description: Không tìm thấy thông báo
 */
router.patch('/:id/read', notificationController.markNotificationAsRead);

module.exports = router;