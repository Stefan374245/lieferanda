import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where, orderBy } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { Dish, DishCategory } from '../models/dish.model';
import { MockDishService } from './mock-dish.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(
    private firestore: Firestore,
    private mockDishService: MockDishService
  ) { }

  // Get all dishes (using Mock Service)
  getDishes(): Observable<Dish[]> {
    return this.mockDishService.getDishes();
  }

  // Get dishes by restaurant (using Mock Service)
  getDishesByRestaurant(restaurantId: string): Observable<Dish[]> {
    return this.mockDishService.getDishesByRestaurant(restaurantId);
  }

  // Get dishes by category (using Mock Service)
  getDishesByCategory(category: DishCategory): Observable<Dish[]> {
    return this.mockDishService.getDishesByCategory(category);
  }

  // Get single dish (using Mock Service)
  getDish(id: string): Observable<Dish | null> {
    return this.mockDishService.getDish(id);
  }

  // Search dishes (using Mock Service)
  searchDishes(searchTerm: string): Observable<Dish[]> {
    return this.mockDishService.searchDishes(searchTerm);
  }

  // Firebase methods (keep for future use)
  addDish(dish: Omit<Dish, 'id'>): Observable<string> {
    const dishesRef = collection(this.firestore, 'dishes');
    return from(addDoc(dishesRef, dish)).pipe(
      map(docRef => docRef.id)
    );
  }

  updateDish(id: string, dish: Partial<Dish>): Observable<void> {
    const dishRef = doc(this.firestore, 'dishes', id);
    return from(updateDoc(dishRef, dish));
  }

  deleteDish(id: string): Observable<void> {
    const dishRef = doc(this.firestore, 'dishes', id);
    return from(deleteDoc(dishRef));
  }
}