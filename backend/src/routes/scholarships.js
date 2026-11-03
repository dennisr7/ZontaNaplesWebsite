import express from 'express';
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

router.get('/test', testScholarshipEndpoint);
router.get('/download-form', downloadScholarshipForm);
//uploadScholarshipDocs middleware handles file uploads and errors
//handleMulterErr middleware handles multer specific errors
//submitScholarshipApplication is the main controller function
router.post('/apply', uploadScholarshipDocs, handleMulterErr, submitScholarshipApplication);

//protected admin only routes
router.get('/', protect, getAllScholarships);
router.get('/:id', protect, getScholarship);
router.put('/:id', protect, updateScholarship);


export default router;

