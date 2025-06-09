const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validationMiddleware');
const { signupRules, loginRules, updatePasswordRules } = require('../middlewares/validators/authValidator');

router.post(
    '/signup',
    signupRules,
    validate,
    authController.signup
);

router.post(
    '/login',
    loginRules,
    validate,
    authController.login
);


router.get('/logout', protect, authController.logout);
router.get('/me', protect, authController.getMe);

router.patch(
    '/updateMyPassword', 
    protect,
    updatePasswordRules,
    validate,
    authController.updateMyPassword
);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

module.exports = router;