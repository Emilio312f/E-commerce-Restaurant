// Auth Service - Application Layer
// Orquesta las operaciones de autenticación
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { AuthResponse, LoginCredentials, RegisterData, User } from '../../domain/entities/user.entity';
import { AuthStateService } from '../state/auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private authStateService: AuthStateService
  ) {}

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.authRepository.login(credentials).pipe(
      tap(response => this.authStateService.setUser(response.user))
    );
  }

  register(data: RegisterData): Observable<AuthResponse> {
    return this.authRepository.register(data).pipe(
      tap(response => this.authStateService.setUser(response.user))
    );
  }

  logout(): Observable<void> {
    return this.authRepository.logout().pipe(
      tap(() => this.authStateService.logout())
    );
  }

  getCurrentUser(): Observable<User | null> {
    return this.authRepository.getCurrentUser();
  }

  isAuthenticated(): boolean {
    return this.authRepository.isAuthenticated();
  }
}
