import { CartItem } from './cart-item.model';
import { Address } from './restaurant.model';

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  status: OrderStatus;
  orderDate: Date;
  estimatedDeliveryTime: Date;
  deliveryAddress: Address;
  paymentMethod: PaymentMethod;
  notes?: string;
  tracking?: OrderTracking[];
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  READY = 'ready',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
  PAYPAL = 'paypal',
  BANK_TRANSFER = 'bank_transfer'
}

export interface OrderTracking {
  status: OrderStatus;
  timestamp: Date;
  message: string;
}