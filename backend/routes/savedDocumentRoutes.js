const express = require('express');
const router = express.Router();
const savedDocumentController = require('../controllers/savedDocumentController');
const { protect } = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validationMiddleware');
const { saveDocumentRules } = require('../middlewares/validators/savedDocumentValidator');

/**
 * @openapi
 * tags:
 *   - name: Saved Documents
 *     description: API quản lý danh sách tài liệu đã lưu của người dùng
 */

router.use(protect);

/**
 * @openapi
 * /saved-documents:
 *   get:
 *     summary: Lấy danh sách tài liệu đã lưu của người dùng hiện tại
 *     tags: [Saved Documents]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Document'
 *   post:
 *     summary: Lưu một tài liệu vào danh sách
 *     tags: [Saved Documents]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [documentId]
 *             properties:
 *               documentId:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c85"
 *     responses:
 *       '201':
 *         description: Lưu thành công
 *       '400':
 *         description: Tài liệu đã được lưu trước đó hoặc không tồn tại
 *       '401':
 *         description: Unauthorized
 */
router
    .route('/')
    .get(savedDocumentController.getMySavedDocuments)
    .post(
        saveDocumentRules,
        validate,
        savedDocumentController.saveDocument);      


/** @openapi
* /saved-documents/{documentId}:
*   delete:
*     summary: Bỏ lưu một tài liệu khỏi danh sách
*     tags: [Saved Documents]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: documentId
*         required: true
*         schema:
*           type: string
*     responses:
*       '204':
*         description: Bỏ lưu thành công
*       '404':
*         description: Tài liệu không tồn tại trong danh sách đã lưu
*/
router
    .route('/:documentId')
    .delete(savedDocumentController.unsaveDocument);

module.exports = router;