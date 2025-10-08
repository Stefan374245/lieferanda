import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { Order, OrderStatus } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  templateUrl: './order-tracking.component.html',
  styleUrl: './order-tracking.component.scss'
})
export class OrderTrackingComponent implements OnInit {
  activeOrders: Order[] = [];
  pastOrders: Order[] = [];
  loading = true;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      this.loading = false;
      return;
    }

    // Load active orders
    this.orderService.getActiveOrders(userId).subscribe({
      next: (orders) => {
        this.activeOrders = orders;
        this.checkLoadingComplete();
      },
      error: (error) => {
        console.error('Error loading active orders:', error);
        this.checkLoadingComplete();
      }
    });

    // Load all orders for past orders
    this.orderService.getUserOrders(userId).subscribe({
      next: (orders) => {
        this.pastOrders = orders.filter(order => 
          order.status === OrderStatus.DELIVERED || order.status === OrderStatus.CANCELLED
        );
        this.checkLoadingComplete();
      },
      error: (error) => {
        console.error('Error loading past orders:', error);
        this.checkLoadingComplete();
      }
    });
  }

  private checkLoadingComplete(): void {
    // Simple loading management
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  getStatusIcon(status: OrderStatus): string {
    const icons = {
      [OrderStatus.PENDING]: 'schedule',
      [OrderStatus.CONFIRMED]: 'check_circle',
      [OrderStatus.PREPARING]: 'restaurant',
      [OrderStatus.READY]: 'done',
      [OrderStatus.OUT_FOR_DELIVERY]: 'delivery_dining',
      [OrderStatus.DELIVERED]: 'done_all',
      [OrderStatus.CANCELLED]: 'cancel'
    };
    return icons[status];
  }

  getStatusColor(status: OrderStatus): string {
    const colors = {
      [OrderStatus.PENDING]: 'warn',
      [OrderStatus.CONFIRMED]: 'primary',
      [OrderStatus.PREPARING]: 'accent',
      [OrderStatus.READY]: 'primary',
      [OrderStatus.OUT_FOR_DELIVERY]: 'primary',
      [OrderStatus.DELIVERED]: 'primary',
      [OrderStatus.CANCELLED]: 'warn'
    };
    return colors[status];
  }

  getStatusText(status: OrderStatus): string {
    const texts = {
      [OrderStatus.PENDING]: 'Wartend',
      [OrderStatus.CONFIRMED]: 'Bestätigt',
      [OrderStatus.PREPARING]: 'In Zubereitung',
      [OrderStatus.READY]: 'Bereit',
      [OrderStatus.OUT_FOR_DELIVERY]: 'Unterwegs',
      [OrderStatus.DELIVERED]: 'Zugestellt',
      [OrderStatus.CANCELLED]: 'Storniert'
    };
    return texts[status];
  }

  cancelOrder(orderId: string): void {
    this.orderService.cancelOrder(orderId).subscribe({
      next: () => {
        this.loadOrders();
      },
      error: (error) => {
        console.error('Error cancelling order:', error);
      }
    });
  }

  canCancelOrder(order: Order): boolean {
    return order.status === OrderStatus.PENDING || order.status === OrderStatus.CONFIRMED;
  }
}