import express from 'express';
import { apiLimiter, strictLimiter } from '../middleware/rateLimit.js';
import { createMembershipCheckout, getCheckoutSession, triggerRenewalReminders } from '../controllers/membershipPaymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(apiLimiter);

// Create checkout session for membership payment
router.post('/checkout', strictLimiter, createMembershipCheckout);

// Retrieve checkout session by ID
router.get('/session/:sessionId', getCheckoutSession);

// Manual trigger for renewal reminders (admin only)
router.post('/trigger-reminders', protect, triggerRenewalReminders);

export default router;
