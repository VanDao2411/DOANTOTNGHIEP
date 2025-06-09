const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const reviewRouter = require('./reviewRoutes');
const { protect, restrictTo } = require('../middlewares/authMiddleware');
const { uploadDocumentFiles } = require('../middlewares/uploadMiddleware');
const { validate } = require('../middlewares/validationMiddleware');
const { createDocumentRules, updateDocumentRules } = require('../middlewares/validators/documentValidator');

router.use('/:documentId/reviews', reviewRouter);
router
    .route('/')
    .get(documentController.getAllDocuments)
    .post(protect, uploadDocumentFiles, createDocumentRules, validate, documentController.createDocument); 

router
    .route('/:id')
    .get(documentController.getDocument)
    .patch(protect, uploadDocumentFiles, createDocumentRules, validate, documentController.updateDocument)
    .delete(protect, restrictTo('admin'), documentController.deleteDocument);

// Ví dụ route tìm kiếm
// router.get('/search/results', documentController.searchDocuments);

module.exports = router;