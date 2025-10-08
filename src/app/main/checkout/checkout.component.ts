import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { CartItem } from '../../models/cart-item.model';
import { PaymentMethod } from '../../models/order.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  cartItems: CartItem[] = [];
  subtotal = 0;
  deliveryFee = 0;
  total = 0;
  loading = false;

  paymentMethods = [
    { value: PaymentMethod.CASH, label: 'Bar bei Lieferung', icon: 'payments' },
    { value: PaymentMethod.CARD, label: 'Kreditkarte', icon: 'credit_card' },
    { value: PaymentMethod.PAYPAL, label: 'PayPal', icon: 'account_balance_wallet' }
  ];

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.checkoutForm = this.fb.group({
      // Delivery Address
      street: ['', Validators.required],
      number: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      
      // Contact Info
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      
      // Payment
      paymentMethod: [PaymentMethod.CASH, Validators.required],
      
      // Notes
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadCartData();
    this.loadUserData();
  }

  loadCartData(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      if (items.length === 0) {
        this.router.navigate(['/cart']);
      }
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

  loadUserData(): void {
    this.authService.getCurrentUserProfile().subscribe((user: any) => {
      if (user) {
        this.checkoutForm.patchValue({
          phone: user.phone,
          email: user.email
        });

        if (user.addresses && user.addresses.length > 0) {
          const primaryAddress = user.addresses[0];
          this.checkoutForm.patchValue({
            street: primaryAddress.street,
            number: primaryAddress.number,
            city: primaryAddress.city,
            zipCode: primaryAddress.zipCode
          });
        }
      }
    });
  }

  updateTotal(): void {
    this.total = this.subtotal + this.deliveryFee;
  }

  onSubmit(): void {
    if (this.checkoutForm.valid && this.cartItems.length > 0) {
      this.loading = true;
      
      const formValue = this.checkoutForm.value;
      const userId = this.authService.getCurrentUserId();
      
      if (!userId) {
        this.snackBar.open('Sie müssen angemeldet sein um zu bestellen', 'OK', {
          duration: 3000
        });
        this.router.navigate(['/auth/login']);
        return;
      }

      const orderData = {
        userId: userId,
        restaurantId: this.cartItems[0].dish.restaurantId,
        restaurantName: 'Restaurant Name', // This should come from restaurant data
        items: this.cartItems,
        subtotal: this.subtotal,
        deliveryFee: this.deliveryFee,
        totalAmount: this.total,
        deliveryAddress: {
          street: formValue.street,
          number: formValue.number,
          city: formValue.city,
          zipCode: formValue.zipCode,
          country: 'Deutschland'
        },
        paymentMethod: formValue.paymentMethod,
        notes: formValue.notes
      };

      this.orderService.createOrder(orderData).subscribe({
        next: (orderId) => {
          this.cartService.clearCart();
          this.snackBar.open('Bestellung wurde erfolgreich aufgegeben!', 'OK', {
            duration: 3000
          });
          this.router.navigate(['/orders']);
        },
        error: (error) => {
          console.error('Error creating order:', error);
          this.snackBar.open('Fehler beim Aufgeben der Bestellung', 'OK', {
            duration: 3000
          });
          this.loading = false;
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/cart']);
  }
}