import express from 'express';
import { getCategories, createCategory, getCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import requireLogin from '../../require_login.js';

const router = express.Router();

router.get('/categories', requireLogin, getCategories);
router.post('/categories', requireLogin, createCategory);
router.get('/categories/:id', requireLogin, getCategory);
router.put('/categories/:id', requireLogin, updateCategory);
router.delete('/categories/:id', requireLogin, deleteCategory);

export default router;
