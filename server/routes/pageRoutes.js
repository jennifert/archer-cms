import express from 'express';
import { getPages, getPageById, createPage, updatePage, deletePage } from '../controllers/pageController.js';
import requireLogin from '../../require_login.js';

const router = express.Router();

router.get('/page', requireLogin, getPages);
router.get('/page/:id', requireLogin, getPageById);
router.post('/page', requireLogin, createPage);
router.put('/page/:id', requireLogin, updatePage);
router.delete('/page/:id', requireLogin, deletePage);

export default router;
