// Auth State Service using Angular Signals
// Maneja el estado de autenticación del usuario
import { Injectable, signal, computed } from '@angular/core';
import { User } from '../../domain/entities/user.entity';
import { AuthRepository } from '../../domain/repositories/auth.repository';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  // Signal para el usuario actual
  private userSignal = signal<User | null>(null);

  // Computed signals
  user = this.userSignal.asReadonly();
  isAuthenticated = computed(() => this.userSignal() !== null);
  userFullName = computed(() => {
    const user = this.userSignal();
    return user ? `${user.firstName} ${user.lastName}` : '';
  });

  constructor(private authRepository: AuthRepository) {
    this.loadCurrentUser();
  }

  setUser(user: User | null): void {
    this.userSignal.set(user);
  }

  private loadCurrentUser(): void {
    this.authRepository.getCurrentUser().subscribe({
      next: (user) => this.userSignal.set(user),
      error: () => this.userSignal.set(null),
    });
  }

  logout(): void {
    this.userSignal.set(null);
  }
}
