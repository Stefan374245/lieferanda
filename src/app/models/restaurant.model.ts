export interface Restaurant {
  id: string;
  name: string;
  description: string;
  logo: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  deliveryTime: number; // in minutes
  deliveryFee: number;
  minimumOrder: number;
  cuisine: string[];
  address: Address;
  openingHours: OpeningHours;
  isOpen: boolean;
  isDelivering: boolean;
}

export interface Address {
  street: string;
  number: string;
  city: string;
  zipCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

export interface OpeningHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface DayHours {
  open: string; // e.g., "08:00"
  close: string; // e.g., "22:00"
  isClosed: boolean;
}