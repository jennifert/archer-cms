import express from 'express';
import {
  getTypes,
  createType,
  getTypeById,
  updateType,
  deleteType
} from '../controllers/typeController.js';
import requireLogin from '../../require_login.js';

const router = express.Router();

router.get('/types', requireLogin, getTypes);
router.post('/type', requireLogin, createType);
router.get('/type/:id', requireLogin, getTypeById);
router.put('/type/:id', requireLogin, updateType);
router.delete('/type/:id', requireLogin, deleteType);

export default router;
