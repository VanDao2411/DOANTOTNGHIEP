const Category = require('../models/Category');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.createCategory = catchAsync(async (req, res, next) => {
    const newCategory = await Category.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            category: newCategory,
        },
    });
});

exports.getAllCategories = catchAsync(async (req, res, next) => {
    const categories = await Category.find();

    res.status(200).json({
        status: 'success',
        results: categories.length,
        data: {
            categories,
        },
    });
});

exports.getCategory = catchAsync(async (req, res, next) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        return next(new AppError('Không tìm thấy danh mục với ID này', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            category,
        },
    });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true, 
    });

    if (!category) {
        return next(new AppError('Không tìm thấy danh mục với ID này', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            category,
        },
    });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
        return next(new AppError('Không tìm thấy danh mục với ID này', 404));
    }
    
    res.status(204).json({ // 204 No Content - Response thành công nhưng không có nội dung để gửi về
        status: 'success',
        data: null,
    });
});