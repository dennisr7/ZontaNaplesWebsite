//this is array is for testing only. A dabase will be implemented later

let events = [
    {
        id: "1",
        title: "Annual Fundraiser Gala",
        description: "Join us for an evening of dinner, dancing, and supporting women's empowerment.",
        date: "2025-12-15T18:00:00Z",
        location: "Naples Community Center",
        type: "fundraiser",
        ticketPrice: 50.00,
        maxAttendees: 100,
        imageUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "2",
        title: "Monthly Member Meeting",
        description: "Our regular monthly meeting to discuss club business and upcoming projects.",
        date: "2025-11-20T19:00:00Z",
        location: "Zonta Club Office",
        type: "meeting",
        ticketPrice: null,
        maxAttendees: null,
        imageUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "3",
        title: "Scholarship Award Ceremony",
        description: "Celebrate our scholarship recipients and their achievements.",
        date: "2025-11-10T17:00:00Z",
        location: "Naples High School Auditorium",
        type: "service",
        ticketPrice: null,
        maxAttendees: 200,
        imageUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

//again in the database we would set the ids to auto increment for now we will just simulate that
let nextId = 4;

//enums
export const EVENT_TYPES = {
    FUNDARISER: 'fundraiser',
    MEETING: 'meeting',
    SOCIAL: 'social',
    SERVICE: 'service',
    OTHER: 'other'
}

export const createEvent = (eventData) => {
    const newEvent = {
        id: String(nextId++),
        title: eventData.title,
        description: eventData.description,
        date: eventData.date,
        location: eventData.location,
        type: eventData.type,
        ticketPrice: eventData.ticketPrice || null,
        maxAttendees: eventData.maxAttendees || null,
        imageUrl: eventData.imageUrl || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    events.push(newEvent);
    return newEvent;
};

export const getAllEvents = (filters = {}) => {
    let filteredEvents = [...events]; //shallow copy of all events - expensive operation

    //if we have any filters applied 
    if(filters.type) {
        filteredEvents = filteredEvents.filter(event => event.type === filters.type);
    }

    return filteredEvents;
};

export const getEventById = (id) => {
    return events.find(event => event.id === id);
};

export const updateEvent = (id, updateData) => {
    const index = events.findIndex(event => event.id === id);
    
    //we didn't find the event
    if(index === -1) {
        return null;
    }

    events[index] = {
        ...events[index], // this preserves existing data of this event. 
        ...updateData, // this overwrites with new data provided in updateData
        id: events[index].id, 
        createdAt: events[index].createdAt, //preserve the original timestamp
        updatedAt: new Date().toISOString()
    }

    return events[index];
}

export const deleteEvent = (id) => {
    const index = events.findIndex(event => event.id === id);

    //event to be deleted does not exist
    if(index === -1) {
        return false;
    }

    events.splice(index, 1);
    return true;
}

export const validateEventData = (eventData) => {
    const errors = [];

    if(!eventData.title || eventData.title.trim().length === 0) {
        errors.push('Title is required'); //in a normal database entry we would just make it a not null field
    } 

    if(!eventData.description || eventData.description.trim().length < 15) {
        errors.push('Description must be at least 15 characters long');
    }

    //redundant check but whatever
    if(!eventData.date) {
        errors.push('Date is required');
    } else {
        const date = new Date(eventData.date);
        if(isNaN(date.getTime())) {
            errors.push('Date must be a valid date string');
        }
    }

    if(!eventData.location || eventData.location.trim().length === 0) {
        errors.push('Location is required');
    }

    //again this check would be redundant as frontend would use a dropdown to prevent invalid types
    if(eventData.type && !Object.values(EVENT_TYPES).includes(eventData.type)) {
        errors.push(`Invalid event type. Must be one of: ${Object.values(EVENT_TYPES).join(',')}`);
    }

    if(eventData.maxAttendees !== null && eventData.maxAttendees !== undefined) {
        if(!Number.isInteger(eventData.maxAttendees) || eventData.maxAttendees < 1) {
            errors.push('Max Attendees must be a positive integer');
        }
    }

    return {
        valid: errors.length === 0,
        errors
    };
}



