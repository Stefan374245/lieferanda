import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';

export interface MockRestaurantData {
  id: string;
  name: string;
  description: string;
  cuisine: string[];
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  minimumOrder: number;
  coverImage: string;
  logo: string;
  address: string;
  city: string;
  isOpen: boolean;
  isDelivering: boolean;
  priceLevel: number;
}

@Injectable({
  providedIn: 'root'
})
export class MockRestaurantService {

  private mockRestaurants: MockRestaurantData[] = [
    {
      id: '1',
      name: 'Bella Vista Pizzeria',
      description: 'Authentische italienische Pizza aus dem Steinofen',
      cuisine: ['Italienisch'], // Vereinfacht
      rating: 4.7,
      reviewCount: 342,
      deliveryTime: '25-35 Min',
      deliveryFee: 2.99,
      minimumOrder: 15.00,
      coverImage: 'assets/img/images/restaurants/bella-vista-cover.jpg',
      logo: 'assets/img/images/restaurants/bella-vista-logo.jpg',
      address: 'Hauptstraße 45',
      city: 'Berlin',
      isOpen: true,
      isDelivering: true,
      priceLevel: 2
    },
    {
      id: '2',
      name: 'Dragon Palace',
      description: 'Traditionelle chinesische Küche mit modernem Touch',
      cuisine: ['Asiatisch'], // Vereinfacht
      rating: 4.5,
      reviewCount: 278,
      deliveryTime: '30-40 Min',
      deliveryFee: 3.49,
      minimumOrder: 20.00,
      coverImage: 'assets/img/images/restaurants/dragon-palace-cover.jpg',
      logo: 'assets/img/images/restaurants/dragon-palace-logo.jpg',
      address: 'Friedrichstraße 12',
      city: 'Berlin',
      isOpen: true,
      isDelivering: true,
      priceLevel: 2
    },
    {
      id: '3',
      name: 'Tapas y Más',
      description: 'Authentische spanische Tapas und traditionelle Gerichte',
      cuisine: ['Spanisch'], // Vereinfacht
      rating: 4.7,
      reviewCount: 256,
      deliveryTime: '30-40 Min',
      deliveryFee: 2.99,
      minimumOrder: 16.00,
      coverImage: 'assets/img/images/restaurants/tapas-cover.jpg',
      logo: 'assets/img/images/restaurants/tapas-logo.jpg',
      address: 'Kreuzbergstraße 88',
      city: 'Berlin',
      isOpen: true,
      isDelivering: true,
      priceLevel: 2
    },
    {
      id: '4',
      name: 'Maharaja Palace',
      description: 'Exotische indische Curries und Tandoori-Spezialitäten',
      cuisine: ['Asiatisch'], // Indisch gehört zu Asiatisch
      rating: 4.6,
      reviewCount: 423,
      deliveryTime: '40-50 Min',
      deliveryFee: 3.99,
      minimumOrder: 22.00,
      coverImage: 'assets/img/images/restaurants/maharaja-cover.jpg',
      logo: 'assets/img/images/restaurants/maharaja-logo.jpg',
      address: 'Oranienstraße 34',
      city: 'Berlin',
      isOpen: true,
      isDelivering: true,
      priceLevel: 3
    },
    {
      id: '5',
      name: 'Burger König',
      description: 'Saftige Burger und knusprige Pommes',
      cuisine: ['Deutsch'], // Fast Food → Deutsch
      rating: 4.1,
      reviewCount: 234,
      deliveryTime: '20-30 Min',
      deliveryFee: 1.99,
      minimumOrder: 12.00,
      coverImage: 'assets/img/images/restaurants/burger-koenig-cover.jpg',
      logo: 'assets/img/images/restaurants/burger-koenig-logo.jpg',
      address: 'Alexanderplatz 5',
      city: 'Berlin',
      isOpen: true,
      isDelivering: true,
      priceLevel: 1
    },
    {
      id: '6',
      name: 'Sakura Sushi',
      description: 'Frisches Sushi und japanische Delikatessen',
      cuisine: ['Asiatisch'], // Japanisch gehört zu Asiatisch
      rating: 4.8,
      reviewCount: 567,
      deliveryTime: '45-55 Min',
      deliveryFee: 4.99,
      minimumOrder: 25.00,
      coverImage: 'assets/img/images/restaurants/sakura-cover.jpg',
      logo: 'assets/img/images/restaurants/sakura-logo.jpg',
      address: 'Potsdamer Platz 1',
      city: 'Berlin',
      isOpen: true,
      isDelivering: true,
      priceLevel: 3
    },
    {
      id: '7',
      name: 'Döner King',
      description: 'Der beste Döner der Stadt mit frischen Zutaten',
      cuisine: ['Deutsch'], // Türkisch/Döner → Deutsch
      rating: 4.2,
      reviewCount: 189,
      deliveryTime: '15-25 Min',
      deliveryFee: 1.49,
      minimumOrder: 8.00,
      coverImage: 'assets/img/images/restaurants/doener-king-cover.jpg',
      logo: 'assets/img/images/restaurants/doener-king-logo.jpg',
      address: 'Kantstraße 67',
      city: 'Berlin',
      isOpen: true,
      isDelivering: true,
      priceLevel: 1
    },
    {
      id: '8',
      name: 'Café Central',
      description: 'Gemütliches Café mit hausgemachten Kuchen und Kaffee',
      cuisine: ['Deutsch'], // Café → Deutsch
      rating: 4.4,
      reviewCount: 298,
      deliveryTime: '30-40 Min',
      deliveryFee: 2.99,
      minimumOrder: 10.00,
      coverImage: 'assets/img/images/restaurants/cafe-central-cover.jpg',
      logo: 'assets/img/images/restaurants/cafe-central-logo.jpg',
      address: 'Unter den Linden 23',
      city: 'Berlin',
      isOpen: true,
      isDelivering: true,
      priceLevel: 2
    },
    {
      id: '9',
      name: 'Pasta Amore',
      description: 'Hausgemachte Pasta nach traditionellen Rezepten',
      cuisine: ['Italienisch'], // Pasta → Italienisch
      rating: 4.6,
      reviewCount: 378,
      deliveryTime: '35-45 Min',
      deliveryFee: 3.49,
      minimumOrder: 16.00,
      coverImage: 'assets/img/images/restaurants/pasta-amore-cover.jpg',
      logo: 'assets/img/images/restaurants/pasta-amore-logo.jpg',
      address: 'Prenzlauer Berg 45',
      city: 'Berlin',
      isOpen: true,
      isDelivering: true,
      priceLevel: 2
    },
    {
      id: '10',
      name: 'Pho Saigon',
      description: 'Vietnamesische Pho-Suppen und Frühlingsrollen',
      cuisine: ['Asiatisch'], // Vietnamesisch gehört zu Asiatisch
      rating: 4.5,
      reviewCount: 201,
      deliveryTime: '40-50 Min',
      deliveryFee: 3.99,
      minimumOrder: 19.00,
      coverImage: 'assets/img/images/restaurants/pho-saigon-cover.jpg',
      logo: 'assets/img/images/restaurants/pho-saigon-logo.jpg',
      address: 'Warschauer Straße 12',
      city: 'Berlin',
      isOpen: true,
      isDelivering: true,
      priceLevel: 2
    },
    // Erweiterte Italienische Restaurants
    {
      id: '11',
      name: 'Da Vinci Ristorante',
      description: 'Edle italienische Küche mit Meeresfrüchten und Fleischspezialitäten',
      cuisine: ['Italienisch'],
      rating: 4.8,
      reviewCount: 445,
      deliveryTime: '40-50 Min',
      deliveryFee: 4.49,
      minimumOrder: 25.00,
      coverImage: 'assets/img/images/restaurants/da-vinci-cover.jpg',
      logo: 'assets/img/images/restaurants/da-vinci-logo.jpg',
      address: 'Kurfürstendamm 156',
      city: 'Berlin',
      isOpen: true,
      isDelivering: true,
      priceLevel: 3
    },
    {
      id: '12',
      name: 'Mama Mia Trattoria',
      description: 'Familiäre Atmosphäre mit traditionellen italienischen Gerichten',
      cuisine: ['Italienisch'],
      rating: 4.3,
      reviewCount: 267,
      deliveryTime: '30-40 Min',
      deliveryFee: 2.99,
      minimumOrder: 18.00,
      coverImage: 'assets/img/images/restaurants/mama-mia-cover.jpg',
      logo: 'assets/img/images/restaurants/mama-mia-logo.jpg',
      address: 'Hackescher Markt 8',
      city: 'Berlin',
      isOpen: true,
      isDelivering: true,
      priceLevel: 2
    },
    {
      id: '13',
      name: 'Pizzeria Napoletana',
      description: 'Authentische neapolitanische Pizza nach traditioneller Art',
      cuisine: ['Italienisch'],
      rating: 4.7,
      reviewCount: 523,
      deliveryTime: '25-35 Min',
      deliveryFee: 2.49,
      minimumOrder: 14.00,
      coverImage: 'assets/img/images/restaurants/napoletana-cover.jpg',
      logo: 'assets/img/images/restaurants/napoletana-logo.jpg',
      address: 'Schönhauser Allee 89',
      city: 'Berlin',
      isOpen: true,
      isDelivering: true,
      priceLevel: 2
    },
    {
      id: '14',
      name: 'Gelato Paradiso',
      description: 'Italienische Gelato-Bar mit hausgemachtem Eis und Desserts',
      cuisine: ['Italienisch'],
      rating: 4.9,
      reviewCount: 189,
      deliveryTime: '20-30 Min',
      deliveryFee: 1.99,
      minimumOrder: 8.00,
      coverImage: 'assets/img/images/restaurants/gelato-paradiso-cover.jpg',
      logo: 'assets/img/images/restaurants/gelato-paradiso-logo.jpg',
      address: 'Münzstraße 15',
      city: 'Berlin',
      isOpen: true,
      isDelivering: true,
      priceLevel: 1
    },
    // Erweiterte Spanische Restaurants  
    {
      id: '15',
      name: 'El Toro Loco',
      description: 'Lebendige spanische Tapas-Bar mit Flamenco-Atmosphäre',
      cuisine: ['Spanisch'],
      rating: 4.5,
      reviewCount: 334,
      deliveryTime: '35-45 Min',
      deliveryFee: 3.49,
      minimumOrder: 20.00,
      coverImage: 'assets/img/images/restaurants/el-toro-cover.jpg',
      logo: 'assets/img/images/restaurants/el-toro-logo.jpg',
      address: 'Bergmannstraße 102',
      city: 'Berlin',
      isOpen: true,
      isDelivering: true,
      priceLevel: 2
    },
    {
      id: '16',
      name: 'Paella Valencia',
      description: 'Spezialist für authentische Paella aus Valencia',
      cuisine: ['Spanisch'],
      rating: 4.6,
      reviewCount: 278,
      deliveryTime: '50-60 Min',
      deliveryFee: 4.99,
      minimumOrder: 28.00,
      coverImage: 'assets/img/images/restaurants/paella-valencia-cover.jpg',
      logo: 'assets/img/images/restaurants/paella-valencia-logo.jpg',
      address: 'Savignyplatz 7',
      city: 'Berlin',
      isOpen: true,
      isDelivering: true,
      priceLevel: 3
    },
    {
      id: '17',
      name: 'Casa Andalucia',
      description: 'Südspanische Küche mit Jamón Ibérico und Sherry',
      cuisine: ['Spanisch'],
      rating: 4.4,
      reviewCount: 198,
      deliveryTime: '40-50 Min',
      deliveryFee: 3.99,
      minimumOrder: 22.00,
      coverImage: 'assets/img/images/restaurants/casa-andalucia-cover.jpg',
      logo: 'assets/img/images/restaurants/casa-andalucia-logo.jpg',
      address: 'Torstraße 44',
      city: 'Berlin',
      isOpen: true,
      isDelivering: true,
      priceLevel: 2
    },
    {
      id: '18',
      name: 'Bodega Catalana',
      description: 'Katalanische Spezialitäten und erstklassige Sangria',
      cuisine: ['Spanisch'],
      rating: 4.7,
      reviewCount: 412,
      deliveryTime: '35-45 Min',
      deliveryFee: 3.49,
      minimumOrder: 19.00,
      coverImage: 'assets/img/images/restaurants/bodega-catalana-cover.jpg',
      logo: 'assets/img/images/restaurants/bodega-catalana-logo.jpg',
      address: 'Rosenthaler Straße 68',
      city: 'Berlin',
      isOpen: true,
      isDelivering: true,
      priceLevel: 2
    },
    {
      id: '19',
      name: 'Churros Madrid',
      description: 'Süße spanische Leckereien und traditioneller Café con Leche',
      cuisine: ['Spanisch'],
      rating: 4.2,
      reviewCount: 156,
      deliveryTime: '20-30 Min',
      deliveryFee: 2.49,
      minimumOrder: 12.00,
      coverImage: 'assets/img/images/restaurants/churros-madrid-cover.jpg',
      logo: 'assets/img/images/restaurants/churros-madrid-logo.jpg',
      address: 'Gendarmenmarkt 3',
      city: 'Berlin',
      isOpen: true,
      isDelivering: true,
      priceLevel: 1
    },
    // Erweiterte Deutsche Restaurants
    {
      id: '20',
      name: 'Zur Alten Schmiede',
      description: 'Traditionelle deutsche Hausmannskost in rustikalem Ambiente',
      cuisine: ['Deutsch'],
      rating: 4.5,
      reviewCount: 387,
      deliveryTime: '35-45 Min',
      deliveryFee: 3.49,
      minimumOrder: 20.00,
      coverImage: 'assets/img/images/restaurants/alte-schmiede-cover.jpg',
      logo: 'assets/img/images/restaurants/alte-schmiede-logo.jpg',
      address: 'Große Hamburger Straße 32',
      city: 'Berlin',
      isOpen: true,
      isDelivering: true,
      priceLevel: 2
    },
    {
      id: '21',
      name: 'Berliner Weißbier-Stube',
      description: 'Berliner Spezialitäten mit Eisbein und Sauerkraut',
      cuisine: ['Deutsch'],
      rating: 4.3,
      reviewCount: 298,
      deliveryTime: '40-50 Min',
      deliveryFee: 3.99,
      minimumOrder: 18.00,
      coverImage: 'assets/img/images/restaurants/weissbier-stube-cover.jpg',
      logo: 'assets/img/images/restaurants/weissbier-stube-logo.jpg',
      address: 'Nikolaiviertel 14',
      city: 'Berlin',
      isOpen: true,
      isDelivering: true,
      priceLevel: 2
    },
    // Erweiterte Asiatische Restaurants
    {
      id: '22',
      name: 'Thai Orchid',
      description: 'Authentische thailändische Küche mit frischen Kräutern',
      cuisine: ['Asiatisch'],
      rating: 4.6,
      reviewCount: 445,
      deliveryTime: '35-45 Min',
      deliveryFee: 3.99,
      minimumOrder: 21.00,
      coverImage: 'assets/img/images/restaurants/thai-orchid-cover.jpg',
      logo: 'assets/img/images/restaurants/thai-orchid-logo.jpg',
      address: 'Wienerstraße 24',
      city: 'Berlin',
      isOpen: true,
      isDelivering: true,
      priceLevel: 2
    }
  ];

  constructor() { }

  /**
   * Get all restaurants
   */
  getAllRestaurants(): Observable<Restaurant[]> {
    return of(this.mockRestaurants).pipe(
      delay(800), // Simulate API delay
      map(restaurants => restaurants.map(r => this.transformToRestaurant(r)))
    );
  }

  /**
   * Search restaurants by query
   */
  searchRestaurants(query: string): Observable<Restaurant[]> {
    const filtered = this.mockRestaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
      restaurant.description.toLowerCase().includes(query.toLowerCase()) ||
      restaurant.cuisine.some(c => c.toLowerCase().includes(query.toLowerCase())) ||
      restaurant.address.toLowerCase().includes(query.toLowerCase())
    );

    return of(filtered).pipe(
      delay(600),
      map(restaurants => restaurants.map(r => this.transformToRestaurant(r)))
    );
  }

  /**
   * Filter restaurants by cuisine with debug logging
   */
  filterByCuisine(cuisine: string): Observable<Restaurant[]> {
    console.log('Filtering by cuisine:', cuisine);
    
    const filtered = this.mockRestaurants.filter(restaurant => {
      const matches = restaurant.cuisine.includes(cuisine);
      console.log(`Restaurant ${restaurant.name} has cuisine ${restaurant.cuisine}, matches ${cuisine}:`, matches);
      return matches;
    });

    console.log('Filtered restaurants:', filtered.map(r => r.name));

    return of(filtered).pipe(
      delay(400),
      map(restaurants => restaurants.map(r => this.transformToRestaurant(r)))
    );
  }

  /**
   * Get featured restaurants (top rated)
   */
  getFeaturedRestaurants(): Observable<Restaurant[]> {
    const featured = this.mockRestaurants
      .filter(r => r.rating >= 4.5)
      .slice(0, 6);

    return of(featured).pipe(
      delay(500),
      map(restaurants => restaurants.map(r => this.transformToRestaurant(r)))
    );
  }

  /**
   * Get restaurant by ID
   */
  getRestaurantById(id: string): Observable<Restaurant | null> {
    const restaurant = this.mockRestaurants.find(r => r.id === id);
    
    return of(restaurant ? this.transformToRestaurant(restaurant) : null).pipe(
      delay(300)
    );
  }

  /**
   * Get restaurants with filters
   */
  getRestaurantsWithFilters(filters: {
    cuisine?: string;
    minRating?: number;
    maxDeliveryFee?: number;
    maxDeliveryTime?: number;
    isOpen?: boolean;
  }): Observable<Restaurant[]> {
    let filtered = [...this.mockRestaurants];

    if (filters.cuisine && filters.cuisine !== 'Alle') {
      filtered = filtered.filter(r => r.cuisine.includes(filters.cuisine!));
    }

    if (filters.minRating) {
      filtered = filtered.filter(r => r.rating >= filters.minRating!);
    }

    if (filters.maxDeliveryFee) {
      filtered = filtered.filter(r => r.deliveryFee <= filters.maxDeliveryFee!);
    }

    if (filters.maxDeliveryTime) {
      const maxTime = filters.maxDeliveryTime;
      filtered = filtered.filter(r => {
        const timeRange = r.deliveryTime.match(/\d+/g);
        const maxDeliveryTime = timeRange ? parseInt(timeRange[1]) : 60;
        return maxDeliveryTime <= maxTime;
      });
    }

    if (filters.isOpen !== undefined) {
      filtered = filtered.filter(r => r.isOpen === filters.isOpen);
    }

    return of(filtered).pipe(
      delay(400),
      map(restaurants => restaurants.map(r => this.transformToRestaurant(r)))
    );
  }

  /**
   * Transform mock data to Restaurant model
   */
  private transformToRestaurant(mockData: MockRestaurantData): Restaurant {
    return {
      id: mockData.id,
      name: mockData.name,
      description: mockData.description,
      logo: mockData.logo,
      coverImage: mockData.coverImage,
      rating: mockData.rating,
      reviewCount: mockData.reviewCount,
      deliveryTime: this.parseDeliveryTime(mockData.deliveryTime),
      deliveryFee: mockData.deliveryFee,
      minimumOrder: mockData.minimumOrder,
      cuisine: mockData.cuisine,
      address: {
        street: mockData.address.split(' ')[0],
        number: mockData.address.split(' ')[1] || '',
        city: mockData.city,
        zipCode: this.generateZipCode(),
        country: 'Deutschland'
      },
      openingHours: this.generateOpeningHours(),
      isOpen: mockData.isOpen,
      isDelivering: mockData.isDelivering
    };
  }

  /**
   * Parse delivery time string to number
   */
  private parseDeliveryTime(timeString: string): number {
    const matches = timeString.match(/(\d+)-(\d+)/);
    if (matches) {
      return parseInt(matches[2]); // Return max time
    }
    return 30; // Default
  }

  /**
   * Generate random ZIP code
   */
  private generateZipCode(): string {
    return '1' + Math.floor(Math.random() * 9000 + 1000).toString();
  }

  /**
   * Generate opening hours
   */
  private generateOpeningHours(): any {
    const defaultHours = { open: '10:00', close: '22:00', isClosed: false };
    
    return {
      monday: defaultHours,
      tuesday: defaultHours,
      wednesday: defaultHours,
      thursday: defaultHours,
      friday: { open: '10:00', close: '23:00', isClosed: false },
      saturday: { open: '10:00', close: '23:00', isClosed: false },
      sunday: { open: '11:00', close: '21:00', isClosed: false }
    };
  }
}