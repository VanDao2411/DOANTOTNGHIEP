const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validationMiddleware');
const { 
    signupRules, 
    loginRules, 
    updatePasswordRules,
} = require('../middlewares/validators/authValidator');

/**
 * @openapi
 * tags:
 * name: Auth
 * description: API cho việc Xác thực và Quản lý Tài khoản Người dùng
 */

/**
 * @openapi
 * /auth/signup:
 *   post:
 *     summary: Đăng ký một tài khoản người dùng mới
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password, passwordConfirm]
 *             properties:
 *               username: 
 *                 type: string
 *                 example: "testuser1"
 *               email: 
 *                 type: string
 *                 format: email
 *                 example: "test1@example.com"
 *               password: 
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *               passwordConfirm: 
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *               fullName: 
 *                 type: string
 *                 example: "Test User"
 *     responses:
 *       '201':
 *         description: Đăng ký thành công.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: success
 *                 token: 
 *                   type: string
 *                   description: "JSON Web Token"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       '400':
 *         description: Dữ liệu đầu vào không hợp lệ hoặc username/email đã tồn tại.
 */
router.post('/signup', signupRules, validate, authController.signup);


/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Đăng nhập và nhận về JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: 
 *                 type: string
 *                 format: email
 *                 example: "test1@example.com"
 *               password: 
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *     responses:
 *       '200':
 *         description: Đăng nhập thành công.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 token:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       '401':
 *         description: Email hoặc mật khẩu không chính xác.
 */
router.post('/login', loginRules, validate, authController.login);


/**
 * @openapi
 * /auth/updateMyPassword:
 *   patch:
 *     summary: Người dùng tự cập nhật mật khẩu của mình
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [passwordCurrent, password, passwordConfirm]
 *             properties:
 *               passwordCurrent: 
 *                 type: string
 *                 format: password
 *               password: 
 *                 type: string
 *                 format: password
 *               passwordConfirm: 
 *                 type: string
 *                 format: password
 *     responses:
 *       '200':
 *         description: Cập nhật mật khẩu thành công, trả về token mới.
 *       '401':
 *         description: Mật khẩu hiện tại không chính xác.
 */
router.patch('/updateMyPassword', protect, updatePasswordRules, validate, authController.updateMyPassword);


/**
 * @openapi
 * /auth/forgotPassword:
 *   post:
 *     summary: Yêu cầu một link để reset mật khẩu
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email: 
 *                 type: string
 *                 format: email
 *     responses:
 *       '200':
 *         description: Luôn trả về thành công để tránh dò email.
 */
router.post('/forgotPassword', authController.forgotPassword);

/**
 * @openapi
 * /auth/resetPassword/{token}:
 *   patch:
 *     summary: Đặt lại mật khẩu bằng token
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [password, passwordConfirm]
 *             properties:
 *               password: 
 *                 type: string
 *                 format: password
 *               passwordConfirm: 
 *                 type: string
 *                 format: password
 *     responses:
 *       '200':
 *         description: Reset mật khẩu thành công, trả về token đăng nhập mới.
 *       '400':
 *         description: Token không hợp lệ hoặc đã hết hạn.
 */
router.patch('/resetPassword/:token', authController.resetPassword);
router.get('/me', protect, authController.getMe);
router.get('/logout', protect, authController.logout);

module.exports = router;