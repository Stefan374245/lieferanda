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
import { RestaurantService } from '../../../services/restaurant.service';

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

  cuisineTypes = [
    { name: 'Spanisch', icon: 'restaurant', image: 'assets/img/images/cuisine/spanish.jpg' },
    { name: 'Italienisch', icon: 'local_pizza', image: 'assets/img/images/cuisine/italian.jpg' },
    { name: 'Asiatisch', icon: 'ramen_dining', image: 'assets/img/images/cuisine/asian.jpg' },
    { name: 'Deutsch', icon: 'lunch_dining', image: 'assets/img/images/cuisine/german.jpg' }
  ];

  constructor(
    private router: Router,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit(): void {
    this.loadFeaturedRestaurants();
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

  searchByCuisine(cuisineType: string): void {
    this.router.navigate(['/restaurants'], { queryParams: { cuisine: cuisineType } });
  }

  openRestaurant(restaurant: Restaurant): void {
    this.router.navigate(['/restaurant', restaurant.id]);
  }
}
