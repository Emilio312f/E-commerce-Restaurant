// Product Service - Application Layer
// Orquesta las operaciones relacionadas con productos (Use Cases)
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductCategory } from '../../domain/entities/product.entity';
import { ProductRepository } from '../../domain/repositories/product.repository';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  getAllProducts(): Observable<Product[]> {
    return this.productRepository.getAll();
  }

  getProductById(id: string): Observable<Product | undefined> {
    return this.productRepository.getById(id);
  }

  getProductsByCategory(category: ProductCategory): Observable<Product[]> {
    return this.productRepository.getByCategory(category);
  }

  searchProducts(query: string): Observable<Product[]> {
    return this.productRepository.search(query);
  }

  getFeaturedProducts(): Observable<Product[]> {
    return this.productRepository.getFeatured();
  }

  // Use Case: Filtrar productos por múltiples criterios
  filterProducts(
    products: Product[],
    filters: {
      categories?: ProductCategory[];
      minPrice?: number;
      maxPrice?: number;
      tags?: string[];
      isAvailable?: boolean;
    }
  ): Product[] {
    return products.filter(product => {
      if (filters.categories && !filters.categories.includes(product.category)) {
        return false;
      }
      if (filters.minPrice !== undefined && product.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
        return false;
      }
      if (filters.tags && filters.tags.length > 0) {
        const hasTag = filters.tags.some(tag => product.tags?.includes(tag));
        if (!hasTag) return false;
      }
      if (filters.isAvailable !== undefined && product.isAvailable !== filters.isAvailable) {
        return false;
      }
      return true;
    });
  }

  // Use Case: Ordenar productos
  sortProducts(products: Product[], sortBy: 'price-asc' | 'price-desc' | 'rating' | 'name'): Product[] {
    const sorted = [...products];
    
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sorted;
    }
  }
}
