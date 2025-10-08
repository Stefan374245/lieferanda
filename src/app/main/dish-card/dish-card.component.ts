import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Dish } from '../../models/dish.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-dish-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatSnackBarModule
  ],
  templateUrl: './dish-card.component.html',
  styleUrl: './dish-card.component.scss'
})
export class DishCardComponent implements OnInit {
  @Input() dish!: Dish;

  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  addToCart(): void {
    if (!this.dish.isAvailable) {
      this.snackBar.open('Dieses Gericht ist momentan nicht verfügbar', 'OK', {
        duration: 3000
      });
      return;
    }

    this.cartService.addToCart(this.dish);
    this.snackBar.open(`${this.dish.name} wurde zum Warenkorb hinzugefügt`, 'OK', {
      duration: 3000
    });
  }

  generateStars(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);
    
    const stars: string[] = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('star');
    }
    
    if (hasHalfStar) {
      stars.push('star_half');
    }
    
    for (let i = 0; i < emptyStars; i++) {
      stars.push('star_border');
    }
    
    return stars;
  }

  getDietaryIcons(): string[] {
    const icons: string[] = [];
    if (this.dish.isVegetarian) icons.push('eco');
    if (this.dish.isVegan) icons.push('spa');
    if (this.dish.isGlutenFree) icons.push('no_food');
    return icons;
  }
}