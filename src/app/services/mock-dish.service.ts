import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import { Dish, DishCategory } from '../models/dish.model';

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
}

@Injectable({
  providedIn: 'root'
})
export class MockDishService {

  private mockDishes: MockDishData[] = [
    // === VORSPEISEN ===
    {
      id: '1',
      name: 'Aceitunas Rellenas',
      description: 'Würzige Oliven mariniert in Kräutern und Knoblauchöl',
      price: 3.50,
      image: 'assets/img/images/tapas-img/olive-2614000_640.jpg',
      category: DishCategory.VORSPEISEN,
      rating: 4.3,
      preparationTime: 5,
      ingredients: ['Oliven', 'Knoblauch', 'Olivenöl', 'Petersilie', 'Oregano'],
      allergens: [],
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '1'
    },
    {
      id: '2',
      name: 'Gazpacho Andaluz',
      description: 'Kalte Tomatensuppe aus Andalusien mit frischem Gemüse',
      price: 4.90,
      image: 'assets/img/images/dishes-img/gazpacho.jpg',
      category: DishCategory.VORSPEISEN,
      rating: 4.6,
      preparationTime: 10,
      ingredients: ['Tomaten', 'Gurken', 'Paprika', 'Zwiebeln', 'Knoblauch', 'Olivenöl', 'Essig'],
      allergens: [],
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '1'
    },
    {
      id: '3',
      name: 'Jamón Ibérico',
      description: 'Feinster iberischer Schinken, 24 Monate gereift',
      price: 12.90,
      image: 'assets/img/images/dishes-img/jamon-3934953_640.jpg',
      category: DishCategory.VORSPEISEN,
      rating: 4.9,
      preparationTime: 5,
      ingredients: ['Iberischer Schinken', 'Manchego Käse', 'Olivenöl'],
      allergens: ['Milch'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '1'
    },
    {
      id: '4',
      name: 'Ensalada Rusa',
      description: 'Spanischer Kartoffelsalat mit Mayonnaise und Gemüse',
      price: 5.50,
      image: 'assets/img/images/tapas-img/EnsaladaRusa.jpg',
      category: DishCategory.VORSPEISEN,
      rating: 4.2,
      preparationTime: 15,
      ingredients: ['Kartoffeln', 'Karotten', 'Erbsen', 'Eier', 'Mayonnaise', 'Thunfisch'],
      allergens: ['Eier', 'Fisch'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '1'
    },

    // === TAPAS ===
    {
      id: '10',
      name: 'Gambas al Ajillo',
      description: 'Garnelen in Knoblauchöl mit Chili und frischen Kräutern',
      price: 8.90,
      image: 'assets/img/images/tapas-img/gambas2.jpg',
      category: DishCategory.TAPAS,
      rating: 4.8,
      preparationTime: 8,
      ingredients: ['Garnelen', 'Knoblauch', 'Olivenöl', 'Chili', 'Petersilie'],
      allergens: ['Krustentiere'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '1'
    },
    {
      id: '11',
      name: 'Croquetas de Jamón',
      description: 'Frittierte Kroketten gefüllt mit Schinken und Bechamel',
      price: 6.50,
      image: 'assets/img/images/dishes-img/croquetas.jpg',
      category: DishCategory.TAPAS,
      rating: 4.7,
      preparationTime: 12,
      ingredients: ['Schinken', 'Mehl', 'Butter', 'Milch', 'Eier', 'Paniermehl'],
      allergens: ['Gluten', 'Milch', 'Eier'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '1'
    },
    {
      id: '12',
      name: 'Tortilla Española',
      description: 'Traditionelles spanisches Kartoffelomelett',
      price: 5.90,
      image: 'assets/img/images/dishes-img/Tortilla Española.jpg',
      category: DishCategory.TAPAS,
      rating: 4.5,
      preparationTime: 15,
      ingredients: ['Kartoffeln', 'Eier', 'Zwiebeln', 'Olivenöl', 'Salz'],
      allergens: ['Eier'],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '1'
    },
    {
      id: '13',
      name: 'Pimientos de Padrón',
      description: 'Gebratene grüne Paprika aus Padrón mit Meersalz',
      price: 4.50,
      image: 'assets/img/images/tapas-img/pimientos-de-padron-4417710_640.jpg',
      category: DishCategory.TAPAS,
      rating: 4.4,
      preparationTime: 6,
      ingredients: ['Padrón Paprika', 'Olivenöl', 'Meersalz'],
      allergens: [],
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '1'
    },
    {
      id: '14',
      name: 'Chorizo a la Sidra',
      description: 'Würzige Chorizo-Wurst in Apfelwein geschmort',
      price: 7.50,
      image: 'assets/img/images/tapas-img/chorizo-7173983_640.jpg',
      category: DishCategory.TAPAS,
      rating: 4.6,
      preparationTime: 10,
      ingredients: ['Chorizo', 'Apfelwein', 'Zwiebeln', 'Knoblauch'],
      allergens: ['Schwein'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '1'
    },
    {
      id: '15',
      name: 'Pulpo a la Gallega',
      description: 'Oktopus nach galicischer Art mit Paprika und Olivenöl',
      price: 11.90,
      image: 'assets/img/images/tapas-img/PulpoalaGallega.jpg',
      category: DishCategory.TAPAS,
      rating: 4.7,
      preparationTime: 20,
      ingredients: ['Oktopus', 'Kartoffeln', 'Paprika', 'Olivenöl', 'Meersalz'],
      allergens: ['Weichtiere'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '1'
    },
    {
      id: '16',
      name: 'Calamares Fritos',
      description: 'Knusprig frittierte Tintenfischringe mit Zitrone',
      price: 8.50,
      image: 'assets/img/images/tapas-img/tintenfischringe.jpg',
      category: DishCategory.TAPAS,
      rating: 4.4,
      preparationTime: 8,
      ingredients: ['Tintenfischringe', 'Mehl', 'Zitrone', 'Petersilie'],
      allergens: ['Weichtiere', 'Gluten'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '1'
    },
    {
      id: '17',
      name: 'Pinchos de Verduras',
      description: 'Gegrillte Gemüsespieße mit Paprika und Zucchini',
      price: 6.90,
      image: 'assets/img/images/tapas-img/paprika-3083449_640.jpg',
      category: DishCategory.TAPAS,
      rating: 4.3,
      preparationTime: 12,
      ingredients: ['Paprika', 'Zucchini', 'Auberginen', 'Zwiebeln', 'Olivenöl'],
      allergens: [],
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '1'
    },

    // === HAUPTSPEISEN ===
    {
      id: '20',
      name: 'Paella Valenciana',
      description: 'Traditionelle valencianische Paella mit Huhn, Kaninchen und Gemüse',
      price: 18.90,
      image: 'assets/img/images/dishes-img/paella.png',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.9,
      preparationTime: 35,
      ingredients: ['Bomba Reis', 'Huhn', 'Kaninchen', 'grüne Bohnen', 'Lima Bohnen', 'Tomaten', 'Safran'],
      allergens: [],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '1'
    },
    {
      id: '21',
      name: 'Paella de Mariscos',
      description: 'Meeresfrüchte-Paella mit Garnelen, Muscheln und Tintenfisch',
      price: 22.90,
      image: 'assets/img/images/hero-img/gambas2.jpg',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.8,
      preparationTime: 30,
      ingredients: ['Bomba Reis', 'Garnelen', 'Muscheln', 'Tintenfisch', 'Safran', 'Knoblauch'],
      allergens: ['Krustentiere', 'Weichtiere'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '1'
    },
    {
      id: '22',
      name: 'Fideuà de Mariscos',
      description: 'Katalanische Nudel-Paella mit Meeresfrüchten',
      price: 19.90,
      image: 'assets/img/images/dishes-img/Fideuà.jpg',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.6,
      preparationTime: 25,
      ingredients: ['Fideua Nudeln', 'Garnelen', 'Tintenfisch', 'Aioli', 'Safran'],
      allergens: ['Gluten', 'Krustentiere', 'Weichtiere', 'Eier'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '1'
    },
    {
      id: '23',
      name: 'Albondigas en Salsa',
      description: 'Hausgemachte Fleischbällchen in würziger Tomatensauce',
      price: 14.50,
      image: 'assets/img/images/dishes-img/albondigas.jpg',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.5,
      preparationTime: 20,
      ingredients: ['Rinderhack', 'Schweinehack', 'Tomaten', 'Zwiebeln', 'Knoblauch', 'Petersilie'],
      allergens: ['Gluten', 'Eier'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '1'
    },
    {
      id: '24',
      name: 'Patatas Bravas',
      description: 'Knusprige Kartoffelwürfel mit pikanter Bravas-Sauce',
      price: 6.90,
      image: 'assets/img/images/dishes-img/patatasBravas.jpg',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.4,
      preparationTime: 15,
      ingredients: ['Kartoffeln', 'Tomaten', 'Paprika', 'Knoblauch', 'Chili', 'Aioli'],
      allergens: ['Eier'],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '1'
    },
    {
      id: '25',
      name: 'Pisto Manchego',
      description: 'Traditionelles Gemüseeintopf aus La Mancha mit Spiegelei',
      price: 12.90,
      image: 'assets/img/images/dishes-img/Pisto Manchego.jpg',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.3,
      preparationTime: 18,
      ingredients: ['Zucchini', 'Auberginen', 'Paprika', 'Tomaten', 'Zwiebeln', 'Ei'],
      allergens: ['Eier'],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '1'
    },

    // === NACHSPEISEN ===
    {
      id: '30',
      name: 'Churros con Chocolate',
      description: 'Frische Churros mit heißer Schokoladensauce',
      price: 5.90,
      image: 'assets/img/images/postre-img/churros-2188871_640.jpg',
      category: DishCategory.NACHSPEISE,
      rating: 4.7,
      preparationTime: 8,
      ingredients: ['Mehl', 'Butter', 'Zucker', 'Zimt', 'Schokolade', 'Milch'],
      allergens: ['Gluten', 'Milch', 'Eier'],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '1'
    },
    {
      id: '31',
      name: 'Flan de Vainilla',
      description: 'Klassischer spanischer Vanillepudding mit Karamell',
      price: 4.50,
      image: 'assets/img/images/postre-img/flan.jpg',
      category: DishCategory.NACHSPEISE,
      rating: 4.6,
      preparationTime: 5,
      ingredients: ['Milch', 'Eier', 'Zucker', 'Vanille'],
      allergens: ['Milch', 'Eier'],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '1'
    },
    {
      id: '32',
      name: 'Coulant de Chocolate',
      description: 'Warmer Schokoladenkuchen mit flüssigem Kern',
      price: 6.90,
      image: 'assets/img/images/postre-img/Coulant de Chocolate.jpg',
      category: DishCategory.NACHSPEISE,
      rating: 4.8,
      preparationTime: 12,
      ingredients: ['Dunkle Schokolade', 'Butter', 'Eier', 'Zucker', 'Mehl'],
      allergens: ['Gluten', 'Milch', 'Eier'],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '1'
    },
    {
      id: '33',
      name: 'Panna Cotta de Frutas',
      description: 'Cremige Panna Cotta mit frischen Früchten',
      price: 5.50,
      image: 'assets/img/images/postre-img/panna-cotta-4388588_640.jpg',
      category: DishCategory.NACHSPEISE,
      rating: 4.4,
      preparationTime: 5,
      ingredients: ['Sahne', 'Gelatine', 'Zucker', 'Vanille', 'gemischte Früchte'],
      allergens: ['Milch'],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '1'
    },
    {
      id: '34',
      name: 'Tarta de Santiago',
      description: 'Traditioneller Mandelkuchen aus Galicien',
      price: 4.90,
      image: 'assets/img/images/postre-img/tarta-6900298_640.jpg',
      category: DishCategory.NACHSPEISE,
      rating: 4.5,
      preparationTime: 5,
      ingredients: ['Mandeln', 'Eier', 'Zucker', 'Zitronenschale', 'Puderzucker'],
      allergens: ['Nüsse', 'Eier'],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '1'
    },
    {
      id: '35',
      name: 'Arroz con Leche',
      description: 'Cremiger Milchreis mit Zimt und Vanille',
      price: 4.20,
      image: 'assets/img/images/postre-img/arroz.jpg',
      category: DishCategory.NACHSPEISE,
      rating: 4.3,
      preparationTime: 5,
      ingredients: ['Reis', 'Milch', 'Zucker', 'Zimt', 'Vanille', 'Zitronenschale'],
      allergens: ['Milch'],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '1'
    },
    {
      id: '36',
      name: 'Helado Artesanal',
      description: 'Hausgemachtes Eis in verschiedenen Geschmacksrichtungen',
      price: 5.90,
      image: 'assets/img/images/postre-img/ice-cream-3611698_640.jpg',
      category: DishCategory.NACHSPEISE,
      rating: 4.6,
      preparationTime: 3,
      ingredients: ['Milch', 'Sahne', 'Zucker', 'natürliche Aromen'],
      allergens: ['Milch'],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '1'
    },

    // === GETRÄNKE ===
    {
      id: '40',
      name: 'Sangría Tinta',
      description: 'Klassische rote Sangría mit Früchten und Brandy',
      price: 4.50,
      image: 'assets/img/images/drinks-img/sangria.jpg',
      category: DishCategory.GETRAENKE,
      rating: 4.5,
      preparationTime: 3,
      ingredients: ['Rotwein', 'Brandy', 'Orangen', 'Zitronen', 'Zucker'],
      allergens: ['Sulfite'],
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '1'
    },
    {
      id: '41',
      name: 'Cerveza Estrella Galicia',
      description: 'Frisches spanisches Bier vom Fass',
      price: 3.20,
      image: 'assets/img/images/drinks-img/beer.jpg',
      category: DishCategory.GETRAENKE,
      rating: 4.4,
      preparationTime: 2,
      ingredients: ['Malz', 'Hopfen', 'Wasser', 'Hefe'],
      allergens: ['Gluten'],
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '1'
    },
    {
      id: '42',
      name: 'Vino Tinto Rioja',
      description: 'Hochwertiger Rotwein aus der Rioja-Region',
      price: 5.90,
      image: 'assets/img/images/drinks-img/wine-2408620_640.jpg',
      category: DishCategory.GETRAENKE,
      rating: 4.7,
      preparationTime: 2,
      ingredients: ['Tempranillo Trauben', 'Sulfite'],
      allergens: ['Sulfite'],
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '1'
    },
    {
      id: '43',
      name: 'Vino Blanco Albariño',
      description: 'Frischer Weißwein aus Galicien',
      price: 5.50,
      image: 'assets/img/images/drinks-img/wine-2789265_640.jpg',
      category: DishCategory.GETRAENKE,
      rating: 4.6,
      preparationTime: 2,
      ingredients: ['Albariño Trauben', 'Sulfite'],
      allergens: ['Sulfite'],
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '1'
    },
    {
      id: '44',
      name: 'Café con Leche',
      description: 'Spanischer Milchkaffee mit cremigem Milchschaum',
      price: 2.80,
      image: 'assets/img/images/drinks-img/caffe-latte-5154771_640.jpg',
      category: DishCategory.GETRAENKE,
      rating: 4.3,
      preparationTime: 3,
      ingredients: ['Espresso', 'Milch'],
      allergens: ['Milch'],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '1'
    },

    // === DRAGON PALACE - CHINESISCHE GERICHTE (Restaurant ID: 2) ===
    {
      id: '50',
      name: 'Peking Ente',
      description: 'Knusprige Ente nach Peking-Art mit Pfannkuchen und Hoisin-Sauce',
      price: 24.90,
      image: 'assets/img/placeholder-dish.jpg',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.8,
      preparationTime: 45,
      ingredients: ['Ente', 'Pfannkuchen', 'Hoisin-Sauce', 'Frühlingszwiebeln', 'Gurken'],
      allergens: ['Gluten', 'Soja'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '2'
    },
    {
      id: '51',
      name: 'Süß-Sauer Schwein',
      description: 'Paniertes Schweinefleisch in süß-saurer Sauce mit Ananas',
      price: 16.90,
      image: 'assets/img/placeholder-dish.jpg',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.4,
      preparationTime: 20,
      ingredients: ['Schweinefleisch', 'Ananas', 'Paprika', 'Sojasauce', 'Essig', 'Zucker'],
      allergens: ['Gluten', 'Soja'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '2'
    },

    // === MAHARAJA PALACE - INDISCHE GERICHTE (Restaurant ID: 4) ===
    {
      id: '60',
      name: 'Chicken Tikka Masala',
      description: 'Mariniertes Hühnchen in cremiger Tomaten-Curry-Sauce',
      price: 17.90,
      image: 'assets/img/placeholder-dish.jpg',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.7,
      preparationTime: 25,
      ingredients: ['Hühnchen', 'Tomaten', 'Sahne', 'Garam Masala', 'Ingwer', 'Knoblauch'],
      allergens: ['Milch'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '4'
    },
    {
      id: '61',
      name: 'Palak Paneer',
      description: 'Hausgemachter Käse in cremiger Spinatsauce',
      price: 14.90,
      image: 'assets/img/placeholder-dish.jpg',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.5,
      preparationTime: 20,
      ingredients: ['Paneer', 'Spinat', 'Sahne', 'Zwiebeln', 'Gewürze'],
      allergens: ['Milch'],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '4'
    }
  ];

  constructor() { }

  /**
   * Get all dishes
   */
  getDishes(): Observable<Dish[]> {
    return of(this.mockDishes).pipe(
      delay(300),
      map(dishes => dishes.map(d => this.transformToDish(d)))
    );
  }

  /**
   * Get dishes by restaurant
   */
  getDishesByRestaurant(restaurantId: string): Observable<Dish[]> {
    const filtered = this.mockDishes.filter(dish => dish.restaurantId === restaurantId);
    return of(filtered).pipe(
      delay(200),
      map(dishes => dishes.map(d => this.transformToDish(d)))
    );
  }

  /**
   * Get dishes by category
   */
  getDishesByCategory(category: DishCategory): Observable<Dish[]> {
    const filtered = this.mockDishes.filter(dish => dish.category === category);
    return of(filtered).pipe(
      delay(200),
      map(dishes => dishes.map(d => this.transformToDish(d)))
    );
  }

  /**
   * Get single dish
   */
  getDish(id: string): Observable<Dish | null> {
    const dish = this.mockDishes.find(d => d.id === id);
    return of(dish ? this.transformToDish(dish) : null).pipe(
      delay(100)
    );
  }

  /**
   * Search dishes
   */
  searchDishes(searchTerm: string): Observable<Dish[]> {
    const filtered = this.mockDishes.filter(dish =>
      dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dish.ingredients.some(ingredient =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    return of(filtered).pipe(
      delay(300),
      map(dishes => dishes.map(d => this.transformToDish(d)))
    );
  }

  /**
   * Transform MockDishData to Dish
   */
  private transformToDish(mockData: MockDishData): Dish {
    return {
      id: mockData.id,
      name: mockData.name,
      description: mockData.description,
      price: mockData.price,
      image: mockData.image,
      category: mockData.category,
      rating: mockData.rating,
      preparationTime: mockData.preparationTime,
      ingredients: mockData.ingredients,
      allergens: mockData.allergens,
      isVegetarian: mockData.isVegetarian,
      isVegan: mockData.isVegan,
      isGlutenFree: mockData.isGlutenFree,
      isAvailable: mockData.isAvailable,
      restaurantId: mockData.restaurantId
    };
  }
}