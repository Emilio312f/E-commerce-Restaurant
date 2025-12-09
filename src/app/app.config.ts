import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

// Repository Providers (Dependency Injection - DIP)
import { ProductRepository } from './domain/repositories/product.repository';
import { ProductRepositoryImpl } from './infrastructure/repositories/product-repository.impl';
import { AuthRepository } from './domain/repositories/auth.repository';
import { AuthRepositoryImpl } from './infrastructure/repositories/auth-repository.impl';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    // Dependency Injection - Inversión de dependencias (SOLID)
    { provide: ProductRepository, useClass: ProductRepositoryImpl },
    { provide: AuthRepository, useClass: AuthRepositoryImpl },
  ]
};
