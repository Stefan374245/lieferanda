export interface CartItem {
  id: string;
  dish: any; // Will be populated with Dish data
  quantity: number;
  totalPrice: number;
  notes?: string;
  selectedOptions?: DishOption[];
}

export interface DishOption {
  id: string;
  name: string;
  price: number;
  selected: boolean;
}