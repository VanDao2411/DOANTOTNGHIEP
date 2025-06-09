const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { protect } = require('../middlewares/authMiddleware');

// Tất cả các route này đều yêu cầu người dùng phải đăng nhập
router.use(protect);

router.get('/', notificationController.getMyNotifications);
router.patch('/read-all', notificationController.markAllNotificationsAsRead);
router.patch('/:id/read', notificationController.markNotificationAsRead);

module.exports = router;