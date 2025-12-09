// Implementation - Auth Repository
// Implementación concreta del repositorio de autenticación
import { Injectable } from '@angular/core';
import { Observable, of, throwError, delay, switchMap } from 'rxjs';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { User, LoginCredentials, RegisterData, AuthResponse } from '../../domain/entities/user.entity';

@Injectable({
  providedIn: 'root'
})
export class AuthRepositoryImpl extends AuthRepository {
  private readonly STORAGE_KEY = 'auth_user';
  private readonly TOKEN_KEY = 'auth_token';

  // Usuario demo para pruebas
  private readonly DEMO_USER: User = {
    id: '1',
    email: 'demo@restaurant.com',
    firstName: 'Demo',
    lastName: 'User',
    phone: '+1234567890',
    createdAt: new Date(),
    favoriteProducts: [],
    addresses: [
      {
        id: '1',
        label: 'Casa',
        street: '123 Main Street',
        city: 'New York',
        zipCode: '10001',
        isDefault: true,
      }
    ],
  };

  override login(credentials: LoginCredentials): Observable<AuthResponse> {
    // Simula validación (demo: demo@restaurant.com / password123)
    return of(null).pipe(
      delay(500),
      map(() => {
        if (credentials.email === 'demo@restaurant.com' && credentials.password === 'password123') {
          const response: AuthResponse = {
            user: this.DEMO_USER,
            token: this.generateMockToken(),
          };
          this.saveAuthData(response);
          return response;
        }
        throw new Error('Credenciales inválidas');
      })
    );
  }

  override register(data: RegisterData): Observable<AuthResponse> {
    // Simula registro
    return of(null).pipe(
      delay(500),
      map(() => {
        const newUser: User = {
          id: Date.now().toString(),
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          createdAt: new Date(),
          favoriteProducts: [],
        };
        
        const response: AuthResponse = {
          user: newUser,
          token: this.generateMockToken(),
        };
        this.saveAuthData(response);
        return response;
      })
    );
  }

  override logout(): Observable<void> {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    return of(void 0);
  }

  override getCurrentUser(): Observable<User | null> {
    const userJson = localStorage.getItem(this.STORAGE_KEY);
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        return of(user);
      } catch {
        return of(null);
      }
    }
    return of(null);
  }

  override isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  private saveAuthData(response: AuthResponse): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(response.user));
    localStorage.setItem(this.TOKEN_KEY, response.token);
  }

  private generateMockToken(): string {
    return `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

function map<T, R>(fn: () => R): import("rxjs").OperatorFunction<T, R> {
  return (source: Observable<T>) => {
    return new Observable(subscriber => {
      return source.subscribe({
        next() {
          try {
            subscriber.next(fn());
          } catch (err) {
            subscriber.error(err);
          }
        },
        error(err) {
          subscriber.error(err);
        },
        complete() {
          subscriber.complete();
        }
      });
    });
  };
}
