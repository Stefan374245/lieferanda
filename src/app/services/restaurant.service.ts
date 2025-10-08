import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where } from '@angular/fire/firestore';
import { Observable, from, map, BehaviorSubject, of } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';
import { MockRestaurantService } from './mock-restaurant.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private restaurantsSubject = new BehaviorSubject<Restaurant[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  restaurants$ = this.restaurantsSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();

  constructor(
    private firestore: Firestore,
    private mockRestaurantService: MockRestaurantService
  ) { }

  // Get all restaurants (using Mock Service)
  getRestaurants(): Observable<Restaurant[]> {
    this.loadingSubject.next(true);
    
    return this.mockRestaurantService.getAllRestaurants().pipe(
      map(restaurants => {
        this.restaurantsSubject.next(restaurants);
        this.loadingSubject.next(false);
        return restaurants;
      })
    );
  }

  // Search restaurants
  searchRestaurants(query: string): Observable<Restaurant[]> {
    this.loadingSubject.next(true);
    
    return this.mockRestaurantService.searchRestaurants(query).pipe(
      map(restaurants => {
        this.restaurantsSubject.next(restaurants);
        this.loadingSubject.next(false);
        return restaurants;
      })
    );
  }

  // Get restaurants by cuisine with proper handling
  getRestaurantsByCuisine(cuisine: string): Observable<Restaurant[]> {
    this.loadingSubject.next(true);
    
    // If "Alle" is selected, get all restaurants
    if (cuisine === 'Alle') {
      return this.mockRestaurantService.getAllRestaurants().pipe(
        map(restaurants => {
          this.restaurantsSubject.next(restaurants);
          this.loadingSubject.next(false);
          return restaurants;
        })
      );
    }
    
    return this.mockRestaurantService.filterByCuisine(cuisine).pipe(
      map(restaurants => {
        this.restaurantsSubject.next(restaurants);
        this.loadingSubject.next(false);
        return restaurants;
      })
    );
  }

  // Get featured restaurants
  getFeaturedRestaurants(): Observable<Restaurant[]> {
    return this.mockRestaurantService.getFeaturedRestaurants();
  }

  // Get single restaurant
  getRestaurant(id: string): Observable<Restaurant | null> {
    return this.mockRestaurantService.getRestaurantById(id);
  }

  // Get restaurants with filters
  getRestaurantsWithFilters(filters: {
    cuisine?: string;
    minRating?: number;
    maxDeliveryFee?: number;
    maxDeliveryTime?: number;
    isOpen?: boolean;
  }): Observable<Restaurant[]> {
    this.loadingSubject.next(true);
    
    return this.mockRestaurantService.getRestaurantsWithFilters(filters).pipe(
      map(restaurants => {
        this.restaurantsSubject.next(restaurants);
        this.loadingSubject.next(false);
        return restaurants;
      })
    );
  }

  // Firebase methods (keep for future use)
  addRestaurant(restaurant: Omit<Restaurant, 'id'>): Observable<string> {
    const restaurantsRef = collection(this.firestore, 'restaurants');
    return from(addDoc(restaurantsRef, restaurant)).pipe(
      map(docRef => docRef.id)
    );
  }

  updateRestaurant(id: string, restaurant: Partial<Restaurant>): Observable<void> {
    const restaurantRef = doc(this.firestore, 'restaurants', id);
    return from(updateDoc(restaurantRef, restaurant));
  }

  deleteRestaurant(id: string): Observable<void> {
    const restaurantRef = doc(this.firestore, 'restaurants', id);
    return from(deleteDoc(restaurantRef));
  }
}