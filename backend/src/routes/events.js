import express from 'express';
import {
    getEvents,
    getEvent,
    createNewEvent,
    updateExistingEvent,
    deleteExistingEvent,
    testEventEndpoint
} from '../controllers/eventController.js';

const router = express.Router();

router.get('/test', testEventEndpoint);
router.get('/', getEvents);
router.get('/:id', getEvent);
router.post('/', createNewEvent);
router.put('/:id', updateExistingEvent);
router.delete('/:id', deleteExistingEvent);

export default router;