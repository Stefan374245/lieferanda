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
      cuisine: ['Italienisch', 'Pizza'],
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
      cuisine: ['Chinesisch', 'Asiatisch'],
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
      name: 'El Sombrero',
      description: 'Feurige mexikanische Spezialitäten und frische Burritos',
      cuisine: ['Mexikanisch', 'Tex-Mex'],
      rating: 4.3,
      reviewCount: 156,
      deliveryTime: '35-45 Min',
      deliveryFee: 2.49,
      minimumOrder: 18.00,
      coverImage: 'assets/img/images/restaurants/el-sombrero-cover.jpg',
      logo: 'assets/img/images/restaurants/el-sombrero-logo.jpg',
      address: 'Kreuzbergstraße 88',
      city: 'Berlin',
      isOpen: false,
      isDelivering: false,
      priceLevel: 2
    },
    {
      id: '4',
      name: 'Maharaja Palace',
      description: 'Exotische indische Curries und Tandoori-Spezialitäten',
      cuisine: ['Indisch', 'Curry'],
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
      cuisine: ['Burger', 'Fast Food'],
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
      cuisine: ['Japanisch', 'Sushi'],
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
      cuisine: ['Türkisch', 'Döner'],
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
      cuisine: ['Café', 'Desserts'],
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
      cuisine: ['Italienisch', 'Pasta'],
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
      cuisine: ['Vietnamesisch', 'Suppen'],
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
   * Filter restaurants by cuisine
   */
  filterByCuisine(cuisine: string): Observable<Restaurant[]> {
    const filtered = this.mockRestaurants.filter(restaurant => 
      restaurant.cuisine.includes(cuisine)
    );

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