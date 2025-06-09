const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validationMiddleware');
const { createAuthorRules, updateAuthorRules } = require('../middlewares/validators/authorValidator');

router.route('/')
    .get(authorController.getAllAuthors);
router.route('/:id')
    .get(authorController.getAuthor);

router.use(protect, restrictTo('admin'));

router.route('/')
    .post(
        createAuthorRules,
        validate,
        authorController.createAuthor);

router.route('/:id')
    .patch(
        updateAuthorRules,
        validate,
        authorController.updateAuthor)
    .delete(authorController.deleteAuthor);

module.exports = router;