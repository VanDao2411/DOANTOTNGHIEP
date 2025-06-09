const Tag = require('../models/Tag');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.createTag = catchAsync(async (req, res, next) => {
    const newTag = await Tag.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            tag: newTag,
        },
    });
});

exports.getAllTags = catchAsync(async (req, res, next) => {
    const tags = await Tag.find(); 
    res.status(200).json({
        status: 'success',
        results: tags.length,
        data: {
            tags,
        },
    });
});

exports.getTag = catchAsync(async (req, res, next) => {
    const tag = await Tag.findById(req.params.id); 
    if (!tag) {
        return next(new AppError('Không tìm thấy tag với ID này', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            tag,
        },
    });
});

exports.updateTag = catchAsync(async (req, res, next) => {
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, { 
        new: true,
        runValidators: true,
    });
    if (!tag) {
        return next(new AppError('Không tìm thấy tag với ID này', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            tag,
        },
    });
});

exports.deleteTag = catchAsync(async (req, res, next) => {
    const tag = await Tag.findByIdAndDelete(req.params.id)
    if (!tag) {
        return next(new AppError('Không tìm thấy tag với ID này', 404));
    }
    res.status(204).json({
        status: 'success',
        data: null,
    });
});