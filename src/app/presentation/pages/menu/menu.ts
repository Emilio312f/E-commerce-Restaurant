import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card';
import { ProductService } from '../../../application/services/product.service';
import { CartStateService } from '../../../application/state/cart-state.service';
import { SearchStateService } from '../../../application/state/search-state.service';
import { Product, ProductCategory } from '../../../domain/entities/product.entity';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class MenuComponent implements OnInit {
  private productService = inject(ProductService);
  private cartState = inject(CartStateService);
  private searchState = inject(SearchStateService);
  private route = inject(ActivatedRoute);

  // Exponer el enum para usarlo en el template
  ProductCategory = ProductCategory;

  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: ProductCategory | null = null;
  selectedSort: 'price-asc' | 'price-desc' | 'rating' | 'name' = 'name';
  priceRange: { min: number; max: number } = { min: 0, max: 100 };
  isLoading = true;

  ngOnInit(): void {
    this.loadProducts();
    
    // Listen to query params for search
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchProducts(params['search']);
      }
    });
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.allProducts = products;
        this.filteredProducts = products;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
      }
    });
  }

  searchProducts(query: string): void {
    if (!query.trim()) {
      this.filteredProducts = this.allProducts;
      return;
    }
    
    this.filteredProducts = this.allProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description?.toLowerCase().includes(query.toLowerCase()) ||
      product.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
  }

  filterByCategory(category: ProductCategory | null): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  onSortChange(sortBy: 'price-asc' | 'price-desc' | 'rating' | 'name'): void {
    this.selectedSort = sortBy;
    this.filteredProducts = this.productService.sortProducts(this.filteredProducts, sortBy);
  }

  onPriceRangeChange(min: number, max: number): void {
    this.priceRange = { min, max };
    this.applyFilters();
  }

  applyFilters(): void {
    let products = [...this.allProducts];

    // Filter by category
    if (this.selectedCategory !== null) {
      products = products.filter(p => p.category === this.selectedCategory);
    }

    // Filter by price range
    products = products.filter(p => 
      p.price >= this.priceRange.min && p.price <= this.priceRange.max
    );

    // Sort
    this.filteredProducts = this.productService.sortProducts(products, this.selectedSort);
  }

  clearFilters(): void {
    this.selectedCategory = null;
    this.selectedSort = 'name';
    this.priceRange = { min: 0, max: 100 };
    this.filteredProducts = this.allProducts;
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
}
