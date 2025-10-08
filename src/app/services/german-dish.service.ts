import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import { Dish, DishCategory } from '../models/dish.model';

export interface GermanDishData {
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
  portion?: 'normal' | 'groß' | 'xl'; // Für deutsche Portionsgrößen
  tradionalRegion?: string; // Deutsche Region/Bundesland
  beerPairing?: string; // Empfohlenes Bier
}

@Injectable({
  providedIn: 'root'
})
export class GermanDishService {

  private germanDishes: GermanDishData[] = [
    // VORSPEISEN
    {
      id: 'de-1',
      name: 'Leberwurst-Stulle',
      description: 'Hausgemachte Leberwurst auf frischem Bauernbrot mit Zwiebeln',
      price: 6.50,
      image: 'assets/img/images/dishes-img/leberwurst-stulle.jpg',
      category: DishCategory.VORSPEISEN,
      rating: 4.3,
      preparationTime: 5,
      ingredients: ['Leberwurst', 'Bauernbrot', 'Zwiebeln', 'Butter', 'Gurken'],
      allergens: ['Gluten'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '20',
      portion: 'normal',
      tradionalRegion: 'Westfalen',
      beerPairing: 'Pilsener'
    },
    {
      id: 'de-2',
      name: 'Flönz mit Himmel un Ääd',
      description: 'Rheinische Blutwurst mit Kartoffelpüree und Apfelmus',
      price: 8.90,
      image: 'assets/img/images/dishes-img/himmel-un-aad.jpg',
      category: DishCategory.VORSPEISEN,
      rating: 4.1,
      preparationTime: 15,
      ingredients: ['Blutwurst', 'Kartoffeln', 'Äpfel', 'Zwiebeln', 'Butter'],
      allergens: [],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '21',
      portion: 'normal',
      tradionalRegion: 'Rheinland',
      beerPairing: 'Kölsch'
    },
    {
      id: 'de-3',
      name: 'Brotzeit-Teller',
      description: 'Kalte Platte mit Leberkäse, Weißwurst, Brezn und Obatzda',
      price: 12.50,
      image: 'assets/img/images/dishes-img/brotzeit-teller.jpg',
      category: DishCategory.VORSPEISEN,
      rating: 4.6,
      preparationTime: 10,
      ingredients: ['Leberkäse', 'Weißwurst', 'Brezel', 'Obatzda', 'Radieschen', 'Senf'],
      allergens: ['Gluten', 'Milch'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '20',
      portion: 'groß',
      tradionalRegion: 'Bayern',
      beerPairing: 'Weißbier'
    },
    {
      id: 'de-4',
      name: 'Soljanka',
      description: 'Ostdeutsche Fleischsuppe mit sauren Gurken und Oliven',
      price: 7.80,
      image: 'assets/img/images/dishes-img/soljanka.jpg',
      category: DishCategory.VORSPEISEN,
      rating: 4.4,
      preparationTime: 20,
      ingredients: ['Fleischbrühe', 'Saure Gurken', 'Oliven', 'Zwiebeln', 'Sauerrahm', 'Fleischrest'],
      allergens: ['Milch'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '21',
      portion: 'normal',
      tradionalRegion: 'Ostdeutschland',
      beerPairing: 'Schwarzbier'
    },

    // HAUPTSPEISEN
    {
      id: 'de-5',
      name: 'Schweinebraten mit Klößen',
      description: 'Bayerischer Schweinebraten mit Semmelknödeln und Sauerkraut',
      price: 18.90,
      image: 'assets/img/images/dishes-img/schweinebraten.jpg',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.8,
      preparationTime: 40,
      ingredients: ['Schweinefleisch', 'Semmelknödel', 'Sauerkraut', 'Bratensauce', 'Kümmel'],
      allergens: ['Gluten', 'Ei'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '20',
      portion: 'groß',
      tradionalRegion: 'Bayern',
      beerPairing: 'Märzen'
    },
    {
      id: 'de-6',
      name: 'Sauerbraten rheinische Art',
      description: 'Marinierter Rinderbraten mit Rotkohl und Kartoffelklößen',
      price: 19.50,
      image: 'assets/img/images/dishes-img/sauerbraten.jpg',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.7,
      preparationTime: 45,
      ingredients: ['Rindfleisch', 'Rotkohl', 'Kartoffelklöße', 'Rosinen', 'Lebkuchen-Sauce'],
      allergens: ['Gluten'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '21',
      portion: 'groß',
      tradionalRegion: 'Rheinland',
      beerPairing: 'Alt'
    },
    {
      id: 'de-7',
      name: 'Kasseler mit Sauerkraut',
      description: 'Geräuchertes Schweinekotelett mit Sauerkraut und Püree',
      price: 16.80,
      image: 'assets/img/images/dishes-img/kasseler.jpg',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.5,
      preparationTime: 35,
      ingredients: ['Kasseler', 'Sauerkraut', 'Kartoffelpüree', 'Senf', 'Speck'],
      allergens: ['Milch'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '20',
      portion: 'groß',
      tradionalRegion: 'Norddeutschland',
      beerPairing: 'Pilsener'
    },
    {
      id: 'de-8',
      name: 'Eisbein mit Erbspüree',
      description: 'Berliner Eisbein mit Erbspüree und Sauerkraut',
      price: 17.90,
      image: 'assets/img/images/dishes-img/eisbein.jpg',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.6,
      preparationTime: 50,
      ingredients: ['Schweinshaxe', 'Erbsen', 'Sauerkraut', 'Kartoffeln', 'Senf'],
      allergens: [],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '21',
      portion: 'xl',
      tradionalRegion: 'Berlin',
      beerPairing: 'Berliner Weiße'
    },
    {
      id: 'de-9',
      name: 'Königsberger Klopse',
      description: 'Fleischklöße in weißer Kapernsoße mit Salzkartoffeln',
      price: 14.50,
      image: 'assets/img/images/dishes-img/koenigsberger-klopse.jpg',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.4,
      preparationTime: 30,
      ingredients: ['Hackfleisch', 'Kapern', 'Sahne', 'Salzkartoffeln', 'Sardellen'],
      allergens: ['Gluten', 'Milch', 'Ei', 'Fisch'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '21',
      portion: 'normal',
      tradionalRegion: 'Ostpreußen',
      beerPairing: 'Pils'
    },
    {
      id: 'de-10',
      name: 'Currywurst mit Pommes',
      description: 'Berliner Currywurst mit hausgemachter Curry-Sauce und Pommes',
      price: 9.80,
      image: 'assets/img/images/dishes-img/currywurst-pommes.jpg',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.2,
      preparationTime: 15,
      ingredients: ['Bratwurst', 'Curry-Ketchup', 'Pommes frites', 'Curry-Pulver', 'Zwiebeln'],
      allergens: ['Gluten'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '5',
      portion: 'normal',
      tradionalRegion: 'Berlin',
      beerPairing: 'Pils'
    },
    {
      id: 'de-11',
      name: 'Schäufele mit Klößen',
      description: 'Fränkisches Schäufele mit Semmelknödeln und Braunkraut',
      price: 18.50,
      image: 'assets/img/images/dishes-img/schaeufele.jpg',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.7,
      preparationTime: 40,
      ingredients: ['Schweineschulter', 'Semmelknödel', 'Braunkraut', 'Bier-Sauce'],
      allergens: ['Gluten', 'Ei'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '20',
      portion: 'groß',
      tradionalRegion: 'Franken',
      beerPairing: 'Rauchbier'
    },
    {
      id: 'de-12',
      name: 'Döppekuchen',
      description: 'Rheinischer Kartoffelauflauf mit Speck und Zwiebeln',
      price: 13.90,
      image: 'assets/img/images/dishes-img/doeppekuchen.jpg',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.3,
      preparationTime: 35,
      ingredients: ['Kartoffeln', 'Speck', 'Zwiebeln', 'Sahne', 'Majoran'],
      allergens: ['Milch'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '21',
      portion: 'groß',
      tradionalRegion: 'Rheinland',
      beerPairing: 'Kölsch'
    },
    {
      id: 'de-13',
      name: 'Maultaschen schwäbische Art',
      description: 'Schwäbische Maultaschen in klarer Brühe oder gebraten',
      price: 12.80,
      image: 'assets/img/images/dishes-img/maultaschen.jpg',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.5,
      preparationTime: 25,
      ingredients: ['Nudelteig', 'Hackfleisch', 'Spinat', 'Zwiebeln', 'Brühe'],
      allergens: ['Gluten', 'Ei'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '20',
      portion: 'normal',
      tradionalRegion: 'Schwaben',
      beerPairing: 'Weißbier'
    },
    {
      id: 'de-14',
      name: 'Labskaus',
      description: 'Norddeutscher Labskaus mit Spiegelei, Rollmops und roter Bete',
      price: 14.90,
      image: 'assets/img/images/dishes-img/labskaus.jpg',
      category: DishCategory.HAUPTSPEISE,
      rating: 4.1,
      preparationTime: 20,
      ingredients: ['Corned Beef', 'Kartoffeln', 'Rote Bete', 'Spiegelei', 'Rollmops'],
      allergens: ['Ei', 'Fisch'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '21',
      portion: 'normal',
      tradionalRegion: 'Norddeutschland',
      beerPairing: 'Export'
    },

    // GETRÄNKE
    {
      id: 'de-15',
      name: 'Kölsch (0,2l)',
      description: 'Originalgetreues Kölsch aus Köln in der traditionellen Stange',
      price: 2.80,
      image: 'assets/img/images/drinks-img/koelsch.jpg',
      category: DishCategory.GETRAENKE,
      rating: 4.5,
      preparationTime: 2,
      ingredients: ['Malz', 'Hopfen', 'Hefe', 'Rheinwasser'],
      allergens: ['Gluten'],
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '21',
      portion: 'normal',
      tradionalRegion: 'Köln',
      beerPairing: 'Eigenständig'
    },
    {
      id: 'de-16',
      name: 'Weißbier (0,5l)',
      description: 'Bayerisches Hefeweizen ungefiltert mit fruchtigen Aromen',
      price: 4.20,
      image: 'assets/img/images/drinks-img/weissbier.jpg',
      category: DishCategory.GETRAENKE,
      rating: 4.7,
      preparationTime: 3,
      ingredients: ['Weizenmalz', 'Gerstenmalz', 'Hopfen', 'Hefe'],
      allergens: ['Gluten'],
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '20',
      portion: 'normal',
      tradionalRegion: 'Bayern',
      beerPairing: 'Eigenständig'
    },
    {
      id: 'de-17',
      name: 'Berliner Weiße mit Schuss',
      description: 'Berliner Weißbier wahlweise mit Himbeer- oder Waldmeistersirup',
      price: 3.50,
      image: 'assets/img/images/drinks-img/berliner-weisse.jpg',
      category: DishCategory.GETRAENKE,
      rating: 4.2,
      preparationTime: 3,
      ingredients: ['Berliner Weiße', 'Himbeersirup', 'Waldmeistersirup'],
      allergens: ['Gluten'],
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '21',
      portion: 'normal',
      tradionalRegion: 'Berlin',
      beerPairing: 'Eigenständig'
    },
    {
      id: 'de-18',
      name: 'Altbier (0,25l)',
      description: 'Düsseldorfer Alt - dunkles, malzbetontes Bier',
      price: 2.90,
      image: 'assets/img/images/drinks-img/altbier.jpg',
      category: DishCategory.GETRAENKE,
      rating: 4.4,
      preparationTime: 2,
      ingredients: ['Malz', 'Hopfen', 'Hefe', 'Rheinwasser'],
      allergens: ['Gluten'],
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '21',
      portion: 'normal',
      tradionalRegion: 'Düsseldorf',
      beerPairing: 'Eigenständig'
    },
    {
      id: 'de-19',
      name: 'Schwarzbier (0,5l)',
      description: 'Thüringer Schwarzbier mit röstmalzigen Aromen',
      price: 3.80,
      image: 'assets/img/images/drinks-img/schwarzbier.jpg',
      category: DishCategory.GETRAENKE,
      rating: 4.6,
      preparationTime: 2,
      ingredients: ['Röstmalz', 'Hopfen', 'Hefe', 'Wasser'],
      allergens: ['Gluten'],
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '21',
      portion: 'normal',
      tradionalRegion: 'Thüringen',
      beerPairing: 'Eigenständig'
    },
    {
      id: 'de-20',
      name: 'Feuerzangenbowle',
      description: 'Heißer Rotwein mit Zuckerhut und Rum - winterliche Spezialität',
      price: 8.50,
      image: 'assets/img/images/drinks-img/feuerzangenbowle.jpg',
      category: DishCategory.GETRAENKE,
      rating: 4.8,
      preparationTime: 10,
      ingredients: ['Rotwein', 'Zuckerhut', 'Rum', 'Gewürze', 'Orange'],
      allergens: [],
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
      isAvailable: false, // Nur im Winter
      restaurantId: '20',
      portion: 'normal',
      tradionalRegion: 'Deutschland',
      beerPairing: 'Kein Bier'
    },
    {
      id: 'de-21',
      name: 'Apfelschorle (0,5l)',
      description: 'Erfrischende Mischung aus Apfelsaft und Mineralwasser',
      price: 3.20,
      image: 'assets/img/images/drinks-img/apfelschorle.jpg',
      category: DishCategory.GETRAENKE,
      rating: 4.3,
      preparationTime: 1,
      ingredients: ['Apfelsaft', 'Mineralwasser'],
      allergens: [],
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '20',
      portion: 'normal',
      tradionalRegion: 'Deutschland',
      beerPairing: 'Alkoholfrei'
    },
    {
      id: 'de-22',
      name: 'Pharisäer',
      description: 'Nordfriesische Kaffeespezialität mit Rum und Sahnehaube',
      price: 6.90,
      image: 'assets/img/images/drinks-img/pharisaeer.jpg',
      category: DishCategory.GETRAENKE,
      rating: 4.5,
      preparationTime: 5,
      ingredients: ['Kaffee', 'Rum', 'Sahne', 'Zucker'],
      allergens: ['Milch'],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '21',
      portion: 'normal',
      tradionalRegion: 'Nordfriesland',
      beerPairing: 'Kein Bier'
    },

    // NACHSPEISEN
    {
      id: 'de-23',
      name: 'Schwarzwälder Kirschtorte',
      description: 'Klassische Schwarzwälder Kirschtorte mit Kirschwasser und Sahne',
      price: 7.50,
      image: 'assets/img/images/postre-img/schwarzwaelder-kirschtorte.jpg',
      category: DishCategory.NACHSPEISE,
      rating: 4.8,
      preparationTime: 10,
      ingredients: ['Biskuitboden', 'Kirschen', 'Sahne', 'Kirschwasser', 'Schokolade'],
      allergens: ['Gluten', 'Milch', 'Ei'],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '20',
      portion: 'normal',
      tradionalRegion: 'Schwarzwald',
      beerPairing: 'Kein Bier'
    },
    {
      id: 'de-24',
      name: 'Rote Grütze mit Vanillesauce',
      description: 'Norddeutsche rote Grütze aus roten Beeren mit Vanillesauce',
      price: 5.90,
      image: 'assets/img/images/postre-img/rote-gruetze.jpg',
      category: DishCategory.NACHSPEISE,
      rating: 4.4,
      preparationTime: 5,
      ingredients: ['Rote Beeren', 'Stärke', 'Zucker', 'Vanillesauce'],
      allergens: ['Milch'],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      restaurantId: '21',
      portion: 'normal',
      tradionalRegion: 'Norddeutschland',
      beerPairing: 'Kein Bier'
    },
    {
      id: 'de-25',
      name: 'Apfelstrudel mit Vanilleeis',
      description: 'Warmer Apfelstrudel mit hausgemachtem Vanilleeis',
      price: 6.80,
      image: 'assets/img/images/postre-img/apfelstrudel-eis.jpg',
      category: DishCategory.NACHSPEISE,
      rating: 4.6,
      preparationTime: 8,
      ingredients: ['Äpfel', 'Blätterteig', 'Zimt', 'Vanilleeis', 'Rosinen'],
      allergens: ['Gluten', 'Milch', 'Ei'],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      restaurantId: '20',
      portion: 'normal',
      tradionalRegion: 'Österreich/Bayern',
      beerPairing: 'Kein Bier'
    }
  ];

  constructor() { }

  /**
   * Get all German dishes
   */
  getAllGermanDishes(): Observable<Dish[]> {
    return of(this.germanDishes.map(dish => this.transformToDish(dish))).pipe(
      delay(300)
    );
  }

  /**
   * Get German dishes by restaurant ID
   */
  getDishesByRestaurant(restaurantId: string): Observable<Dish[]> {
    const filteredDishes = this.germanDishes.filter(dish => dish.restaurantId === restaurantId);
    
    return of(filteredDishes.map(dish => this.transformToDish(dish))).pipe(
      delay(300)
    );
  }

  /**
   * Get dishes by category
   */
  getDishesByCategory(category: DishCategory): Observable<Dish[]> {
    const filteredDishes = this.germanDishes.filter(dish => dish.category === category);
    
    return of(filteredDishes.map(dish => this.transformToDish(dish))).pipe(
      delay(300)
    );
  }

  /**
   * Get dishes by traditional region
   */
  getDishesByRegion(region: string): Observable<Dish[]> {
    const filteredDishes = this.germanDishes.filter(dish => 
      dish.tradionalRegion?.toLowerCase().includes(region.toLowerCase())
    );
    
    return of(filteredDishes.map(dish => this.transformToDish(dish))).pipe(
      delay(300)
    );
  }

  /**
   * Get dishes by portion size
   */
  getDishesByPortion(portion: 'normal' | 'groß' | 'xl'): Observable<Dish[]> {
    const filteredDishes = this.germanDishes.filter(dish => dish.portion === portion);
    
    return of(filteredDishes.map(dish => this.transformToDish(dish))).pipe(
      delay(300)
    );
  }

  /**
   * Get dishes with beer pairing
   */
  getDishesWithBeerPairing(beerType?: string): Observable<Dish[]> {
    const filteredDishes = beerType 
      ? this.germanDishes.filter(dish => 
          dish.beerPairing?.toLowerCase().includes(beerType.toLowerCase())
        )
      : this.germanDishes.filter(dish => 
          dish.beerPairing && dish.beerPairing !== 'Kein Bier' && dish.beerPairing !== 'Alkoholfrei'
        );
    
    return of(filteredDishes.map(dish => this.transformToDish(dish))).pipe(
      delay(300)
    );
  }

  /**
   * Search German dishes
   */
  searchGermanDishes(query: string): Observable<Dish[]> {
    const searchTerm = query.toLowerCase();
    
    const filteredDishes = this.germanDishes.filter(dish => 
      dish.name.toLowerCase().includes(searchTerm) ||
      dish.description.toLowerCase().includes(searchTerm) ||
      dish.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm)) ||
      dish.tradionalRegion?.toLowerCase().includes(searchTerm) ||
      dish.beerPairing?.toLowerCase().includes(searchTerm)
    );

    return of(filteredDishes.map(dish => this.transformToDish(dish))).pipe(
      delay(300)
    );
  }

  /**
   * Get featured German dishes (top rated)
   */
  getFeaturedGermanDishes(limit: number = 6): Observable<Dish[]> {
    const featuredDishes = this.germanDishes
      .filter(dish => dish.isAvailable && dish.rating >= 4.5)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
    
    return of(featuredDishes.map(dish => this.transformToDish(dish))).pipe(
      delay(300)
    );
  }

  /**
   * Get German dishes grouped by category
   */
  getGermanDishesByCategories(): Observable<{ [category: string]: Dish[] }> {
    const groupedDishes: { [category: string]: Dish[] } = {};
    
    Object.values(DishCategory).forEach(category => {
      groupedDishes[category] = this.germanDishes
        .filter(dish => dish.category === category)
        .map(dish => this.transformToDish(dish));
    });

    return of(groupedDishes).pipe(delay(300));
  }

  /**
   * Get German dishes grouped by region
   */
  getGermanDishesByRegions(): Observable<{ [region: string]: Dish[] }> {
    const groupedDishes: { [region: string]: Dish[] } = {};
    
    // Get unique regions
    const regions = [...new Set(this.germanDishes.map(dish => dish.tradionalRegion).filter(Boolean))];
    
    regions.forEach(region => {
      if (region) {
        groupedDishes[region] = this.germanDishes
          .filter(dish => dish.tradionalRegion === region)
          .map(dish => this.transformToDish(dish));
      }
    });

    return of(groupedDishes).pipe(delay(300));
  }

  /**
   * Get available German restaurants
   */
  getGermanRestaurantIds(): string[] {
    return [...new Set(this.germanDishes.map(dish => dish.restaurantId))];
  }

  /**
   * Get seasonal dishes (e.g., Feuerzangenbowle only in winter)
   */
  getSeasonalDishes(season: 'winter' | 'summer' | 'all' = 'all'): Observable<Dish[]> {
    let filteredDishes = this.germanDishes;
    
    if (season === 'winter') {
      // Include winter-specific dishes and warm beverages
      filteredDishes = this.germanDishes.filter(dish => 
        dish.name.toLowerCase().includes('feuerzangen') || 
        dish.name.toLowerCase().includes('glühwein') ||
        dish.category !== DishCategory.GETRAENKE ||
        !dish.name.toLowerCase().includes('schorle')
      );
    } else if (season === 'summer') {
      // Exclude winter-only dishes
      filteredDishes = this.germanDishes.filter(dish => 
        !dish.name.toLowerCase().includes('feuerzangen') &&
        !dish.name.toLowerCase().includes('glühwein')
      );
    }
    
    return of(filteredDishes.map(dish => this.transformToDish(dish))).pipe(
      delay(300)
    );
  }

  /**
   * Transform German dish data to Dish model
   */
  private transformToDish(germanDish: GermanDishData): Dish {
    return {
      id: germanDish.id,
      name: germanDish.name,
      description: germanDish.description,
      price: germanDish.price,
      image: germanDish.image,
      category: germanDish.category,
      rating: germanDish.rating,
      preparationTime: germanDish.preparationTime,
      ingredients: germanDish.ingredients,
      allergens: germanDish.allergens,
      isVegetarian: germanDish.isVegetarian,
      isVegan: germanDish.isVegan,
      isGlutenFree: germanDish.isGlutenFree,
      isAvailable: germanDish.isAvailable,
      restaurantId: germanDish.restaurantId
    };
  }
}