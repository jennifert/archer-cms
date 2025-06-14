import express from 'express';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';

import authRoutes from './server/routes/authRoutes.js';
import imageRoutes from './server/routes/imageRoutes.js';
import pageRoutes from './server/routes/pageRoutes.js';
import categoryRoutes from './server/routes/categoryRoutes.js';
import tagRoutes from './server/routes/tagRoutes.js';
import typeRoutes from './server/routes/typeRoutes.js';
import settingsRoutes from './server/routes/settingsRoutes.js';

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

        // Serve static frontend files (from Vite build)
        app.use(express.static(path.join(__dirname, 'dist')));
        app.use('/images', express.static(path.join(__dirname, 'public/images')));


        app.use('/api', authRoutes);
        app.use('/api', imageRoutes);
        app.use('/api', pageRoutes);
        app.use('/api', categoryRoutes);
        app.use('/api', tagRoutes);
        app.use('/api', typeRoutes);
        app.use('/api', settingsRoutes(app));

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
