import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc, getDocs, addDoc, updateDoc, query, where, orderBy } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { Order, OrderStatus, PaymentMethod } from '../models/order.model';
import { CartItem } from '../models/cart-item.model';
import { Address } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private firestore: Firestore) { }

  // Create new order
  createOrder(orderData: {
    userId: string;
    restaurantId: string;
    restaurantName: string;
    items: CartItem[];
    subtotal: number;
    deliveryFee: number;
    totalAmount: number;
    deliveryAddress: Address;
    paymentMethod: string;
    notes?: string;
  }): Observable<string> {
    const order: Omit<Order, 'id'> = {
      ...orderData,
      paymentMethod: orderData.paymentMethod as PaymentMethod,
      status: OrderStatus.PENDING,
      orderDate: new Date(),
      estimatedDeliveryTime: this.calculateEstimatedDeliveryTime(),
      tracking: [{
        status: OrderStatus.PENDING,
        timestamp: new Date(),
        message: 'Bestellung wurde aufgegeben'
      }]
    };

    const ordersRef = collection(this.firestore, 'orders');
    return from(addDoc(ordersRef, order)).pipe(
      map(docRef => docRef.id)
    );
  }

  // Get order by ID
  getOrder(orderId: string): Observable<Order | null> {
    const orderRef = doc(this.firestore, 'orders', orderId);
    return from(getDoc(orderRef)).pipe(
      map(doc => doc.exists() ? { id: doc.id, ...doc.data() } as Order : null)
    );
  }

  // Get orders by user
  getUserOrders(userId: string): Observable<Order[]> {
    const ordersRef = collection(this.firestore, 'orders');
    const q = query(
      ordersRef, 
      where('userId', '==', userId),
      orderBy('orderDate', 'desc')
    );
    return from(getDocs(q)).pipe(
      map(snapshot => 
        snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order))
      )
    );
  }

  // Update order status
  updateOrderStatus(orderId: string, status: OrderStatus, message?: string): Observable<void> {
    const orderRef = doc(this.firestore, 'orders', orderId);
    
    const tracking = {
      status: status,
      timestamp: new Date(),
      message: message || this.getStatusMessage(status)
    };

    return from(updateDoc(orderRef, {
      status: status,
      tracking: [...this.getCurrentTracking(orderId), tracking]
    }));
  }

  // Cancel order
  cancelOrder(orderId: string, reason?: string): Observable<void> {
    return this.updateOrderStatus(orderId, OrderStatus.CANCELLED, reason || 'Bestellung wurde storniert');
  }

  // Get active orders (not delivered or cancelled)
  getActiveOrders(userId: string): Observable<Order[]> {
    const ordersRef = collection(this.firestore, 'orders');
    const q = query(
      ordersRef,
      where('userId', '==', userId),
      where('status', 'in', [
        OrderStatus.PENDING,
        OrderStatus.CONFIRMED,
        OrderStatus.PREPARING,
        OrderStatus.READY,
        OrderStatus.OUT_FOR_DELIVERY
      ])
    );
    return from(getDocs(q)).pipe(
      map(snapshot => 
        snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order))
      )
    );
  }

  private calculateEstimatedDeliveryTime(): Date {
    const now = new Date();
    // Add 30-45 minutes for estimated delivery
    const estimatedMinutes = 30 + Math.floor(Math.random() * 15);
    return new Date(now.getTime() + estimatedMinutes * 60000);
  }

  private getStatusMessage(status: OrderStatus): string {
    const messages = {
      [OrderStatus.PENDING]: 'Bestellung wird bearbeitet',
      [OrderStatus.CONFIRMED]: 'Bestellung wurde bestätigt',
      [OrderStatus.PREPARING]: 'Ihr Essen wird zubereitet',
      [OrderStatus.READY]: 'Bestellung ist bereit zur Abholung',
      [OrderStatus.OUT_FOR_DELIVERY]: 'Bestellung ist unterwegs',
      [OrderStatus.DELIVERED]: 'Bestellung wurde zugestellt',
      [OrderStatus.CANCELLED]: 'Bestellung wurde storniert'
    };
    return messages[status];
  }

  private getCurrentTracking(orderId: string): any[] {
    // This would normally fetch the current tracking array
    // For simplicity, returning empty array
    return [];
  }
}