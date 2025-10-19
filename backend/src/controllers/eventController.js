import {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    validateEventData,
    EVENT_TYPES
} from '../models/event.js';

export const getEvents = (req, res, next) => {
    try {
        const { type, upcoming } = req.query;
        
        const filters = {};
        if(type) filters.type = type; //if a type is provided, add it to filters. since its small we did not use a function body
        if(upcoming) filters.upcoming = upcoming;

        const events = getAllEvents(filters);

        res.json({
            success: true, 
            count: events.length,
            data: events
        });

        console.log(`${events.length} events retrieved`);
    } catch (error) {
        console.error('Error retrieving events:', error);
        next(error);
    }
};   


export const getEvent = (req, res, next) => {
    try {
        //in the api route we defined :id as a route parameter
        const { id } = req.params;
        const event = getEventById(id);

        if(!event) {
            return res.status(404).json({
                success: false,
                error: `Event with ID: ${id} not found`
            });
        }
        
        res.json({
            success: true,
            data: event
        });

        console.log(`Event with ID: ${id} retrieved`);
    } catch(error) {
        console.error('Error retrieving event:', error);
        next(error);
    }
}

export const createNewEvent = (req, res, next) => {
    try {
        const eventData = req.body;

        const validation = validateEventData(eventData);
        if(!validation.valid) {
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                errors: validation.errors
            });
        }

        const newEvent = createEvent(eventData);
        res.status(201).json({
            success: true, 
            message: 'Event created successfully',
            data: newEvent
        });

        console.log(`New event created with ID: ${newEvent.id}`);
    } catch (error) {
        console.error('Error creating event:', error);
        next(error);
    }
}

export const updateExistingEvent = (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        const existingEvent = getEventById(id);
        if(!existingEvent) {
            return res.status(404).json({
                success: false,
                error: `Event with ID: ${id} not found`
            });
        }

        const updatedData = { ...existingEvent, ...updateData };
        const validation = validateEventData(updatedData);
        if(!validation.valid) {
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                errors: validation.errors
            });
        }

        const updatedEvent = updateEvent(id, updateData);
        res.json({
            success: true,
            messsage: 'Event updated successfully',
            data: updatedEvent
        });
        console.log(`Event with ID: ${id} updated`);
    } catch (error) {
        console.error('Error updating event:', error);
        next(error);
    }
}

export const deleteExistingEvent = (req, res, next) => {
    try {
        const { id } = req.params;

        const existingEvent = getEventById(id);
        if(!existingEvent) {
            return res.status(404).json({
                success: false,
                error: `Event with ID: ${id} not found`
            });
        }

        const deleted = deleteEvent(id);
        if(deleted) {
            res.json({
                success: true,
                message: 'Event deleted successfully'
            });
        }
        console.log(`Event with ID: ${id} deleted`);
    } catch (error) {
        console.error('Error deleting event:', error);
        next(error);
    }
}

export const testEventEndpoint = (req, res) => {
    res.json({
        success: true,
        message: 'Event API is working',
        availableEventTypes: Object.values(EVENT_TYPES), 
        timestamp: new Date().toISOString()
    })
}