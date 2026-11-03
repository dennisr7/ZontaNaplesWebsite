import rateLimit from 'express-rate-limit';

const make = (windowMs, limit, message) => rateLimit({
    windowMs,
    limit,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { success: false, error: message }
});

// General limit for every API route: 300 requests per 15 minutes per IP
export const apiLimiter = make(15 * 60 * 1000, 300, 'Too many requests, please try again later.');

// Stricter limit for login and public form submissions: 20 per 15 minutes per IP
export const strictLimiter = make(15 * 60 * 1000, 20, 'Too many attempts, please try again later.');

// Stripe webhooks: generous, but still bounded
export const webhookLimiter = make(60 * 1000, 600, 'Too many webhook requests.');
