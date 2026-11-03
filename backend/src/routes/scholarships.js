import express from 'express';
import { apiLimiter, strictLimiter } from '../middleware/rateLimit.js';
import  { 
    submitScholarshipApplication, 
    getAllScholarships,
    getScholarship,
    updateScholarship,
    downloadScholarshipForm,
    testScholarshipEndpoint, 
 } from '../controllers/scholarshipController.js';

import { protect } from '../middleware/authMiddleware.js';
import { uploadScholarshipDocs, handleMulterErr } from '../middleware/fileUpload.js';

const router = express.Router();
router.use(apiLimiter);

router.get('/test', testScholarshipEndpoint);
router.get('/download-form', downloadScholarshipForm);
//uploadScholarshipDocs middleware handles file uploads and errors
//handleMulterErr middleware handles multer specific errors
//submitScholarshipApplication is the main controller function
router.post('/apply', strictLimiter, uploadScholarshipDocs, handleMulterErr, submitScholarshipApplication);

//protected admin only routes
router.get('/', protect, getAllScholarships);
router.get('/:id', protect, getScholarship);
router.put('/:id', protect, updateScholarship);


export default router;

