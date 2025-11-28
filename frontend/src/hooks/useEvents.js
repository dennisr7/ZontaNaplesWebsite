import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventAPI } from '../utils/apiService';

// Query Keys
export const eventKeys = {
  all: ['events'],
  lists: () => [...eventKeys.all, 'list'],
  list: (filters) => [...eventKeys.lists(), filters],
  details: () => [...eventKeys.all, 'detail'],
  detail: (id) => [...eventKeys.details(), id],
};

// Fetch all events with optional filters
export const useEvents = (filters = {}) => {
  return useQuery({
    queryKey: eventKeys.list(filters),
    queryFn: () => eventAPI.getAllEvents(filters),
    select: (data) => data.data || [],
  });
};

// Fetch single event by ID
export const useEvent = (id) => {
  return useQuery({
    queryKey: eventKeys.detail(id),
    queryFn: () => eventAPI.getEvent(id),
    select: (data) => data.data,
    enabled: !!id, // Only run if id exists
  });
};

// RSVP to event mutation
export const useRsvpToEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ eventId, email }) => 
      fetch(`${import.meta.env.VITE_API_URL}/api/events/${eventId}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      }).then(res => {
        if (!res.ok) throw new Error('Failed to RSVP');
        return res.json();
      }),
    onSuccess: () => {
      // Invalidate and refetch events after successful RSVP
      queryClient.invalidateQueries({ queryKey: eventKeys.lists() });
    },
  });
};
