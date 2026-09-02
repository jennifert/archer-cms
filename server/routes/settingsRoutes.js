import express from 'express';
import { listApiEndpoints } from '../controllers/settingsController.js';
import requireRole from '../middleware/requireRole.js';

export default (app) => {
    const router = express.Router();
    router.get(
        '/settings/endpoints',
        requireRole('admin'),
        listApiEndpoints(app)
    );
    return router;
};