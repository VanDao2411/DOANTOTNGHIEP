const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validationMiddleware');
const { createCategoryRules, updateCategoryRules } = require('../middlewares/validators/categoryValidator');

// Public routes
router.route('/')
    .get(categoryController.getAllCategories);
router.route('/:id')
    .get(categoryController.getCategory);

// Private/Admin routes
router.use(protect, restrictTo('admin'));

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