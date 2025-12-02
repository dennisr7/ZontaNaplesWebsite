import express from 'express';
import { createMembershipCheckout, getCheckoutSession, triggerRenewalReminders } from '../controllers/membershipPaymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create checkout session for membership payment
router.post('/checkout', createMembershipCheckout);

// Retrieve checkout session by ID
router.get('/session/:sessionId', getCheckoutSession);

// Manual trigger for renewal reminders (admin only)
router.post('/trigger-reminders', protect, triggerRenewalReminders);

export default router;
