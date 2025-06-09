const express = require('express');
const router = express.Router();
const savedDocumentController = require('../controllers/savedDocumentController');
const { protect } = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validationMiddleware');
const { saveDocumentRules } = require('../middlewares/validators/savedDocumentValidator');

router.use(protect);

router
    .route('/')
    .get(savedDocumentController.getMySavedDocuments)
    .post(
        saveDocumentRules,
        validate,
        savedDocumentController.saveDocument);      

router
    .route('/:documentId')
    .delete(savedDocumentController.unsaveDocument);

module.exports = router;