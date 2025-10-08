import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Dish } from '../models/dish.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  private cartSubtotal = new BehaviorSubject<number>(0);
  private deliveryFee = new BehaviorSubject<number>(5.00);

  cartItems$ = this.cartItems.asObservable();
  cartSubtotal$ = this.cartSubtotal.asObservable();
  deliveryFee$ = this.deliveryFee.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadCartFromStorage();
  }

  // Add item to cart
  addToCart(dish: Dish, quantity: number = 1, notes?: string): void {
    const currentItems = this.cartItems.value;
    const existingItemIndex = currentItems.findIndex(item => item.dish.id === dish.id);

    if (existingItemIndex > -1) {
      // Update existing item
      currentItems[existingItemIndex].quantity += quantity;
      currentItems[existingItemIndex].totalPrice = 
        currentItems[existingItemIndex].quantity * dish.price;
    } else {
      // Add new item
      const newItem: CartItem = {
        id: this.generateCartItemId(),
        dish: dish,
        quantity: quantity,
        totalPrice: dish.price * quantity,
        notes: notes
      };
      currentItems.push(newItem);
    }

    this.updateCart(currentItems);
  }

  // Remove item from cart
  removeFromCart(itemId: string): void {
    const currentItems = this.cartItems.value.filter(item => item.id !== itemId);
    this.updateCart(currentItems);
  }

  // Update item quantity
  updateQuantity(itemId: string, quantity: number): void {
    const currentItems = this.cartItems.value.map(item => {
      if (item.id === itemId) {
        item.quantity = quantity;
        item.totalPrice = item.dish.price * quantity;
      }
      return item;
    });
    this.updateCart(currentItems);
  }

  // Clear cart
  clearCart(): void {
    this.updateCart([]);
  }

  // Get cart total
  getCartTotal(): Observable<number> {
    return new BehaviorSubject(
      this.cartSubtotal.value + this.deliveryFee.value
    ).asObservable();
  }

  // Get item count
  getItemCount(): number {
    return this.cartItems.value.reduce((total, item) => total + item.quantity, 0);
  }

  private updateCart(items: CartItem[]): void {
    this.cartItems.next(items);
    this.calculateSubtotal();
    this.saveCartToStorage();
  }

  private calculateSubtotal(): void {
    const subtotal = this.cartItems.value.reduce((total, item) => total + item.totalPrice, 0);
    this.cartSubtotal.next(subtotal);
  }

  private saveCartToStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cart', JSON.stringify(this.cartItems.value));
    }
  }

  private loadCartFromStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const items = JSON.parse(savedCart);
        this.updateCart(items);
      }
    }
  }

  private generateCartItemId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}