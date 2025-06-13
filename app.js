import express from 'express';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';

import models from './server/models/index.js'; // Sequelize models
import requireLogin from './require_login.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env variables
dotenv.config();

const app = express();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessions
app.use(session({
    secret: process.env.COOKIE_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, // must be false for local dev (non-HTTPS)
        sameSite: 'lax' // allow post-login refresh
    }
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
const { User, Category, Tag, HeaderImage } = models;
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return done(null, false, { message: 'Incorrect email.' });
        const valid = await user.validatePassword(password);
        return valid ? done(null, user) : done(null, false, { message: 'Invalid password.' });
    } catch (err) {
        return done(err);
    }
}));

// Session serialization
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// Sync database and start app
models.sequelize.sync().then(() => {
    try {
        console.log('Database synced');

        // Serve static frontend files (from Vite build)
        app.use(express.static(path.join(__dirname, 'dist')));
        app.use('/images', express.static(path.join(__dirname, 'public/images')));

        // Simple test route
        app.get('/api/ping', (req, res) => {
            res.json({ message: 'pong' });
        });

        // Login Route
        app.post('/api/login', passport.authenticate('local'), (req, res) => {
            res.json({ message: 'Logged in', user: req.user });
        });

        // Logout Route
        app.get('/api/logout', (req, res) => {
            req.logout(() => {
                res.json({ message: 'Logged out' });
            });
        });

        // Me (Session Check)
        app.get('/api/me', (req, res) => {
            try {
                if (req.user && typeof req.user === 'object') {
                    const { id, name, email, role } = req.user;
                    return res.json({ id, name, email, role });
                } else {
                    return res.status(401).json({ error: 'Not authenticated' });
                }
            } catch (err) {
                console.error('🔥 Error in /api/me:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
        });


        // Signup Route
        app.post('/api/signup', async (req, res) => {
            const { name, email, password } = req.body;

            if (!email || !password || !name) {
                return res.status(400).json({ error: 'All fields required' });
            }

            try {
                const existing = await User.findOne({ where: { email } });
                if (existing) {
                    return res.status(409).json({ error: 'User already exists' });
                }

                const newUser = await User.create({ name, email, password });
                req.login(newUser, (err) => {
                    if (err) return res.status(500).json({ error: 'Login after signup failed' });
                    res.status(201).json({ message: 'User created', user: { id: newUser.id, name, email } });
                });
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Signup failed' });
            }
        });

        app.get('/api/me', (req, res) => {
            console.log('✅ /api/me hit. User:', req.user?.email);
            if (req.user) {
                const { id, name, email, role } = req.user;
                return res.status(200).json({ id, name, email, role });
            }
            res.status(401).json({ error: 'Not authenticated' });
        });

        // Pages
        app.get('/api/page', requireLogin, async (req, res) => {
            try {
                const pages = await models.Page.findAll({
                    include: [
                        { model: models.User },
                        { model: models.Category, required: false },       // allow nulls
                        { model: models.ContentType, required: false }
                    ],
                    order: [['dateEdited', 'DESC']]
                });
                res.json(pages);
            } catch (err) {
                console.error('🔥 GET /api/page error:', err);
                res.status(500).json({ error: 'Failed to fetch pages' });
            }
        });


        //for get editing page
        app.get('/api/page/:id', requireLogin, async (req, res) => {
            try {
                const page = await models.Page.findByPk(req.params.id, {
                    include: [models.Category, models.ContentType, models.User],
                });
                if (!page) return res.status(404).json({ error: 'Page not found' });
                res.json(page);
            } catch (err) {
                console.error('🔥 GET /api/page/:id error:', err);
                res.status(500).json({ error: 'Failed to fetch page' });
            }
        });

        //create a page
        app.post('/api/page', requireLogin, async (req, res) => {
            try {
                const { title, content, CategoryId, ContentTypeId } = req.body;
                const newPage = await models.Page.create({
                    title,
                    content,
                    CategoryId,
                    ContentTypeId,
                    UserId: req.user.id,
                    dateCreated: new Date(),
                    dateEdited: new Date()
                });
                res.status(201).json(newPage);
                console.log("💾 Saving new page with:", req.body);
            } catch (err) {
                console.error('🔥 POST /api/page error:', err);
                res.status(500).json({ error: 'Failed to create page' });
            }
        });

        //update a page:
        app.put('/api/page/:id', requireLogin, async (req, res) => {
            try {
                const page = await models.Page.findByPk(req.params.id);
                if (!page) return res.status(404).send('Not found');

                await page.update(req.body);
                res.json(page);
            } catch (err) {
                console.error('🔥 PUT /api/page/:id error:', err);
                res.status(500).json({ error: 'Failed to update page' });
            }
        });



        app.delete('/api/page/:id', requireLogin, async (req, res) => {
            const page = await models.Page.findByPk(req.params.id);
            if (!page) return res.status(404).json({ error: 'Page not found' });

            await page.destroy();
            res.json({ message: 'Page deleted' });
        });

        app.get('/api/categories', requireLogin, async (req, res) => {
            try {
                const categories = await Category.findAll({
                    include: [User],
                    order: [['date', 'DESC']],
                });
                res.json(categories);
            } catch (err) {
                console.error('🔥 /api/categories error:', err);
                res.status(500).json({ error: 'Failed to load categories' });
            }
        });

        // POST /api/categories
        app.post('/api/categories', requireLogin, async (req, res) => {
            try {
                const { name } = req.body;
                if (!name || name.trim() === '') {
                    return res.status(400).json({ error: 'Category name is required.' });
                }

                const newCategory = await models.Category.create({
                    name: name.trim(),
                    UserId: req.user.id
                });

                res.status(201).json(newCategory);
            } catch (err) {
                console.error('🔥 POST /api/categories error:', err);
                res.status(500).json({ error: 'Failed to create category' });
            }
        });

        // Get a single category by ID
        app.get('/api/categories/:id', requireLogin, async (req, res) => {
            try {
                const category = await models.Category.findByPk(req.params.id, {
                    include: [models.User]
                });
                if (!category) return res.status(404).json({ error: 'Category not found' });

                res.json(category);
            } catch (err) {
                console.error('🔥 GET /api/categories/:id error:', err);
                res.status(500).json({ error: 'Failed to fetch category' });
            }
        });


        // Update an existing category
        app.put('/api/categories/:id', requireLogin, async (req, res) => {
            try {
                const { id } = req.params;
                const { name } = req.body;

                if (!name || name.trim() === '') {
                    return res.status(400).json({ error: 'Category name is required.' });
                }

                const category = await models.Category.findByPk(id);
                if (!category) {
                    return res.status(404).json({ error: 'Category not found.' });
                }

                category.name = name.trim();
                await category.save();

                res.json(category);
            } catch (err) {
                console.error('🔥 PUT /api/categories/:id error:', err);
                res.status(500).json({ error: 'Failed to update category.' });
            }
        });

        // DELETE category (with check for linked pages)
        app.delete('/api/categories/:id', requireLogin, async (req, res) => {
            try {
                const category = await models.Category.findByPk(req.params.id);
                if (!category) {
                    return res.status(404).json({ error: 'Category not found' });
                }

                const pagesWithCategory = await models.Page.count({
                    where: { CategoryId: req.params.id }
                });

                if (pagesWithCategory > 0) {
                    return res.status(400).json({
                        error: 'Category is in use and cannot be deleted.'
                    });
                }

                await category.destroy();
                res.sendStatus(204);
            } catch (err) {
                console.error('🔥 DELETE /api/categories/:id error:', err);
                res.status(500).json({ error: 'Failed to delete category' });
            }
        });


        app.get('/api/tags', requireLogin, async (req, res) => {
            try {
                const tags = await Tag.findAll({
                    include: [User],
                    order: [['date', 'DESC']],
                });
                res.json(tags);
            } catch (err) {
                console.error('🔥 /api/tags error:', err);
                res.status(500).json({ error: 'Failed to load tags' });
            }
        });

        // Create a tag
        app.post('/api/tags', requireLogin, async (req, res) => {
            try {
                const { name } = req.body;
                const tag = await Tag.create({
                    name,
                    date: new Date(),
                    UserId: req.user.id
                });
                res.status(201).json(tag);
            } catch (err) {
                console.error('🔥 POST /api/tags error:', err);
                res.status(500).json({ error: 'Failed to create tag' });
            }
        });

        // Update a tag
        app.put('/api/tags/:id', requireLogin, async (req, res) => {
            try {
                const { name } = req.body;
                const tag = await Tag.findByPk(req.params.id);
                if (!tag) return res.status(404).json({ error: 'Tag not found' });
                tag.name = name;
                await tag.save();
                res.json(tag);
            } catch (err) {
                console.error('🔥 PUT /api/tags/:id error:', err);
                res.status(500).json({ error: 'Failed to update tag' });
            }
        });

        // Delete a tag
        app.delete('/api/tags/:id', requireLogin, async (req, res) => {
            try {
                const tag = await models.Tag.findByPk(req.params.id);
                if (!tag) return res.status(404).json({ error: 'Tag not found' });

                const pagesUsingTag = await tag.getPages();
                if (pagesUsingTag.length > 0) {
                    return res.status(400).json({ error: 'Cannot delete tag: it is in use by one or more pages.' });
                }

                await tag.destroy();
                res.sendStatus(204);
            } catch (err) {
                console.error('🔥 DELETE /api/tags/:id error:', err);
                res.status(500).json({ error: 'Failed to delete tag' });
            }
        });


        const { ContentType } = models;

        // Get all content types
        app.get('/api/types', requireLogin, async (req, res) => {
            try {
                const types = await ContentType.findAll({ order: [['createdAt', 'DESC']] });
                res.json(types);
            } catch (err) {
                console.error('/api/types error:', err);
                res.status(500).json({ error: 'Failed to load types' });
            }
        });

        // Create new content type
        app.post('/api/type', requireLogin, async (req, res) => {
            try {
                const { name } = req.body;
                const type = await ContentType.create({ name });
                res.status(201).json(type);
            } catch (err) {
                console.error('🔥 POST /api/type error:', err);
                res.status(500).json({ error: 'Failed to create type' });
            }
        });

        // GET single content type
        app.get('/api/type/:id', requireLogin, async (req, res) => {
            try {
                const type = await models.ContentType.findByPk(req.params.id);
                if (!type) return res.status(404).json({ error: 'Type not found' });
                res.json(type);
            } catch (err) {
                console.error('🔥 GET /api/type/:id error:', err);
                res.status(500).json({ error: 'Failed to fetch type' });
            }
        });


        // Update content type
        app.put('/api/type/:id', requireLogin, async (req, res) => {
            try {
                const { name } = req.body;
                const type = await ContentType.findByPk(req.params.id);
                if (!type) return res.status(404).json({ error: 'Type not found' });

                type.name = name;
                await type.save();
                res.json(type);
            } catch (err) {
                console.error('🔥 PUT /api/type/:id error:', err);
                res.status(500).json({ error: 'Failed to update type' });
            }
        });

        // DELETE content type with usage check
        app.delete('/api/type/:id', requireLogin, async (req, res) => {
            try {
                const type = await models.ContentType.findByPk(req.params.id);
                if (!type) return res.status(404).json({ error: 'Type not found' });

                const inUse = await models.Page.count({ where: { ContentTypeId: req.params.id } });
                if (inUse > 0) {
                    return res.status(400).json({ error: 'Cannot delete type: it is in use by one or more pages.' });
                }

                await type.destroy();
                res.sendStatus(204);
            } catch (err) {
                console.error('🔥 DELETE /api/type/:id error:', err);
                res.status(500).json({ error: 'Failed to delete type' });
            }
        });


        // GET all header images
        app.get('/api/images/headers', requireLogin, async (req, res) => {
            try {
                const images = await HeaderImage.findAll({
                    include: [User],
                    order: [['dateSaved', 'DESC']]
                });
                res.json(images);
            } catch (err) {
                console.error('🔥 /api/images/headers error:', err);
                res.status(500).json({ error: 'Failed to load images' });
            }
        });

        // DELETE header image by ID
        app.delete('/api/images/header/:id', requireLogin, async (req, res) => {
            try {
                const image = await HeaderImage.findByPk(req.params.id);
                if (!image) return res.status(404).json({ error: 'Image not found' });

                await image.destroy();
                res.sendStatus(204);
            } catch (err) {
                console.error('🔥 DELETE /api/images/header/:id error:', err);
                res.status(500).json({ error: 'Failed to delete header image' });
            }
        });


        const storage = multer.diskStorage({
            destination: path.join(process.cwd(), 'public/images'),
            filename: (req, file, cb) => {
                const uniqueName = `${Date.now()}-${file.originalname}`;
                cb(null, uniqueName);
            }
        });
        const upload = multer({ storage });

        app.post('/api/images/header/upload', requireLogin, upload.single('image'), async (req, res) => {
            try {
                const { filename, mimetype } = req.file;
                const image = await HeaderImage.create({
                    filename,
                    mimetype,
                    dateSaved: new Date(),
                    UserId: req.user.id
                });
                res.status(201).json(image);
            } catch (err) {
                console.error('🔥 POST /api/images/header/upload error:', err);
                res.status(500).json({ error: 'Upload failed' });
            }
        });

        //KEEP BELOW ALL OTHER ROUTES
        // List all registered API endpoints
        app.get('/api/settings/endpoints', (req, res) => {
            const routes = [];
            const routeDescriptions = {
                '/api/ping': 'yo!',
                '/api/login': '—',
                '/api/logout': '—',
                '/api/me': '—',
                '/api/signup': '—',
                '/api/page': '—',
                '/api/page/:id': '—',
                '/api/categories': '—',
                '/api/categories/:id': '—',
                '/api/tags': '—',
                '/api/tags/:id': '—',
                '/api/types': '—',
                '/api/type': '—',
                '/api/type/:id': '—',
                '/api/images/headers': '—',
                '/api/images/header/:id': '—',
                '/api/images/header/upload': '—',
                '/api/settings/endpoints': 'Lists all available API endpoints',
            };

            app._router.stack.forEach((middleware) => {
                if (
                    middleware.route &&
                    typeof middleware.route.path === 'string' &&
                    middleware.route.path !== '*'
                ) {
                    routes.push({
                        route: middleware.route.path,
                        method: Object.keys(middleware.route.methods)[0].toUpperCase(),
                        purpose: routeDescriptions[middleware.route.path] || '—',
                    });
                }
            });

            res.json(routes);
        });

        // Handle unknown API routes
        app.use('/api', (req, res) => {
            res.status(404).json({ error: 'API route not found' });
        });

        // Serve frontend for all other routes
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'dist', 'index.html'));
        });

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (err) {
        console.error('Server startup error:', err);
    }
});
