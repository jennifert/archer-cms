import models from '../models/index.js';
const { Tag, User } = models;

export const getTags = async (req, res) => {
    try {
        const tags = await Tag.findAll({
            include: [User],
            order: [['date', 'DESC']],
        });
        res.json(tags);
    } catch (err) {
        console.error('🔥 GET /tags error:', err);
        res.status(500).json({ error: 'Failed to load tags' });
    }
};

export const createTag = async (req, res) => {
    try {
        const { name } = req.body;
        const tag = await Tag.create({
            name,
            date: new Date(),
            UserId: req.user.id
        });
        res.status(201).json(tag);
    } catch (err) {
        console.error('🔥 POST /tags error:', err);
        res.status(500).json({ error: 'Failed to create tag' });
    }
};

export const updateTag = async (req, res) => {
    try {
        const tag = await Tag.findByPk(req.params.id);
        if (!tag) return res.status(404).json({ error: 'Tag not found' });

        tag.name = req.body.name;
        await tag.save();
        res.json(tag);
    } catch (err) {
        console.error('🔥 PUT /tags/:id error:', err);
        res.status(500).json({ error: 'Failed to update tag' });
    }
};

export const deleteTag = async (req, res) => {
    try {
        const tag = await Tag.findByPk(req.params.id);
        if (!tag) return res.status(404).json({ error: 'Tag not found' });

        const pagesUsingTag = await tag.getPages();
        if (pagesUsingTag.length > 0) {
            return res.status(400).json({ error: 'Cannot delete tag: it is in use by one or more pages.' });
        }

        await tag.destroy();
        res.sendStatus(204);
    } catch (err) {
        console.error('🔥 DELETE /tags/:id error:', err);
        res.status(500).json({ error: 'Failed to delete tag' });
    }
};
