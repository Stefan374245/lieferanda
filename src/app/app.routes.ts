import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./main/above-the-fold/atf/atf.component').then(m => m.AtfComponent)
  },
  {
    path: 'restaurants',
    loadComponent: () => import('./main/restaurant-list/restaurant-list.component').then(m => m.RestaurantListComponent)
  },
  {
    path: 'restaurant/:id',
    loadComponent: () => import('./main/menu/menu.component').then(m => m.MenuComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./main/cart/cart.component').then(m => m.CartComponent)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./main/checkout/checkout.component').then(m => m.CheckoutComponent)
  },
  {
    path: 'orders',
    loadComponent: () => import('./main/order-tracking/order-tracking.component').then(m => m.OrderTrackingComponent)
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./main/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./main/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'search',
    loadComponent: () => import('./main/search/search.component').then(m => m.SearchComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
