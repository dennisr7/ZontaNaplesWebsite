import express from 'express';
import  { submitScholarshipApplication, testScholarshipEndpoint, downloadScholarshipForm } from '../controllers/scholarshipController.js';
import { uploadScholarshipDocs, handleMulterErr } from '../middleware/fileUpload.js';

const router = express.Router();

router.get('/test', testScholarshipEndpoint);
router.get('/download-form', downloadScholarshipForm);
//uploadScholarshipDocs middleware handles file uploads and errors
//handleMulterErr middleware handles multer specific errors
//submitScholarshipApplication is the main controller function
router.post('/apply', uploadScholarshipDocs, handleMulterErr, submitScholarshipApplication);


export default router;

