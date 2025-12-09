// Implementation - Product Repository
// Implementación concreta del repositorio de productos (Dependency Inversion Principle)
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { Product, ProductCategory } from '../../domain/entities/product.entity';
import { MOCK_PRODUCTS } from '../data/products.data';

@Injectable({
  providedIn: 'root'
})
export class ProductRepositoryImpl extends ProductRepository {
  private products: Product[] = MOCK_PRODUCTS;

  override getAll(): Observable<Product[]> {
    return of([...this.products]);
  }

  override getById(id: string): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product);
  }

  override getByCategory(category: ProductCategory): Observable<Product[]> {
    const filtered = this.products.filter(p => p.category === category);
    return of(filtered);
  }

  override search(query: string): Observable<Product[]> {
    const lowerQuery = query.toLowerCase();
    const results = this.products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
    return of(results);
  }

  override getFeatured(): Observable<Product[]> {
    // Retorna productos con mejor rating o etiquetados como bestseller
    const featured = this.products
      .filter(p => (p.rating && p.rating >= 4.7) || p.tags?.includes('bestseller'))
      .slice(0, 6);
    return of(featured);
  }
}
