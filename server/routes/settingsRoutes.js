import express from 'express';
import { listApiEndpoints } from '../controllers/settingsController.js';

export default (app) => {
    const router = express.Router();
    router.get('/settings/endpoints', listApiEndpoints(app));
    return router;
};