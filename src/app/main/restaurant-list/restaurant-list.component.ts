import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import { Restaurant } from '../../models/restaurant.model';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatCheckboxModule
  ],
  templateUrl: './restaurant-list.component.html',
  styleUrl: './restaurant-list.component.scss'
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];
  loading$: Observable<boolean>;
  
  searchForm: FormGroup;
  filterForm: FormGroup;
  
  cuisineFilters = [
    'Alle', 'Pizza', 'Italienisch', 'Chinesisch', 'Indisch', 
    'Japanisch', 'Mexikanisch', 'Türkisch', 'Fast Food', 'Café', 'Sushi'
  ];

  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loading$ = this.restaurantService.loading$;
    this.searchForm = this.fb.group({
      searchQuery: ['']
    });
    
    this.filterForm = this.fb.group({
      cuisine: ['Alle'],
      minRating: [0],
      maxDeliveryTime: [60],
      freeDelivery: [false]
    });
  }

  ngOnInit(): void {
    this.loadRestaurants();
    this.setupSearchAndFilters();
    
    // Subscribe to restaurants updates
    this.restaurantService.restaurants$.subscribe(restaurants => {
      this.restaurants = restaurants;
      this.applyFilters();
    });
  }

  /**
   * Load restaurants from Mock Service
   */
  loadRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe();
  }

  /**
   * Setup search and filter functionality
   */
  setupSearchAndFilters(): void {
    // Search on input change with debounce
    this.searchForm.get('searchQuery')?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(query => {
      this.searchRestaurants(query);
    });

    // Filter changes
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  /**
   * Search restaurants
   */
  searchRestaurants(query: string): void {
    if (query && query.trim()) {
      this.restaurantService.searchRestaurants(query.trim()).subscribe();
    } else {
      this.loadRestaurants();
    }
  }

  /**
   * Apply filters to restaurant list
   */
  applyFilters(): void {
    const filters = this.filterForm.value;
    
    this.filteredRestaurants = this.restaurants.filter(restaurant => {
      // Cuisine filter
      if (filters.cuisine !== 'Alle' && !restaurant.cuisine.includes(filters.cuisine)) {
        return false;
      }
      
      // Rating filter
      if (restaurant.rating < filters.minRating) {
        return false;
      }
      
      // Delivery time filter
      if (restaurant.deliveryTime > filters.maxDeliveryTime) {
        return false;
      }
      
      // Free delivery filter
      if (filters.freeDelivery && restaurant.deliveryFee > 0) {
        return false;
      }
      
      return true;
    });
  }

  /**
   * Clear all filters
   */
  clearFilters(): void {
    this.filterForm.reset({
      cuisine: 'Alle',
      minRating: 0,
      maxDeliveryTime: 60,
      freeDelivery: false
    });
    this.searchForm.reset();
    this.loadRestaurants();
  }

  openRestaurant(restaurant: Restaurant): void {
    this.router.navigate(['/restaurant', restaurant.id]);
  }

  generateStars(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);
    
    const stars: string[] = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('star');
    }
    
    if (hasHalfStar) {
      stars.push('star_half');
    }
    
    for (let i = 0; i < emptyStars; i++) {
      stars.push('star_border');
    }
    
    return stars;
  }
}