const express = require('express');
const router = express.Router({ mergeParams: true });
const reviewController = require('../controllers/reviewController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validationMiddleware');
const { createReviewRules, updateReviewRules } = require('../middlewares/validators/reviewValidator');

router.use(protect);

router
    .route('/')
    .get(reviewController.getAllReviews)
    .post(restrictTo('user'), 
        createReviewRules,
        validate,
        reviewController.createReview); 

router
    .route('/:id')
    .get(reviewController.getReview)
    .patch(restrictTo('user', 'admin'), 
        updateReviewRules,
        validate,
        reviewController.updateReview)
    .delete(restrictTo('user', 'admin'), reviewController.deleteReview); 

module.exports = router;