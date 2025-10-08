import { Address } from './restaurant.model';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth?: Date;
  profileImage?: string;
  addresses: Address[];
  favoriteRestaurants: string[];
  orderHistory: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  language: string;
  currency: string;
  notifications: NotificationSettings;
  dietaryRestrictions: string[];
}

export interface NotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
  orderUpdates: boolean;
  promotions: boolean;
}