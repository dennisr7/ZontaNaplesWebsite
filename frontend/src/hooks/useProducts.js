import { useQuery } from '@tanstack/react-query';
import { productAPI } from '../utils/apiService';

// Query Keys
export const productKeys = {
  all: ['products'],
  lists: () => [...productKeys.all, 'list'],
  list: (filters) => [...productKeys.lists(), filters],
  details: () => [...productKeys.all, 'detail'],
  detail: (id) => [...productKeys.details(), id],
};

// Fetch all products
export const useProducts = () => {
  return useQuery({
    queryKey: productKeys.lists(),
    queryFn: () => productAPI.getAllProducts(),
    select: (data) => data.data || [],
  });
};

// Fetch single product by ID
export const useProduct = (id) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productAPI.getProduct(id),
    select: (data) => data.data,
    enabled: !!id,
  });
};

// Fetch product categories
export const useProductCategories = () => {
  return useQuery({
    queryKey: [...productKeys.all, 'categories'],
    queryFn: () => productAPI.getCategories(),
    select: (data) => data.data || [],
  });
};
