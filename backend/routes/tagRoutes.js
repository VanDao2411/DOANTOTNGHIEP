const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validationMiddleware');
const { createTagRules, updateTagRules } = require('../middlewares/validators/tagValidator');



router.route('/')
    .get(tagController.getAllTags);
router.route('/:id')
    .get(tagController.getTag);

router.use(protect, restrictTo('admin'));

router.route('/')
    .post(
        createTagRules,
        validate,
        tagController.createTag);

router.route('/:id')
    .patch(
        updateTagRules,
        validate,
        tagController.updateTag)
    .delete(tagController.deleteTag);


module.exports = router;