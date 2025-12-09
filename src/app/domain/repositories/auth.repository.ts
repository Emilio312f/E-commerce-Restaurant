// Repository Interface - Auth Repository
// Define el contrato para operaciones de autenticación
import { Observable } from 'rxjs';
import { User, LoginCredentials, RegisterData, AuthResponse } from '../entities/user.entity';

export abstract class AuthRepository {
  abstract login(credentials: LoginCredentials): Observable<AuthResponse>;
  abstract register(data: RegisterData): Observable<AuthResponse>;
  abstract logout(): Observable<void>;
  abstract getCurrentUser(): Observable<User | null>;
  abstract isAuthenticated(): boolean;
}
