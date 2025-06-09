const { body } = require('express-validator');

exports.saveDocumentRules = [
    body('documentId', 'Vui lòng cung cấp ID tài liệu.')
        .notEmpty(),
    
    body('documentId', 'ID tài liệu không hợp lệ.')
        .isMongoId()
];