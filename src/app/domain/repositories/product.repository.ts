// Repository Interface - Product Repository
// Define el contrato para operaciones con productos (Interface Segregation Principle)
import { Observable } from 'rxjs';
import { Product, ProductCategory } from '../entities/product.entity';

export abstract class ProductRepository {
  abstract getAll(): Observable<Product[]>;
  abstract getById(id: string): Observable<Product | undefined>;
  abstract getByCategory(category: ProductCategory): Observable<Product[]>;
  abstract search(query: string): Observable<Product[]>;
  abstract getFeatured(): Observable<Product[]>;
}
