import { Injectable } from '@angular/core';
import { Observable, of, delay, map, forkJoin } from 'rxjs';
import { Dish, DishCategory } from '../models/dish.model';
import { SpanishDishService } from './spanish-dish.service';
import { GermanDishService } from './german-dish.service';

export interface MockDishData {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: DishCategory;
  rating: number;
  preparationTime: number;
  ingredients: string[];
  allergens: string[];
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isAvailable: boolean;
  restaurantId: string;
  cuisine: string; // To categorize by restaurant cuisine
}

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private mockDishes: MockDishData[] = [
    // Italienische Gerichte
    {
      id: '1',
      name: 'Margherita Pizza',
      description: 'Klassische Pizza mit Tomaten, Mozzarella und frischem Basilikum',
      price: 12.50,
      image: 'assets/img/images/dishes-img/pizza-margherita.jpg',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.7,
      preparationTime: 15,
      ingredients: ['Tomatensauce', 'Mozzarella', 'Basilikum', 'Olivenöl'],
      allergens: ['Gluten', 'Milch'],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '1',
      cuisine: 'Italienisch'
    },
    {
      id: '2',
      name: 'Spaghetti Carbonara',
      description: 'Cremige Pasta mit Speck, Ei und Parmesan',
      price: 14.90,
      image: 'assets/img/images/dishes-img/spaghetti-carbonara.jpg',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.8,
      preparationTime: 20,
      ingredients: ['Spaghetti', 'Speck', 'Ei', 'Parmesan', 'Sahne'],
      allergens: ['Gluten', 'Milch', 'Ei'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '10',
      cuisine: 'Italienisch'
    },
    {
      id: '3',
      name: 'Bruschetta',
      description: 'Geröstetes Brot mit Tomaten, Knoblauch und Basilikum',
      price: 8.50,
      image: 'assets/img/images/dishes-img/bruschetta.jpg',
      category: DishCategory.VORSPEISEN,
      rating: 4.5,
      preparationTime: 10,
      ingredients: ['Brot', 'Tomaten', 'Knoblauch', 'Basilikum', 'Olivenöl'],
      allergens: ['Gluten'],
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '1',
      cuisine: 'Italienisch'
    },

    // Asiatische Gerichte
    {
      id: '4',
      name: 'Kung Pao Huhn',
      description: 'Scharfes Huhn mit Erdnüssen und Gemüse im Wok gebraten',
      price: 16.80,
      image: 'assets/img/images/dishes-img/kung-pao.jpg',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.6,
      preparationTime: 25,
      ingredients: ['Hühnchen', 'Erdnüsse', 'Paprika', 'Chili', 'Sojasauce'],
      allergens: ['Nüsse', 'Soja'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '2',
      cuisine: 'Asiatisch'
    },
    {
      id: '5',
      name: 'Sushi Set',
      description: 'Gemischtes Sushi mit Lachs, Thunfisch und Garnelen',
      price: 22.90,
      image: 'assets/img/images/dishes-img/sushi-set.jpg',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.9,
      preparationTime: 30,
      ingredients: ['Sushi-Reis', 'Lachs', 'Thunfisch', 'Garnelen', 'Nori', 'Wasabi'],
      allergens: ['Fisch', 'Krustentiere'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '6',
      cuisine: 'Asiatisch'
    },
    {
      id: '6',
      name: 'Pad Thai',
      description: 'Traditionelle thailändische Nudeln mit Garnelen und Erdnüssen',
      price: 15.50,
      image: 'assets/img/images/dishes-img/pad-thai.jpg',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.7,
      preparationTime: 20,
      ingredients: ['Reisnudeln', 'Garnelen', 'Erdnüsse', 'Sojasprossen', 'Limette'],
      allergens: ['Krustentiere', 'Nüsse', 'Soja'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '11',
      cuisine: 'Asiatisch'
    },

    // Spanische Gerichte
    {
      id: '7',
      name: 'Patatas Bravas',
      description: 'Würzige Kartoffeln mit scharfer Tomatensauce',
      price: 9.80,
      image: 'assets/img/images/tapas-img/patatas-bravas.jpg',
      category: DishCategory.TAPAS,
      rating: 4.4,
      preparationTime: 15,
      ingredients: ['Kartoffeln', 'Tomatensauce', 'Paprika', 'Knoblauch'],
      allergens: [],
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '3',
      cuisine: 'Spanisch'
    },
    {
      id: '8',
      name: 'Gambas al Ajillo',
      description: 'Garnelen in Knoblauchöl mit Chili',
      price: 14.50,
      image: 'assets/img/images/tapas-img/gambas-ajillo.jpg',
      category: DishCategory.TAPAS,
      rating: 4.8,
      preparationTime: 12,
      ingredients: ['Garnelen', 'Knoblauch', 'Olivenöl', 'Chili', 'Petersilie'],
      allergens: ['Krustentiere'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '3',
      cuisine: 'Spanisch'
    },
    {
      id: '9',
      name: 'Paella Valenciana',
      description: 'Traditionelle Paella mit Huhn, Kaninchen und Gemüse',
      price: 18.90,
      image: 'assets/img/images/dishes-img/paella.jpg',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.6,
      preparationTime: 45,
      ingredients: ['Bomba-Reis', 'Huhn', 'Kaninchen', 'Bohnen', 'Safran'],
      allergens: [],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '3',
      cuisine: 'Spanisch'
    },

    // Deutsche Gerichte
    {
      id: '10',
      name: 'Schnitzel Wiener Art',
      description: 'Paniertes Kalbsschnitzel mit Zitrone',
      price: 16.50,
      image: 'assets/img/images/dishes-img/schnitzel.jpg',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.5,
      preparationTime: 25,
      ingredients: ['Kalbsfleisch', 'Paniermehl', 'Ei', 'Mehl', 'Zitrone'],
      allergens: ['Gluten', 'Ei'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '5',
      cuisine: 'Deutsch'
    },
    {
      id: '11',
      name: 'Currywurst',
      description: 'Bratwurst mit Curry-Ketchup und Pommes',
      price: 8.90,
      image: 'assets/img/images/dishes-img/currywurst.jpg',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.2,
      preparationTime: 15,
      ingredients: ['Bratwurst', 'Curry-Ketchup', 'Pommes', 'Zwiebeln'],
      allergens: ['Gluten'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '5',
      cuisine: 'Deutsch'
    },
    {
      id: '12',
      name: 'Döner Kebab',
      description: 'Türkisches Fladenbrot mit Fleisch und Salat',
      price: 6.50,
      image: 'assets/img/images/dishes-img/doener.jpg',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.3,
      preparationTime: 10,
      ingredients: ['Fladenbrot', 'Hähnchenfleisch', 'Salat', 'Zwiebeln', 'Joghurtsauce'],
      allergens: ['Gluten', 'Milch'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '7',
      cuisine: 'Deutsch'
    },

    // Getränke
    {
      id: '13',
      name: 'Coca Cola',
      description: 'Erfrischende Cola 0,33l',
      price: 2.50,
      image: 'assets/img/images/drinks-img/cola.jpg',
      category: DishCategory.GETRAENKE,
      rating: 4.0,
      preparationTime: 2,
      ingredients: ['Wasser', 'Zucker', 'Kohlensäure', 'Koffein'],
      allergens: [],
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '1',
      cuisine: 'Italienisch'
    },
    {
      id: '14',
      name: 'Grüner Tee',
      description: 'Traditioneller japanischer Grüntee',
      price: 3.80,
      image: 'assets/img/images/drinks-img/green-tea.jpg',
      category: DishCategory.GETRAENKE,
      rating: 4.6,
      preparationTime: 5,
      ingredients: ['Grüner Tee', 'Heißes Wasser'],
      allergens: [],
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '6',
      cuisine: 'Asiatisch'
    },

    // Nachspeisen
    {
      id: '15',
      name: 'Tiramisu',
      description: 'Italienisches Dessert mit Mascarpone und Kaffee',
      price: 6.90,
      image: 'assets/img/images/postre-img/tiramisu.jpg',
      category: DishCategory.NACHSPEISE,
      rating: 4.8,
      preparationTime: 5,
      ingredients: ['Mascarpone', 'Löffelbiskuits', 'Espresso', 'Kakao', 'Ei'],
      allergens: ['Milch', 'Ei', 'Gluten'],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '1',
      cuisine: 'Italienisch'
    },
    {
      id: '16',
      name: 'Mochi Eis',
      description: 'Japanisches Reiskuchen-Eis in verschiedenen Geschmacksrichtungen',
      price: 5.50,
      image: 'assets/img/images/postre-img/mochi.jpg',
      category: DishCategory.NACHSPEISE,
      rating: 4.7,
      preparationTime: 2,
      ingredients: ['Reismehl', 'Eis', 'Zucker', 'Natürliche Aromen'],
      allergens: ['Milch'],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '6',
      cuisine: 'Asiatisch'
    },
    {
      id: '17',
      name: 'Churros',
      description: 'Spanische Süßspeise mit Zimt und Schokoladensauce',
      price: 4.80,
      image: 'assets/img/images/postre-img/churros.jpg',
      category: DishCategory.NACHSPEISE,
      rating: 4.5,
      preparationTime: 10,
      ingredients: ['Mehl', 'Wasser', 'Salz', 'Zimt', 'Schokolade'],
      allergens: ['Gluten', 'Milch'],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '3',
      cuisine: 'Spanisch'
    },
    {
      id: '18',
      name: 'Apfelstrudel',
      description: 'Traditioneller österreichischer Apfelstrudel mit Vanillesauce',
      price: 5.90,
      image: 'assets/img/images/postre-img/apfelstrudel.jpg',
      category: DishCategory.NACHSPEISE,
      rating: 4.4,
      preparationTime: 8,
      ingredients: ['Äpfel', 'Blätterteig', 'Zimt', 'Zucker', 'Vanillesauce'],
      allergens: ['Gluten', 'Milch'],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '5',
      cuisine: 'Deutsch'
    }
  ];

  constructor(
    private spanishDishService: SpanishDishService,
    private germanDishService: GermanDishService
  ) { }

  /**
   * Get all dishes (including Spanish and German dishes)
   */
  getAllDishes(): Observable<Dish[]> {
    return forkJoin({
      generalDishes: of(this.mockDishes.map(dish => this.transformToDish(dish))),
      spanishDishes: this.spanishDishService.getAllSpanishDishes(),
      germanDishes: this.germanDishService.getAllGermanDishes()
    }).pipe(
      map(result => [...result.generalDishes, ...result.spanishDishes, ...result.germanDishes]),
      delay(300)
    );
  }

  /**
   * Search dishes by query (including Spanish and German dishes)
   */
  searchDishes(query: string): Observable<Dish[]> {
    const searchTerm = query.toLowerCase();
    
    const filteredGeneralDishes = this.mockDishes.filter(dish => 
      dish.name.toLowerCase().includes(searchTerm) ||
      dish.description.toLowerCase().includes(searchTerm) ||
      dish.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm)) ||
      dish.cuisine.toLowerCase().includes(searchTerm) ||
      dish.category.toLowerCase().includes(searchTerm)
    );

    return forkJoin({
      generalDishes: of(filteredGeneralDishes.map(dish => this.transformToDish(dish))),
      spanishDishes: this.spanishDishService.searchSpanishDishes(query),
      germanDishes: this.germanDishService.searchGermanDishes(query)
    }).pipe(
      map(result => [...result.generalDishes, ...result.spanishDishes, ...result.germanDishes]),
      delay(300)
    );
  }

  /**
   * Filter dishes by category
   */
  getDishesByCategory(category: DishCategory): Observable<Dish[]> {
    const filteredDishes = this.mockDishes.filter(dish => dish.category === category);
    
    return of(filteredDishes.map(dish => this.transformToDish(dish))).pipe(
      delay(300)
    );
  }

  /**
   * Filter dishes by cuisine type
   */
  getDishesByCuisine(cuisine: string): Observable<Dish[]> {
    const filteredDishes = this.mockDishes.filter(dish => 
      dish.cuisine.toLowerCase() === cuisine.toLowerCase()
    );
    
    return of(filteredDishes.map(dish => this.transformToDish(dish))).pipe(
      delay(300)
    );
  }

  /**
   * Get dishes by restaurant ID (including Spanish and German dishes)
   */
  getDishesByRestaurant(restaurantId: string): Observable<Dish[]> {
    const filteredGeneralDishes = this.mockDishes.filter(dish => dish.restaurantId === restaurantId);
    
    return forkJoin({
      generalDishes: of(filteredGeneralDishes.map(dish => this.transformToDish(dish))),
      spanishDishes: this.spanishDishService.getDishesByRestaurant(restaurantId),
      germanDishes: this.germanDishService.getDishesByRestaurant(restaurantId)
    }).pipe(
      map(result => [...result.generalDishes, ...result.spanishDishes, ...result.germanDishes]),
      delay(300)
    );
  }

  /**
   * Get dish by ID
   */
  getDishById(id: string): Observable<Dish | null> {
    const dish = this.mockDishes.find(dish => dish.id === id);
    
    return of(dish ? this.transformToDish(dish) : null).pipe(
      delay(300)
    );
  }

  /**
   * Get featured dishes (top rated)
   */
  getFeaturedDishes(limit: number = 10): Observable<Dish[]> {
    const featuredDishes = this.mockDishes
      .filter(dish => dish.isAvailable && dish.rating >= 4.5)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
    
    return of(featuredDishes.map(dish => this.transformToDish(dish))).pipe(
      delay(300)
    );
  }

  /**
   * Get dishes with filters
   */
  getDishesWithFilters(filters: {
    category?: DishCategory;
    cuisine?: string;
    restaurantId?: string;
    minRating?: number;
    maxPrice?: number;
    isVegetarian?: boolean;
    isVegan?: boolean;
    isGlutenFree?: boolean;
    isAvailable?: boolean;
  }): Observable<Dish[]> {
    let filteredDishes = [...this.mockDishes];

    if (filters.category) {
      filteredDishes = filteredDishes.filter(dish => dish.category === filters.category);
    }

    if (filters.cuisine) {
      filteredDishes = filteredDishes.filter(dish => 
        dish.cuisine.toLowerCase() === filters.cuisine!.toLowerCase()
      );
    }

    if (filters.restaurantId) {
      filteredDishes = filteredDishes.filter(dish => dish.restaurantId === filters.restaurantId);
    }

    if (filters.minRating !== undefined) {
      filteredDishes = filteredDishes.filter(dish => dish.rating >= filters.minRating!);
    }

    if (filters.maxPrice !== undefined) {
      filteredDishes = filteredDishes.filter(dish => dish.price <= filters.maxPrice!);
    }

    if (filters.isVegetarian !== undefined) {
      filteredDishes = filteredDishes.filter(dish => dish.isVegetarian === filters.isVegetarian);
    }

    if (filters.isVegan !== undefined) {
      filteredDishes = filteredDishes.filter(dish => dish.isVegan === filters.isVegan);
    }

    if (filters.isGlutenFree !== undefined) {
      filteredDishes = filteredDishes.filter(dish => dish.isGlutenFree === filters.isGlutenFree);
    }

    if (filters.isAvailable !== undefined) {
      filteredDishes = filteredDishes.filter(dish => dish.isAvailable === filters.isAvailable);
    }

    return of(filteredDishes.map(dish => this.transformToDish(dish))).pipe(
      delay(300)
    );
  }

  /**
   * Get dishes grouped by category
   */
  getDishesByCategories(): Observable<{ [category: string]: Dish[] }> {
    const groupedDishes: { [category: string]: Dish[] } = {};
    
    Object.values(DishCategory).forEach(category => {
      groupedDishes[category] = this.mockDishes
        .filter(dish => dish.category === category)
        .map(dish => this.transformToDish(dish));
    });

    return of(groupedDishes).pipe(delay(300));
  }

  /**
   * Transform mock data to Dish model
   */
  private transformToDish(mockDish: MockDishData): Dish {
    return {
      id: mockDish.id,
      name: mockDish.name,
      description: mockDish.description,
      price: mockDish.price,
      image: mockDish.image,
      category: mockDish.category,
      rating: mockDish.rating,
      preparationTime: mockDish.preparationTime,
      ingredients: mockDish.ingredients,
      allergens: mockDish.allergens,
      isVegetarian: mockDish.isVegetarian,
      isVegan: mockDish.isVegan,
      isGlutenFree: mockDish.isGlutenFree,
      isAvailable: mockDish.isAvailable,
      restaurantId: mockDish.restaurantId
    };
  }
}