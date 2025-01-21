const Category = require('../models/categoryModel');
const logger = require('../config/logger');

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json({ success: true, data: categories });
    } catch (error) {
        logger.error('Error in getting categories:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get single category
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ success: true, data: category });
    } catch (error) {
        logger.error('Error in getting category:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Create category (Protected - Admin Only)
exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        logger.info(`New category created: ${category.name}`);
        res.status(201).json({ success: true, data: category });
    } catch (error) {
        logger.error('Error in creating category:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update category (Protected - Admin Only)
exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        logger.info(`Category updated: ${category.name}`);
        res.json({ success: true, data: category });
    } catch (error) {
        logger.error('Error in updating category:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete category (Protected - Admin Only)
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        logger.info(`Category deleted: ${category.name}`);
        res.json({ success: true, data: {} });
    } catch (error) {
        logger.error('Error in deleting category:', error);
        res.status(400).json({ success: false, message: error.message });
    }
}; 