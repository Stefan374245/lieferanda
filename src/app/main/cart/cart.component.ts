import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';
import { C } from "../../../../node_modules/@angular/cdk/overlay-module.d-B3qEQtts";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatSnackBarModule,
    C
],
  templateUrl: '../../main/cart/cart.component.html',
  styleUrls: ['../../main/cart/cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  subtotal = 0;
  deliveryFee = 0;
  total = 0;

  constructor(
    private cartService: CartService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });

    this.cartService.cartSubtotal$.subscribe(subtotal => {
      this.subtotal = subtotal;
      this.updateTotal();
    });

    this.cartService.deliveryFee$.subscribe(fee => {
      this.deliveryFee = fee;
      this.updateTotal();
    });
  }

  updateTotal(): void {
    this.total = this.subtotal + this.deliveryFee;
  }

  increaseQuantity(itemId: string): void {
    const item = this.cartItems.find(i => i.id === itemId);
    if (item) {
      this.cartService.updateQuantity(itemId, item.quantity + 1);
    }
  }

  decreaseQuantity(itemId: string): void {
    const item = this.cartItems.find(i => i.id === itemId);
    if (item && item.quantity > 1) {
      this.cartService.updateQuantity(itemId, item.quantity - 1);
    }
  }

  removeItem(itemId: string): void {
    this.cartService.removeFromCart(itemId);
    this.snackBar.open('Artikel wurde entfernt', 'OK', {
      duration: 3000
    });
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.snackBar.open('Warenkorb wurde geleert', 'OK', {
      duration: 3000
    });
  }

  goToCheckout(): void {
    if (this.cartItems.length === 0) {
      this.snackBar.open('Ihr Warenkorb ist leer', 'OK', {
        duration: 3000
      });
      return;
    }
    this.router.navigate(['/checkout']);
  }

  continueShopping(): void {
    this.router.navigate(['/restaurants']);
  }
}