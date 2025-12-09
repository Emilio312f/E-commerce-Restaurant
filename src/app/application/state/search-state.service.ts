import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchStateService {
  // State
  private searchQuerySignal = signal<string>('');
  private isSearchOpenSignal = signal<boolean>(false);

  // Public computed signals
  searchQuery = computed(() => this.searchQuerySignal());
  isSearchOpen = computed(() => this.isSearchOpenSignal());

  setSearchQuery(query: string): void {
    this.searchQuerySignal.set(query);
  }

  clearSearch(): void {
    this.searchQuerySignal.set('');
  }

  openSearch(): void {
    this.isSearchOpenSignal.set(true);
  }

  closeSearch(): void {
    this.isSearchOpenSignal.set(false);
    this.clearSearch();
  }

  toggleSearch(): void {
    this.isSearchOpenSignal.update(open => !open);
    if (!this.isSearchOpenSignal()) {
      this.clearSearch();
    }
  }
}
