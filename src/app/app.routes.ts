import { Routes } from '@angular/router';
import { HomeComponent } from './presentation/pages/home/home';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'menu',
    loadComponent: () => import('./presentation/pages/menu/menu').then(m => m.MenuComponent),
  },
  {
    path: 'nosotros',
    loadComponent: () => import('./presentation/pages/about/about').then(m => m.AboutComponent),
  },
  {
    path: 'contacto',
    loadComponent: () => import('./presentation/pages/contact/contact').then(m => m.ContactComponent),
  },
  {
    path: 'cart',
    loadComponent: () => import('./presentation/pages/cart/cart').then(m => m.CartComponent),
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./presentation/pages/wishlist/wishlist').then(m => m.WishlistComponent),
  },
  {
    path: 'checkout',
    loadComponent: () => import('./presentation/pages/checkout/checkout').then(m => m.CheckoutComponent),
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./presentation/pages/auth/login/login').then(m => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () => import('./presentation/pages/auth/register/register').then(m => m.RegisterComponent),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./presentation/pages/not-found/not-found').then(m => m.NotFoundComponent),
  },
];
