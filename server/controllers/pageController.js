import models from '../models/index.js';
const { Page, Category, ContentType, User } = models;

export const getPages = async (req, res) => {
    try {
        const pages = await Page.findAll({
            include: [User, Category, ContentType],
            order: [['dateEdited', 'DESC']]
        });
        res.json(pages);
    } catch (err) {
        console.error('🔥 GET /page error:', err);
        res.status(500).json({ error: 'Failed to fetch pages' });
    }
};

export const getPageById = async (req, res) => {
    try {
        const page = await Page.findByPk(req.params.id, {
            include: [User, Category, ContentType],
        });
        if (!page) return res.status(404).json({ error: 'Page not found' });
        res.json(page);
    } catch (err) {
        console.error('🔥 GET /page/:id error:', err);
        res.status(500).json({ error: 'Failed to fetch page' });
    }
};

export const createPage = async (req, res) => {
    try {
        const { title, content, CategoryId, ContentTypeId } = req.body;
        const newPage = await Page.create({
            title,
            content,
            CategoryId,
            ContentTypeId,
            UserId: req.user.id,
            dateCreated: new Date(),
            dateEdited: new Date()
        });
        res.status(201).json(newPage);
    } catch (err) {
        console.error('🔥 POST /page error:', err);
        res.status(500).json({ error: 'Failed to create page' });
    }
};

export const updatePage = async (req, res) => {
    try {
        const page = await Page.findByPk(req.params.id);
        if (!page) return res.status(404).json({ error: 'Page not found' });

        await page.update(req.body);
        res.json(page);
    } catch (err) {
        console.error('🔥 PUT /page/:id error:', err);
        res.status(500).json({ error: 'Failed to update page' });
    }
};

export const deletePage = async (req, res) => {
    try {
        const page = await Page.findByPk(req.params.id);
        if (!page) return res.status(404).json({ error: 'Page not found' });

        await page.destroy();
        res.json({ message: 'Page deleted' });
    } catch (err) {
        console.error('🔥 DELETE /page/:id error:', err);
        res.status(500).json({ error: 'Failed to delete page' });
    }
};
