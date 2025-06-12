const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
    {
        recipientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
        type: {
            type: String,
            required: true,
            enum: [
                'new_review',
                'document_approved',
                'document_rejected',
                'reply_to_review',
                'new_document_in_category',
                'system_message',
            ],
        },
        message: {
            type: String,
            required: true,
        },
        link: {
            type: String,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        documentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Document',
            default: null,
        },
        reviewId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
            default: null,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
        versionKey: false
    }
);

notificationSchema.index({ recipientId: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ recipientId: 1, createdAt: -1 });


const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;