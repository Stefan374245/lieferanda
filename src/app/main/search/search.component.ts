import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { DishCardComponent } from '../dish-card/dish-card.component';
import { Dish } from '../../models/dish.model';
import { Restaurant } from '../../models/restaurant.model';
import { DishService } from '../../services/dish.service';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    DishCardComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl('');
  searchQuery = '';
  loading = false;
  
  dishes: Dish[] = [];
  restaurants: Restaurant[] = [];

  constructor(
    private route: ActivatedRoute,
    private dishService: DishService,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      this.searchControl.setValue(this.searchQuery);
      if (this.searchQuery) {
        this.performSearch(this.searchQuery);
      }
    });

    this.searchControl.valueChanges.subscribe(value => {
      if (value && value.trim()) {
        this.performSearch(value.trim());
      }
    });
  }

  performSearch(query: string): void {
    this.loading = true;
    this.searchQuery = query;

    // Search dishes
    this.dishService.searchDishes(query).subscribe({
      next: (dishes) => {
        this.dishes = dishes;
        this.checkLoadingComplete();
      },
      error: (error) => {
        console.error('Error searching dishes:', error);
        this.checkLoadingComplete();
      }
    });

    // Search restaurants
    this.restaurantService.searchRestaurants(query).subscribe({
      next: (restaurants) => {
        this.restaurants = restaurants;
        this.checkLoadingComplete();
      },
      error: (error) => {
        console.error('Error searching restaurants:', error);
        this.checkLoadingComplete();
      }
    });
  }

  private checkLoadingComplete(): void {
    // Simple loading management - in real app you'd use forkJoin
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  onSearch(): void {
    const query = this.searchControl.value;
    if (query && query.trim()) {
      this.performSearch(query.trim());
    }
  }
}