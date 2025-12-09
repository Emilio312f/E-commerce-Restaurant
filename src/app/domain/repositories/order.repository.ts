// Repository Interface - Order Repository
// Define el contrato para operaciones con órdenes
import { Observable } from 'rxjs';
import { Order } from '../entities/order.entity';

export abstract class OrderRepository {
  abstract create(order: Omit<Order, 'id' | 'createdAt'>): Observable<Order>;
  abstract getById(id: string): Observable<Order | undefined>;
  abstract getByUserId(userId: string): Observable<Order[]>;
  abstract updateStatus(orderId: string, status: string): Observable<Order>;
}
