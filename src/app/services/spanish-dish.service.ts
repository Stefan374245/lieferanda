import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import { Dish, DishCategory } from '../models/dish.model';

export interface SpanishDishData {
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
  tapasSize?: 'pequeña' | 'mediana' | 'grande'; // Für Tapas-Größen
  spiceLevel?: 'mild' | 'medium' | 'hot'; // Schärfegrad
  regionOrigin?: string; // Herkunftsregion in Spanien
}

@Injectable({
  providedIn: 'root'
})
export class SpanishDishService {

  private spanishDishes: SpanishDishData[] = [
    // TAPAS - Basierend auf verfügbaren Bildern
    {
      id: 'sp-1',
      name: 'Patatas Bravas',
      description: 'Knusprige Kartoffelwürfel mit pikanter Bravas-Sauce und Aioli',
      price: 7.50,
      image: 'assets/img/images/dishes-img/patatasBravas.jpg',
      category: DishCategory.TAPAS,
      rating: 4.6,
      preparationTime: 15,
      ingredients: ['Kartoffeln', 'Tomaten', 'Knoblauch', 'Paprika', 'Olivenöl', 'Chili'],
      allergens: ['Ei'],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '3',
      tapasSize: 'mediana',
      spiceLevel: 'medium',
      regionOrigin: 'Madrid'
    },
    {
      id: 'sp-2',
      name: 'Gambas al Ajillo',
      description: 'Garnelen in heißem Knoblauchöl mit Chili und Petersilie',
      price: 12.90,
      image: 'assets/img/images/tapas-img/gambas2.jpg',
      category: DishCategory.TAPAS,
      rating: 4.8,
      preparationTime: 10,
      ingredients: ['Garnelen', 'Knoblauch', 'Olivenöl', 'Chili', 'Petersilie', 'Weißwein'],
      allergens: ['Krustentiere'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '3',
      tapasSize: 'mediana',
      spiceLevel: 'medium',
      regionOrigin: 'Andalusien'
    },
    {
      id: 'sp-3',
      name: 'Croquetas de Jamón',
      description: 'Cremige Schinken-Kroketten mit Bechamel und Serrano-Schinken',
      price: 8.90,
      image: 'assets/img/images/tapas-img/croquetas.jpg',
      category: DishCategory.TAPAS,
      rating: 4.7,
      preparationTime: 20,
      ingredients: ['Serrano-Schinken', 'Milch', 'Mehl', 'Butter', 'Paniermehl', 'Ei'],
      allergens: ['Gluten', 'Milch', 'Ei'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '15',
      tapasSize: 'pequeña',
      spiceLevel: 'mild',
      regionOrigin: 'Madrid'
    },
    {
      id: 'sp-4',
      name: 'Tortilla Española',
      description: 'Klassisches spanisches Kartoffel-Omelett mit Zwiebeln',
      price: 6.50,
      image: 'assets/img/images/tapas-img/Tortilla Española.jpg',
      category: DishCategory.TAPAS,
      rating: 4.5,
      preparationTime: 25,
      ingredients: ['Kartoffeln', 'Eier', 'Zwiebeln', 'Olivenöl', 'Salz'],
      allergens: ['Ei'],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '18',
      tapasSize: 'mediana',
      spiceLevel: 'mild',
      regionOrigin: 'Valencia'
    },
    {
      id: 'sp-5',
      name: 'Pulpo a la Gallega',
      description: 'Galicischer Oktopus mit Paprika, Kartoffeln und Olivenöl',
      price: 14.50,
      image: 'assets/img/images/tapas-img/PulpoalaGallega.jpg',
      category: DishCategory.TAPAS,
      rating: 4.9,
      preparationTime: 35,
      ingredients: ['Oktopus', 'Kartoffeln', 'Paprika', 'grobes Meersalz', 'Olivenöl'],
      allergens: ['Weichtiere'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '17',
      tapasSize: 'grande',
      spiceLevel: 'mild',
      regionOrigin: 'Galicien'
    },
    {
      id: 'sp-6',
      name: 'Pimientos de Padrón',
      description: 'Gebratene grüne Paprika aus Padrón mit grobem Meersalz',
      price: 5.90,
      image: 'assets/img/images/tapas-img/pimientos-de-padron-4417710_640.jpg',
      category: DishCategory.TAPAS,
      rating: 4.4,
      preparationTime: 8,
      ingredients: ['Pimientos de Padrón', 'grobes Meersalz', 'Olivenöl'],
      allergens: [],
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '15',
      tapasSize: 'pequeña',
      spiceLevel: 'mild',
      regionOrigin: 'Galicien'
    },
    {
      id: 'sp-7',
      name: 'Chorizo al Vino',
      description: 'Würzige Chorizo-Wurst in Rotwein gebraten',
      price: 9.80,
      image: 'assets/img/images/tapas-img/chorizo-7173983_640.jpg',
      category: DishCategory.TAPAS,
      rating: 4.6,
      preparationTime: 12,
      ingredients: ['Chorizo', 'Rotwein', 'Knoblauch', 'Lorbeerblätter'],
      allergens: [],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '17',
      tapasSize: 'mediana',
      spiceLevel: 'medium',
      regionOrigin: 'Extremadura'
    },
    {
      id: 'sp-8',
      name: 'Ensalada Rusa',
      description: 'Russischer Salat auf spanische Art mit Thunfisch und Eiern',
      price: 7.20,
      image: 'assets/img/images/tapas-img/EnsaladaRusa.jpg',
      category: DishCategory.TAPAS,
      rating: 4.2,
      preparationTime: 15,
      ingredients: ['Kartoffeln', 'Karotten', 'Erbsen', 'Thunfisch', 'Eier', 'Mayonnaise'],
      allergens: ['Fisch', 'Ei'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '18',
      tapasSize: 'mediana',
      spiceLevel: 'mild',
      regionOrigin: 'Madrid'
    },

    // HAUPTSPEISEN
    {
      id: 'sp-9',
      name: 'Paella Valenciana',
      description: 'Traditionelle Paella aus Valencia mit Huhn, Kaninchen und Gemüse',
      price: 22.50,
      image: 'assets/img/images/dishes-img/paella.png',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.8,
      preparationTime: 45,
      ingredients: ['Bomba-Reis', 'Huhn', 'Kaninchen', 'grüne Bohnen', 'Garrofó-Bohnen', 'Safran', 'Rosmarin'],
      allergens: [],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '16',
      spiceLevel: 'mild',
      regionOrigin: 'Valencia'
    },
    {
      id: 'sp-10',
      name: 'Fideuà',
      description: 'Valencianische Nudel-Paella mit Meeresfrüchten',
      price: 19.90,
      image: 'assets/img/images/dishes-img/Fideuà.jpg',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.7,
      preparationTime: 40,
      ingredients: ['Fideuà-Nudeln', 'Garnelen', 'Tintenfisch', 'Muscheln', 'Safran', 'Fischfond'],
      allergens: ['Gluten', 'Krustentiere', 'Weichtiere'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '16',
      spiceLevel: 'mild',
      regionOrigin: 'Valencia'
    },
    {
      id: 'sp-11',
      name: 'Albóndigas en Salsa',
      description: 'Spanische Fleischbällchen in würziger Tomatensauce',
      price: 16.80,
      image: 'assets/img/images/dishes-img/albondigas.jpg',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.5,
      preparationTime: 30,
      ingredients: ['Rind- und Schweinehack', 'Zwiebeln', 'Knoblauch', 'Tomaten', 'Weißwein', 'Petersilie'],
      allergens: ['Gluten', 'Ei'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '15',
      spiceLevel: 'medium',
      regionOrigin: 'Kastilien'
    },
    {
      id: 'sp-12',
      name: 'Pisto Manchego',
      description: 'Gemüseeintopf aus La Mancha mit Auberginen, Zucchini und Paprika',
      price: 13.50,
      image: 'assets/img/images/dishes-img/Pisto Manchego.jpg',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.3,
      preparationTime: 35,
      ingredients: ['Auberginen', 'Zucchini', 'Paprika', 'Tomaten', 'Zwiebeln', 'Olivenöl'],
      allergens: [],
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '17',
      spiceLevel: 'mild',
      regionOrigin: 'Kastilien-La Mancha'
    },

    // VORSPEISEN
    {
      id: 'sp-13',
      name: 'Gazpacho Andaluz',
      description: 'Kalte Tomatensuppe aus Andalusien mit Gurken und Paprika',
      price: 8.50,
      image: 'assets/img/images/dishes-img/gazpacho.jpg',
      category: DishCategory.VORSPEISEN,
      rating: 4.6,
      preparationTime: 15,
      ingredients: ['Tomaten', 'Gurken', 'Paprika', 'Zwiebeln', 'Knoblauch', 'Olivenöl', 'Essig'],
      allergens: [],
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '17',
      spiceLevel: 'mild',
      regionOrigin: 'Andalusien'
    },
    {
      id: 'sp-14',
      name: 'Jamón Ibérico de Bellota',
      description: 'Eichel-Schinken vom iberischen Schwein - 24 Monate gereift',
      price: 18.90,
      image: 'assets/img/images/dishes-img/jamon-3934953_640.jpg',
      category: DishCategory.VORSPEISEN,
      rating: 4.9,
      preparationTime: 5,
      ingredients: ['Jamón Ibérico de Bellota', 'Olivenöl', 'Manchego-Käse'],
      allergens: ['Milch'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '17',
      spiceLevel: 'mild',
      regionOrigin: 'Extremadura'
    },

    // NACHSPEISEN
    {
      id: 'sp-15',
      name: 'Churros con Chocolate',
      description: 'Traditionelle Churros mit heißer Schokoladensauce',
      price: 7.50,
      image: 'assets/img/images/postre-img/churros-2188871_640.jpg',
      category: DishCategory.NACHSPEISE,
      rating: 4.8,
      preparationTime: 15,
      ingredients: ['Mehl', 'Wasser', 'Salz', 'Zucker', 'Zimt', 'dunkle Schokolade', 'Milch'],
      allergens: ['Gluten', 'Milch'],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '19',
      spiceLevel: 'mild',
      regionOrigin: 'Madrid'
    },
    {
      id: 'sp-16',
      name: 'Flan Casero',
      description: 'Hausgemachter Karamellpudding nach spanischer Art',
      price: 6.90,
      image: 'assets/img/images/postre-img/flan.jpg',
      category: DishCategory.NACHSPEISE,
      rating: 4.7,
      preparationTime: 10,
      ingredients: ['Milch', 'Eier', 'Zucker', 'Vanille'],
      allergens: ['Milch', 'Ei'],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '18',
      spiceLevel: 'mild',
      regionOrigin: 'Katalonien'
    },
    {
      id: 'sp-17',
      name: 'Coulant de Chocolate',
      description: 'Warmer Schokoladenkuchen mit flüssigem Kern',
      price: 8.90,
      image: 'assets/img/images/postre-img/Coulant de Chocolate.jpg',
      category: DishCategory.NACHSPEISE,
      rating: 4.9,
      preparationTime: 20,
      ingredients: ['dunkle Schokolade', 'Butter', 'Eier', 'Zucker', 'Mehl'],
      allergens: ['Gluten', 'Milch', 'Ei'],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '15',
      spiceLevel: 'mild',
      regionOrigin: 'Valencia'
    },
    {
      id: 'sp-18',
      name: 'Arroz con Leche',
      description: 'Cremiger Milchreis mit Zimt und Zitronenschale',
      price: 5.90,
      image: 'assets/img/images/postre-img/arroz.jpg',
      category: DishCategory.NACHSPEISE,
      rating: 4.4,
      preparationTime: 35,
      ingredients: ['Rundkornreis', 'Milch', 'Zucker', 'Zimt', 'Zitronenschale', 'Vanille'],
      allergens: ['Milch'],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '18',
      spiceLevel: 'mild',
      regionOrigin: 'Asturien'
    },

    // GETRÄNKE  
    {
      id: 'sp-19',
      name: 'Sangría Casera',
      description: 'Hausgemachte Sangria mit Rotwein, Früchten und Brandy',
      price: 12.50,
      image: 'assets/img/images/drinks-img/sangria.jpg',
      category: DishCategory.GETRAENKE,
      rating: 4.6,
      preparationTime: 5,
      ingredients: ['Rotwein', 'Brandy', 'Orangen', 'Zitronen', 'Äpfel', 'Zucker', 'Zimt'],
      allergens: [],
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '15',
      spiceLevel: 'mild',
      regionOrigin: 'Andalusien'
    },
    {
      id: 'sp-20',
      name: 'Café Cortado',
      description: 'Espresso mit warmer Milch im Verhältnis 1:1',
      price: 3.20,
      image: 'assets/img/images/drinks-img/caffe-latte-5154771_640.jpg',
      category: DishCategory.GETRAENKE,
      rating: 4.5,
      preparationTime: 3,
      ingredients: ['Espresso', 'warme Milch'],
      allergens: ['Milch'],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '19',
      spiceLevel: 'mild',
      regionOrigin: 'Spanien'
    },
    {
      id: 'sp-21',
      name: 'Rioja Crianza',
      description: 'Spanischer Rotwein aus der Rioja, 12 Monate im Eichenfass gereift',
      price: 28.90,
      image: 'assets/img/images/drinks-img/wine-2789265_640.jpg',
      category: DishCategory.GETRAENKE,
      rating: 4.8,
      preparationTime: 2,
      ingredients: ['Tempranillo-Trauben', 'Eichenfass-Alterung'],
      allergens: [],
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '17',
      spiceLevel: 'mild',
      regionOrigin: 'La Rioja'
    }
  ];

  constructor() { }

  /**
   * Get all Spanish dishes
   */
  getAllSpanishDishes(): Observable<Dish[]> {
    return of(this.spanishDishes.map(dish => this.transformToDish(dish))).pipe(
      delay(300)
    );
  }

  /**
   * Get Spanish dishes by restaurant ID
   */
  getDishesByRestaurant(restaurantId: string): Observable<Dish[]> {
    const filteredDishes = this.spanishDishes.filter(dish => dish.restaurantId === restaurantId);
    
    return of(filteredDishes.map(dish => this.transformToDish(dish))).pipe(
      delay(300)
    );
  }

  /**
   * Get dishes by category
   */
  getDishesByCategory(category: DishCategory): Observable<Dish[]> {
    const filteredDishes = this.spanishDishes.filter(dish => dish.category === category);
    
    return of(filteredDishes.map(dish => this.transformToDish(dish))).pipe(
      delay(300)
    );
  }

  /**
   * Get tapas by size
   */
  getTapasBySize(size: 'pequeña' | 'mediana' | 'grande'): Observable<Dish[]> {
    const filteredDishes = this.spanishDishes.filter(dish => 
      dish.category === DishCategory.TAPAS && dish.tapasSize === size
    );
    
    return of(filteredDishes.map(dish => this.transformToDish(dish))).pipe(
      delay(300)
    );
  }

  /**
   * Get dishes by region
   */
  getDishesByRegion(region: string): Observable<Dish[]> {
    const filteredDishes = this.spanishDishes.filter(dish => 
      dish.regionOrigin?.toLowerCase().includes(region.toLowerCase())
    );
    
    return of(filteredDishes.map(dish => this.transformToDish(dish))).pipe(
      delay(300)
    );
  }

  /**
   * Get dishes by spice level
   */
  getDishesBySpiceLevel(spiceLevel: 'mild' | 'medium' | 'hot'): Observable<Dish[]> {
    const filteredDishes = this.spanishDishes.filter(dish => dish.spiceLevel === spiceLevel);
    
    return of(filteredDishes.map(dish => this.transformToDish(dish))).pipe(
      delay(300)
    );
  }

  /**
   * Search Spanish dishes
   */
  searchSpanishDishes(query: string): Observable<Dish[]> {
    const searchTerm = query.toLowerCase();
    
    const filteredDishes = this.spanishDishes.filter(dish => 
      dish.name.toLowerCase().includes(searchTerm) ||
      dish.description.toLowerCase().includes(searchTerm) ||
      dish.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm)) ||
      dish.regionOrigin?.toLowerCase().includes(searchTerm)
    );

    return of(filteredDishes.map(dish => this.transformToDish(dish))).pipe(
      delay(300)
    );
  }

  /**
   * Get featured Spanish dishes (top rated)
   */
  getFeaturedSpanishDishes(limit: number = 6): Observable<Dish[]> {
    const featuredDishes = this.spanishDishes
      .filter(dish => dish.isAvailable && dish.rating >= 4.5)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
    
    return of(featuredDishes.map(dish => this.transformToDish(dish))).pipe(
      delay(300)
    );
  }

  /**
   * Get Spanish dishes grouped by category
   */
  getSpanishDishesByCategories(): Observable<{ [category: string]: Dish[] }> {
    const groupedDishes: { [category: string]: Dish[] } = {};
    
    Object.values(DishCategory).forEach(category => {
      groupedDishes[category] = this.spanishDishes
        .filter(dish => dish.category === category)
        .map(dish => this.transformToDish(dish));
    });

    return of(groupedDishes).pipe(delay(300));
  }

  /**
   * Get available Spanish restaurants
   */
  getSpanishRestaurantIds(): string[] {
    return [...new Set(this.spanishDishes.map(dish => dish.restaurantId))];
  }

  /**
   * Transform Spanish dish data to Dish model
   */
  private transformToDish(spanishDish: SpanishDishData): Dish {
    return {
      id: spanishDish.id,
      name: spanishDish.name,
      description: spanishDish.description,
      price: spanishDish.price,
      image: spanishDish.image,
      category: spanishDish.category,
      rating: spanishDish.rating,
      preparationTime: spanishDish.preparationTime,
      ingredients: spanishDish.ingredients,
      allergens: spanishDish.allergens,
      isVegetarian: spanishDish.isVegetarian,
      isVegan: spanishDish.isVegan,
      isGlutenFree: spanishDish.isGlutenFree,
      isAvailable: spanishDish.isAvailable,
      restaurantId: spanishDish.restaurantId
    };
  }
}