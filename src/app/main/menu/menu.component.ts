import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { DishCardComponent } from '../dish-card/dish-card.component';
import { Dish, DishCategory } from '../../models/dish.model';
import { Restaurant } from '../../models/restaurant.model';
import { DishService } from '../../services/dish.service';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    DishCardComponent
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  restaurant: Restaurant | null = null;
  dishes: Dish[] = [];
  loading = true;
  restaurantId: string = '';

  categories = [
    { key: DishCategory.VORSPEISEN, label: 'Vorspeisen', icon: 'restaurant' },
    { key: DishCategory.HAUPTSPEISE, label: 'Hauptspeise', icon: 'dinner_dining' },
    { key: DishCategory.TAPAS, label: 'Tapas', icon: 'tapas' },
    { key: DishCategory.NACHSPEISE, label: 'Nachspeise', icon: 'cake' },
    { key: DishCategory.GETRAENKE, label: 'Getränke', icon: 'local_drink' }
  ];

  constructor(
    private route: ActivatedRoute,
    private dishService: DishService,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.restaurantId = params['id'];
      this.loadRestaurantAndMenu();
    });
  }

  loadRestaurantAndMenu(): void {
    this.loading = true;

    // Load restaurant details
    this.restaurantService.getRestaurant(this.restaurantId).subscribe({
      next: (restaurant) => {
        this.restaurant = restaurant;
      },
      error: (error) => {
        console.error('Error loading restaurant:', error);
      }
    });

    // Load dishes
    this.dishService.getDishesByRestaurant(this.restaurantId).subscribe({
      next: (dishes) => {
        this.dishes = dishes;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading dishes:', error);
        this.loading = false;
      }
    });
  }

  getDishesByCategory(category: DishCategory): Dish[] {
    return this.dishes.filter(dish => dish.category === category);
  }

  getCategoryCount(category: DishCategory): number {
    return this.getDishesByCategory(category).length;
  }
}