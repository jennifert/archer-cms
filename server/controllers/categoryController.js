import models from '../models/index.js';
const { Category, Page, User } = models;

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            include: [User],
            order: [['date', 'DESC']],
        });
        res.json(categories);
    } catch (err) {
        console.error('🔥 GET /categories error:', err);
        res.status(500).json({ error: 'Failed to load categories' });
    }
};

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name || name.trim() === '') {
            return res.status(400).json({ error: 'Category name is required.' });
        }
        const newCategory = await Category.create({
            name: name.trim(),
            UserId: req.user.id
        });
        res.status(201).json(newCategory);
    } catch (err) {
        console.error('🔥 POST /categories error:', err);
        res.status(500).json({ error: 'Failed to create category' });
    }
};

export const getCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id, {
            include: [User]
        });
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.json(category);
    } catch (err) {
        console.error('🔥 GET /categories/:id error:', err);
        res.status(500).json({ error: 'Failed to fetch category' });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category not found.' });

        category.name = req.body.name.trim();
        await category.save();

        res.json(category);
    } catch (err) {
        console.error('🔥 PUT /categories/:id error:', err);
        res.status(500).json({ error: 'Failed to update category.' });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category not found' });

        const pagesWithCategory = await Page.count({ where: { CategoryId: req.params.id } });
        if (pagesWithCategory > 0) {
            return res.status(400).json({ error: 'Category is in use and cannot be deleted.' });
        }

        await category.destroy();
        res.sendStatus(204);
    } catch (err) {
        console.error('🔥 DELETE /categories/:id error:', err);
        res.status(500).json({ error: 'Failed to delete category' });
    }
};
