import express from 'express';
import { getHeaderImages, deleteHeaderImage, uploadHeaderImage } from '../controllers/imageController.js';
import requireLogin from '../../require_login.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
    destination: path.join(process.cwd(), 'public/images'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });

router.get('/images/headers', requireLogin, getHeaderImages);
router.delete('/images/header/:id', requireLogin, deleteHeaderImage);
router.post('/images/header/upload', requireLogin, upload.single('image'), uploadHeaderImage);

export default router;
