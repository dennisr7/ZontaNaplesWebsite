import express from 'express';
import { 
    submitMembershipApplication,
    getAllMembers,
    getMember,
    updateMember,
    deleteMember,
    testMemberEndpoint } from '../controllers/memberController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/test', testMemberEndpoint);
router.post('/apply', submitMembershipApplication);

//protected admin only routes
router.get('/', protect, getAllMembers);
router.get('/:id', protect, getMember);
router.put('/:id', protect, updateMember);
router.delete('/:id', protect, deleteMember);

export default router;