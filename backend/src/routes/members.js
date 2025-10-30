import express from 'express';
import { submitMembershipApplication, testMemberEndpoint } from '../controllers/memberController.js';

const router = express.Router();


router.get('/test', testMemberEndpoint);
router.post('/apply', submitMembershipApplication);

export default router;