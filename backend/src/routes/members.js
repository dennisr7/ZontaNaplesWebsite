import express from 'express';
import { apiLimiter, strictLimiter } from '../middleware/rateLimit.js';
import { 
    submitMembershipApplication,
    getAllMembers,
    getMember,
    updateMember,
    deleteMember,
    testMemberEndpoint } from '../controllers/memberController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(apiLimiter);

router.get('/test', testMemberEndpoint);
router.post('/apply', strictLimiter, submitMembershipApplication);

//protected admin only routes
router.get('/', protect, getAllMembers);
router.get('/:id', protect, getMember);
router.put('/:id', protect, updateMember);
router.delete('/:id', protect, deleteMember);

export default router;