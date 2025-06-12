const Author = require('../models/Author');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.createAuthor = catchAsync(async (req, res, next) => {
    const newAuthor = await Author.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            author: newAuthor,
        },
    });
});

exports.getAllAuthors = catchAsync(async (req, res, next) => {
    const authors = await Author.find();
    res.status(200).json({
        status: 'success',
        results: authors.length,
        data: {
            authors,
        },
    });
});

exports.getAuthor = catchAsync(async (req, res, next) => {
    const author = await Author.findById(req.params.id);
    if (!author) {
        return next(new AppError('Không tìm thấy tác giả với ID này', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            author,
        },
    });
});

exports.updateAuthor = catchAsync(async (req, res, next) => {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!author) {
        return next(new AppError('Không tìm thấy tác giả với ID này', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            author,
        },
    });
});

exports.deleteAuthor = catchAsync(async (req, res, next) => {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
        return next(new AppError('Không tìm thấy tác giả với ID này', 404));
    }
    res.status(204).json({
        status: 'success',
        data: null,
    });
});