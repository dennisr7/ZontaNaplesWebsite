import express from 'express';
import { apiLimiter, strictLimiter } from '../middleware/rateLimit.js';
import {
    getEvents,
    getEvent,
    createNewEvent,
    updateExistingEvent,
    deleteExistingEvent,
    rsvpToEvent,
    getEventRsvps,
    testEventEndpoint
} from '../controllers/eventController.js';

import { protect } from '../middleware/authMiddleware.js';
import { uploadEventImage, handleMulterErr } from '../middleware/fileUpload.js';

const router = express.Router();
router.use(apiLimiter);

router.get('/test', testEventEndpoint);
router.get('/', getEvents);
router.get('/:id', getEvent);
router.post('/', protect, uploadEventImage, handleMulterErr, createNewEvent);
router.put('/:id', protect, uploadEventImage, handleMulterErr, updateExistingEvent);
router.delete('/:id', protect, deleteExistingEvent);

// RSVP routes
router.post('/:id/rsvp', strictLimiter, rsvpToEvent); // Public - anyone can RSVP
router.get('/:id/rsvps', protect, getEventRsvps); // Protected - admin only

export default router;