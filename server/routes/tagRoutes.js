import express from 'express';
import { getTags, createTag, updateTag, deleteTag } from '../controllers/tagController.js';
import requireLogin from '../../require_login.js';

const router = express.Router();

router.get('/tags', requireLogin, getTags);
router.post('/tags', requireLogin, createTag);
router.put('/tags/:id', requireLogin, updateTag);
router.delete('/tags/:id', requireLogin, deleteTag);

export default router;
