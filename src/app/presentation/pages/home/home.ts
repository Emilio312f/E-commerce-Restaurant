import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card';
import { ProductService } from '../../../application/services/product.service';
import { CartStateService } from '../../../application/state/cart-state.service';
import { Product } from '../../../domain/entities/product.entity';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  private cartState = inject(CartStateService);
  private router = inject(Router);

  featuredProducts: Product[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.loadFeaturedProducts();
  }

  loadFeaturedProducts(): void {
    this.productService.getFeaturedProducts().subscribe({
      next: (products) => {
        this.featuredProducts = products;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
      }
    });
  }

  addToCart(product: Product): void {
    this.cartState.addItem(
      product.id,
      product.name,
      product.imageUrl,
      product.price,
      1
    );
  }

  navigateToMenu(): void {
    this.router.navigate(['/menu']);
  }

  navigateToAbout(): void {
    this.router.navigate(['/nosotros']);
  }
}
