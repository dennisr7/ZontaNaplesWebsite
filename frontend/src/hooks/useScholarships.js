import { useQuery } from '@tanstack/react-query';
import { scholarshipListingAPI } from '../utils/apiService';

// Query Keys
export const scholarshipListingKeys = {
  all: ['scholarshipListings'],
  lists: () => [...scholarshipListingKeys.all, 'list'],
  list: (status) => [...scholarshipListingKeys.lists(), status],
  details: () => [...scholarshipListingKeys.all, 'detail'],
  detail: (id) => [...scholarshipListingKeys.details(), id],
};

// Fetch all scholarship listings
export const useScholarshipListings = (status = 'active') => {
  return useQuery({
    queryKey: scholarshipListingKeys.list(status),
    queryFn: () => scholarshipListingAPI.getAllListings(status),
    select: (data) => data.data || [],
  });
};

// Fetch single scholarship listing by ID
export const useScholarshipListing = (id) => {
  return useQuery({
    queryKey: scholarshipListingKeys.detail(id),
    queryFn: () => scholarshipListingAPI.getListing(id),
    select: (data) => data.data,
    enabled: !!id,
  });
};
