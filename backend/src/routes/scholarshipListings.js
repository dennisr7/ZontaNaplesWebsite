import express from 'express';
import { apiLimiter, strictLimiter } from '../middleware/rateLimit.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadMultipleFiles } from '../middleware/fileUpload.js';
import {
    getAllScholarshipListings,
    getScholarshipListingById,
    createScholarshipListing,
    updateScholarshipListing,
    deleteScholarshipListing,
    getScholarshipStats
} from '../controllers/scholarshipListingController.js';

const router = express.Router();
router.use(apiLimiter);

// Public routes
router.get('/', getAllScholarshipListings);

// Admin routes (protected)
router.post('/admin', protect, uploadMultipleFiles, createScholarshipListing);
router.put('/admin/:id', protect, uploadMultipleFiles, updateScholarshipListing);
router.delete('/admin/:id', protect, deleteScholarshipListing);
router.get('/admin/stats', protect, getScholarshipStats);

// Public route with :identifier (must be last so it does not shadow /admin/stats)
router.get('/:identifier', getScholarshipListingById);

export default router;
