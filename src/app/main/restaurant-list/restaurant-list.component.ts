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
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import { Restaurant } from '../../models/restaurant.model';
import { CuisineCategory } from '../../models/cuisine-category.model';
import { RestaurantService } from '../../services/restaurant.service';
import { CuisineCategoryService } from '../../services/cuisine-category.service';

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
  
  cuisineCategories: CuisineCategory[] = [];
  cuisineFilters: string[] = [];
  
  selectedCuisine = 'Alle';

  constructor(
    private restaurantService: RestaurantService,
    private cuisineCategoryService: CuisineCategoryService,
    private router: Router,
    private route: ActivatedRoute,
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
    this.initializeCuisineFilters();
    
    // Check for query parameters first
    this.route.queryParams.subscribe(params => {
      if (params['cuisine']) {
        this.filterForm.patchValue({ cuisine: params['cuisine'] });
      }
    });

    this.loadRestaurants();
    this.setupSearchAndFilters();
    
    // Subscribe to restaurants updates
    this.restaurantService.restaurants$.subscribe(restaurants => {
      this.restaurants = restaurants;
      this.applyFilters();
    });
  }

  /**
   * Initialize cuisine filters from CuisineCategoryService
   */
  initializeCuisineFilters(): void {
    this.cuisineCategories = this.cuisineCategoryService.getAllCuisineCategories();
    this.cuisineFilters = ['Alle', ...this.cuisineCategories.map(cat => cat.name)];
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
    this.filterForm.valueChanges.subscribe((changes) => {
      console.log('Filter form changes:', changes);
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
    console.log('Applying filters:', filters);
    
    // Start with all restaurants
    let filtered = [...this.restaurants];
    
    // If a specific cuisine is selected and not 'Alle'
    if (filters.cuisine && filters.cuisine !== 'Alle') {
      console.log('Filtering by cuisine:', filters.cuisine);
      // Filter restaurants by cuisine
      filtered = filtered.filter(restaurant => {
        const matches = restaurant.cuisine.includes(filters.cuisine);
        console.log(`Restaurant ${restaurant.name} cuisine: ${restaurant.cuisine}, matches ${filters.cuisine}: ${matches}`);
        return matches;
      });
    }
    
    // Rating filter
    if (filters.minRating > 0) {
      filtered = filtered.filter(restaurant => restaurant.rating >= filters.minRating);
    }
    
    // Delivery time filter
    if (filters.maxDeliveryTime < 90) {
      filtered = filtered.filter(restaurant => restaurant.deliveryTime <= filters.maxDeliveryTime);
    }
    
    // Free delivery filter
    if (filters.freeDelivery) {
      filtered = filtered.filter(restaurant => restaurant.deliveryFee === 0);
    }
    
    console.log(`Filtered restaurants: ${filtered.length} of ${this.restaurants.length}`);
    this.filteredRestaurants = filtered;
  }

  /**
   * Filter by cuisine type
   */
  filterByCuisine(cuisine: string): void {
    this.filterForm.patchValue({ cuisine: cuisine });
    if (cuisine === 'Alle') {
      this.loadRestaurants();
    } else {
      this.restaurantService.getRestaurantsByCuisine(cuisine).subscribe();
    }
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