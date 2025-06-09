const mongoose = require('mongoose');

const savedDocumentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        documentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Document',
            required: true,
        },
    },
    {
        timestamps: { createdAt: 'savedAt', updatedAt: false },
        versionKey: false,
        index: { userId: 1, documentId: 1, unique: true },
    }
);

const SavedDocument = mongoose.model('SavedDocument', savedDocumentSchema);

module.exports = SavedDocument;