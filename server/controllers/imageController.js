import models from '../models/index.js';
const { HeaderImage, User } = models;

export const getHeaderImages = async (req, res) => {
    try {
        const images = await HeaderImage.findAll({
            include: [User],
            order: [['dateSaved', 'DESC']]
        });
        res.json(images);
    } catch (err) {
        console.error('🔥 /images/headers error:', err);
        res.status(500).json({ error: 'Failed to load images' });
    }
};

export const deleteHeaderImage = async (req, res) => {
    try {
        const image = await HeaderImage.findByPk(req.params.id);
        if (!image) return res.status(404).json({ error: 'Image not found' });
        await image.destroy();
        res.sendStatus(204);
    } catch (err) {
        console.error('🔥 DELETE header image error:', err);
        res.status(500).json({ error: 'Failed to delete image' });
    }
};

export const uploadHeaderImage = async (req, res) => {
    try {
        const { filename, mimetype, size } = req.file;

        // Limit: < 700KB
        const MAX_SIZE = 700 * 1024;
        const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

        if (size > MAX_SIZE) {
            return res.status(400).json({ error: 'Image too large. Must be under 700KB.' });
        }

        if (!ALLOWED_TYPES.includes(mimetype)) {
            return res.status(400).json({ error: 'Unsupported file type. Only images allowed.' });
        }

        const image = await HeaderImage.create({
            filename,
            mimetype,
            dateSaved: new Date(),
            UserId: req.user.id
        });

        res.status(201).json(image);
    } catch (err) {
        console.error('🔥 Upload error:', err);
        res.status(500).json({ error: 'Upload failed' });
    }
};
