import express from 'express';
import { apiLimiter, strictLimiter } from '../middleware/rateLimit.js';
import { login, logout, testAuthEndpoint } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(apiLimiter);

router.get('/test', testAuthEndpoint);
router.post('/login', strictLimiter, login);
router.post('/logout', protect, logout);

export default router;