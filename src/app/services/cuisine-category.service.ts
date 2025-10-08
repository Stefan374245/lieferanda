import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';
import { CuisineCategory, SupportedCuisines, CUISINE_MAPPING } from '../models/cuisine-category.model';
import { RestaurantService } from './restaurant.service';

@Injectable({
  providedIn: 'root'
})
export class CuisineCategoryService {

  // Definierte Küchenkategorien für die ATF Section
  private cuisineCategories: CuisineCategory[] = [
    {
      id: SupportedCuisines.ITALIENISCH,
      name: CUISINE_MAPPING[SupportedCuisines.ITALIENISCH],
      displayName: 'Italienisch',
      icon: 'local_pizza',
      color: '#00B04F',
      description: 'Pizza, Pasta & mehr'
    },
    {
      id: SupportedCuisines.ASIATISCH,
      name: CUISINE_MAPPING[SupportedCuisines.ASIATISCH],
      displayName: 'Asiatisch',
      icon: 'ramen_dining',
      color: '#FF6B35',
      description: 'Sushi, Wok & Currys'
    },
    {
      id: SupportedCuisines.SPANISCH,
      name: CUISINE_MAPPING[SupportedCuisines.SPANISCH],
      displayName: 'Spanisch',
      icon: 'restaurant',
      color: '#FFD60A',
      description: 'Tapas & Paella'
    },
    {
      id: SupportedCuisines.DEUTSCH,
      name: CUISINE_MAPPING[SupportedCuisines.DEUTSCH],
      displayName: 'Deutsch',
      icon: 'lunch_dining',
      color: '#003049',
      description: 'Hausmannskost & mehr'
    }
  ];

  constructor(private restaurantService: RestaurantService) { }

  /**
   * Gibt alle verfügbaren Küchenkategorien zurück
   */
  getAllCuisineCategories(): CuisineCategory[] {
    return this.cuisineCategories;
  }

  /**
   * Gibt eine spezifische Küchenkategorie anhand der ID zurück
   */
  getCuisineCategoryById(id: string): CuisineCategory | undefined {
    return this.cuisineCategories.find(category => category.id === id);
  }

  /**
   * Gibt eine spezifische Küchenkategorie anhand des Namens zurück
   */
  getCuisineCategoryByName(name: string): CuisineCategory | undefined {
    return this.cuisineCategories.find(category => category.name === name);
  }

  /**
   * Filtert Restaurants nach einer spezifischen Küchenkategorie
   */
  getRestaurantsByCuisineCategory(categoryId: string): Observable<Restaurant[]> {
    const category = this.getCuisineCategoryById(categoryId);
    
    if (!category) {
      throw new Error(`Cuisine category with id '${categoryId}' not found`);
    }

    return this.restaurantService.getRestaurantsByCuisine(category.name);
  }

  /**
   * Gibt Restaurants für alle definierten Küchenkategorien zurück
   * Gruppiert nach Kategorie
   */
  getRestaurantsByAllCategories(): Observable<{ [categoryId: string]: Restaurant[] }> {
    return this.restaurantService.getRestaurants().pipe(
      map(allRestaurants => {
        const groupedRestaurants: { [categoryId: string]: Restaurant[] } = {};
        
        this.cuisineCategories.forEach(category => {
          groupedRestaurants[category.id] = allRestaurants.filter(restaurant => 
            restaurant.cuisine.includes(category.name)
          );
        });
        
        return groupedRestaurants;
      })
    );
  }

  /**
   * Sucht Restaurants in allen Kategorien basierend auf Suchbegriff
   */
  searchRestaurantsInCategories(searchTerm: string): Observable<{ [categoryId: string]: Restaurant[] }> {
    return this.restaurantService.searchRestaurants(searchTerm).pipe(
      map(searchResults => {
        const groupedResults: { [categoryId: string]: Restaurant[] } = {};
        
        this.cuisineCategories.forEach(category => {
          groupedResults[category.id] = searchResults.filter(restaurant => 
            restaurant.cuisine.includes(category.name)
          );
        });
        
        return groupedResults;
      })
    );
  }

  /**
   * Gibt die Anzahl der Restaurants pro Kategorie zurück
   */
  getRestaurantCountByCategory(): Observable<{ [categoryId: string]: number }> {
    return this.getRestaurantsByAllCategories().pipe(
      map(groupedRestaurants => {
        const counts: { [categoryId: string]: number } = {};
        
        Object.keys(groupedRestaurants).forEach(categoryId => {
          counts[categoryId] = groupedRestaurants[categoryId].length;
        });
        
        return counts;
      })
    );
  }

  /**
   * Filtert Restaurants nach mehreren Kategorien
   */
  getRestaurantsByMultipleCategories(categoryIds: string[]): Observable<Restaurant[]> {
    const categoryNames = categoryIds
      .map(id => this.getCuisineCategoryById(id)?.name)
      .filter(name => name !== undefined) as string[];

    return this.restaurantService.getRestaurants().pipe(
      map(allRestaurants => {
        return allRestaurants.filter(restaurant => 
          restaurant.cuisine.some(cuisine => categoryNames.includes(cuisine))
        );
      })
    );
  }

  /**
   * Gibt die beliebtesten Restaurants pro Kategorie zurück (nach Rating sortiert)
   */
  getTopRestaurantsByCategory(limit: number = 5): Observable<{ [categoryId: string]: Restaurant[] }> {
    return this.getRestaurantsByAllCategories().pipe(
      map(groupedRestaurants => {
        const topRestaurants: { [categoryId: string]: Restaurant[] } = {};
        
        Object.keys(groupedRestaurants).forEach(categoryId => {
          topRestaurants[categoryId] = groupedRestaurants[categoryId]
            .sort((a, b) => b.rating - a.rating)
            .slice(0, limit);
        });
        
        return topRestaurants;
      })
    );
  }

  /**
   * Prüft ob eine Küchenkategorie verfügbar ist
   */
  isCategorySupportedId(categoryId: string): boolean {
    return this.cuisineCategories.some(category => category.id === categoryId);
  }

  /**
   * Prüft ob eine Küchenkategorie verfügbar ist (nach Name)
   */
  isCategorySupportedName(categoryName: string): boolean {
    return this.cuisineCategories.some(category => category.name === categoryName);
  }
}