import express from 'express';
import { login, logout, testAuthEndpoint } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/test', testAuthEndpoint);
router.post('/login', login);
router.post('/logout', protect, logout);

export default router;