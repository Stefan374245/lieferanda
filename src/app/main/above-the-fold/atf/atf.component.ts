import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Restaurant } from '../../../models/restaurant.model';
import { CuisineCategory } from '../../../models/cuisine-category.model';
import { RestaurantService } from '../../../services/restaurant.service';
import { CuisineCategoryService } from '../../../services/cuisine-category.service';

@Component({
  selector: 'app-atf',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './atf.component.html',
  styleUrl: './atf.component.scss'
})
export class AtfComponent implements OnInit {
  searchControl = new FormControl('');
  featuredRestaurants: Restaurant[] = [];
  loading = true;
  cuisineCategories: CuisineCategory[] = [];
  restaurantCounts: { [categoryId: string]: number } = {};

  constructor(
    private router: Router,
    private restaurantService: RestaurantService,
    private cuisineCategoryService: CuisineCategoryService
  ) {}

  ngOnInit(): void {
    this.loadCuisineCategories();
    this.loadFeaturedRestaurants();
    this.loadRestaurantCounts();
  }

  loadCuisineCategories(): void {
    this.cuisineCategories = this.cuisineCategoryService.getAllCuisineCategories();
  }

  loadRestaurantCounts(): void {
    this.cuisineCategoryService.getRestaurantCountByCategory().subscribe({
      next: (counts) => {
        this.restaurantCounts = counts;
      },
      error: (error) => {
        console.error('Error loading restaurant counts:', error);
      }
    });
  }

  loadFeaturedRestaurants(): void {
    this.restaurantService.getFeaturedRestaurants().subscribe({
      next: (restaurants) => {
        this.featuredRestaurants = restaurants.slice(0, 6); // Show only 6 featured
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading featured restaurants:', error);
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    const searchTerm = this.searchControl.value;
    if (searchTerm && searchTerm.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: searchTerm.trim() } });
    }
  }

  goToRestaurants(): void {
    this.router.navigate(['/restaurants']);
  }

  searchByCuisine(categoryId: string): void {
    const category = this.cuisineCategoryService.getCuisineCategoryById(categoryId);
    if (category) {
      this.router.navigate(['/restaurants'], { queryParams: { cuisine: category.name } });
    }
  }

  openRestaurant(restaurant: Restaurant): void {
    this.router.navigate(['/restaurant', restaurant.id]);
  }
}
