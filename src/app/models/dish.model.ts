export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: DishCategory;
  rating: number;
  preparationTime: number; // in minutes
  ingredients: string[];
  allergens: string[];
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isAvailable: boolean;
  restaurantId: string;
}

export enum DishCategory {
  VORSPEISEN = 'vorspeisen',
  HAUPTSPEISE = 'hauptspeise', 
  NACHSPEISE = 'nachspeise',
  GETRAENKE = 'getraenke',
  TAPAS = 'tapas'
}