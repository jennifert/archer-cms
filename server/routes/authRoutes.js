import express from 'express';
import passport from 'passport';
import { getCurrentUser, logoutUser, signupUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signupUser);

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ message: 'Logged in', user: req.user });
});

router.get('/logout', logoutUser);
router.get('/me', getCurrentUser);

export default router;
