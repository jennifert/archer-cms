import models from '../models/index.js';
const { User } = models;

export const getCurrentUser = (req, res) => {
    if (req.user && typeof req.user === 'object') {
        const { id, name, email, role } = req.user;
        return res.json({ id, name, email, role });
    }
    return res.status(401).json({ error: 'Not authenticated' });
};

export const logoutUser = (req, res) => {
    req.logout(() => {
        res.json({ message: 'Logged out' });
    });
};

export const signupUser = async (req, res) => {
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
        console.error('🔥 signup error:', err);
        res.status(500).json({ error: 'Signup failed' });
    }
};