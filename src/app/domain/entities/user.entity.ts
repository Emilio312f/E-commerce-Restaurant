// Domain Entity - User
// Representa un usuario del sistema
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  addresses?: Address[];
  favoriteProducts?: string[];
  createdAt: Date;
}

export interface Address {
  id: string;
  label: string; // 'Casa', 'Trabajo', etc.
  street: string;
  city: string;
  zipCode: string;
  isDefault: boolean;
}

// Auth Response
export interface AuthResponse {
  user: User;
  token: string;
}

// Login/Register DTOs
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}
