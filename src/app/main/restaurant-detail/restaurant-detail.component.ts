import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, switchMap, of } from 'rxjs';

import { Restaurant } from '../../models/restaurant.model';
import { Dish, DishCategory } from '../../models/dish.model';
import { RestaurantService } from '../../services/restaurant.service';
import { DishService } from '../../services/dish.service';
import { DishCardComponent } from '../dish-card/dish-card.component';

@Component({
  selector: 'app-restaurant-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    DishCardComponent
  ],
  templateUrl: './restaurant-detail.component.html',
  styleUrl: './restaurant-detail.component.scss'
})
export class RestaurantDetailComponent implements OnInit {
  restaurant: Restaurant | null = null;
  allDishes: Dish[] = [];
  dishesByCategory: { [key: string]: Dish[] } = {};
  loading = true;
  
  // Available categories for this restaurant
  availableCategories: DishCategory[] = [];
  
  // All possible categories
  allCategories = [
    { key: DishCategory.VORSPEISEN, label: 'Vorspeisen', icon: 'restaurant' },
    { key: DishCategory.HAUPTSPEISE, label: 'Hauptspeisen', icon: 'dining' },
    { key: DishCategory.NACHSPEISE, label: 'Nachspeisen', icon: 'cake' },
    { key: DishCategory.GETRAENKE, label: 'Getränke', icon: 'local_bar' },
    { key: DishCategory.TAPAS, label: 'Tapas', icon: 'tapas' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantService,
    private dishService: DishService
  ) {}

  ngOnInit(): void {
    this.loadRestaurantData();
  }

  private loadRestaurantData(): void {
    this.route.params.pipe(
      switchMap(params => {
        const restaurantId = params['id'];
        if (!restaurantId) {
          return of(null);
        }
        
        // Load restaurant details
        return this.restaurantService.getRestaurant(restaurantId);
      })
    ).subscribe({
      next: (restaurant) => {
        if (restaurant) {
          this.restaurant = restaurant;
          this.loadDishes(restaurant.id);
        } else {
          console.error('Restaurant not found');
          this.router.navigate(['/restaurants']);
        }
      },
      error: (error) => {
        console.error('Error loading restaurant:', error);
        this.loading = false;
      }
    });
  }

  private loadDishes(restaurantId: string): void {
    this.dishService.getDishesByRestaurant(restaurantId).subscribe({
      next: (dishes) => {
        this.allDishes = dishes;
        this.groupDishesByCategory();
        this.determineAvailableCategories();
        this.loading = false;
        
        console.log('Restaurant dishes loaded:', {
          restaurantId,
          totalDishes: dishes.length,
          categories: this.availableCategories,
          dishesByCategory: this.dishesByCategory
        });
      },
      error: (error) => {
        console.error('Error loading dishes:', error);
        this.loading = false;
      }
    });
  }

  private groupDishesByCategory(): void {
    this.dishesByCategory = {};
    
    // Group dishes by category
    this.allDishes.forEach(dish => {
      if (!this.dishesByCategory[dish.category]) {
        this.dishesByCategory[dish.category] = [];
      }
      this.dishesByCategory[dish.category].push(dish);
    });
    
    // Sort dishes within each category by name
    Object.keys(this.dishesByCategory).forEach(category => {
      this.dishesByCategory[category].sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  private determineAvailableCategories(): void {
    // Get categories that have dishes
    this.availableCategories = Object.keys(this.dishesByCategory) as DishCategory[];
    
    // Sort categories in logical order
    const categoryOrder = [
      DishCategory.VORSPEISEN,
      DishCategory.TAPAS,  // Only for Spanish restaurants
      DishCategory.HAUPTSPEISE,
      DishCategory.NACHSPEISE,
      DishCategory.GETRAENKE
    ];
    
    this.availableCategories.sort((a, b) => {
      return categoryOrder.indexOf(a) - categoryOrder.indexOf(b);
    });
    
    console.log('Available categories for restaurant:', this.availableCategories);
  }

  getCategoryLabel(category: DishCategory): string {
    const categoryInfo = this.allCategories.find(cat => cat.key === category);
    return categoryInfo ? categoryInfo.label : category;
  }

  getCategoryIcon(category: DishCategory): string {
    const categoryInfo = this.allCategories.find(cat => cat.key === category);
    return categoryInfo ? categoryInfo.icon : 'restaurant';
  }

  getDishesByCategory(category: DishCategory): Dish[] {
    return this.dishesByCategory[category] || [];
  }

  goBack(): void {
    this.router.navigate(['/restaurants']);
  }
}