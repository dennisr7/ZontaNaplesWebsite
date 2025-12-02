import express from 'express';
import {
    submitContactForm,
    getAllContacts,
    getContact,
    updateContactStatus,
    deleteContact
} from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route - submit contact form
router.post('/', submitContactForm);

// Admin routes - protected
router.get('/admin', protect, getAllContacts);
router.get('/admin/:id', protect, getContact);
router.put('/admin/:id', protect, updateContactStatus);
router.delete('/admin/:id', protect, deleteContact);

export default router;
