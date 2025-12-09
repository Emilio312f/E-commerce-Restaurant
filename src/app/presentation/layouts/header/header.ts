import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartStateService } from '../../../application/state/cart-state.service';
import { AuthStateService } from '../../../application/state/auth-state.service';
import { SearchStateService } from '../../../application/state/search-state.service';
import { WishlistStateService } from '../../../application/state/wishlist-state.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  cartState = inject(CartStateService);
  authState = inject(AuthStateService);
  searchState = inject(SearchStateService);
  wishlistState = inject(WishlistStateService);
  private router = inject(Router);
  
  isMenuOpen = false;

  get searchQuery(): string {
    return this.searchState.searchQuery();
  }

  set searchQuery(value: string) {
    this.searchState.setSearchQuery(value);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  toggleSearch(): void {
    this.searchState.toggleSearch();
  }

  onSearchSubmit(): void {
    const query = this.searchState.searchQuery().trim();
    if (query) {
      this.router.navigate(['/menu'], { queryParams: { search: query } });
      this.searchState.closeSearch();
    }
  }
}
