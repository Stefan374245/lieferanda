export interface CuisineCategory {
  id: string;
  name: string;
  displayName: string;
  icon: string;
  color: string;
  description: string;
}

export interface CuisineFilter {
  categoryId: string;
  isActive: boolean;
}

export interface RestaurantsByCuisine {
  [categoryId: string]: Restaurant[];
}

export interface CuisineStats {
  categoryId: string;
  restaurantCount: number;
  averageRating: number;
  averageDeliveryTime: number;
}

// Import Restaurant interface
import { Restaurant } from './restaurant.model';

export enum SupportedCuisines {
  ITALIENISCH = 'italienisch',
  ASIATISCH = 'asiatisch', 
  SPANISCH = 'spanisch',
  DEUTSCH = 'deutsch'
}

export const CUISINE_MAPPING = {
  [SupportedCuisines.ITALIENISCH]: 'Italienisch',
  [SupportedCuisines.ASIATISCH]: 'Asiatisch',
  [SupportedCuisines.SPANISCH]: 'Spanisch',
  [SupportedCuisines.DEUTSCH]: 'Deutsch'
} as const;