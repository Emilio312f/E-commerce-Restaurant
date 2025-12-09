import { Injectable, signal, computed, effect } from '@angular/core';
import { Wishlist, WishlistItem } from '../../domain/entities/wishlist.entity';

const WISHLIST_STORAGE_KEY = 'restaurant_wishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistStateService {
  // State
  private wishlistSignal = signal<Wishlist>(this.loadFromStorage());

  // Public computed signals
  wishlist = computed(() => this.wishlistSignal());
  itemCount = computed(() => this.wishlistSignal().items.length);
  itemIds = computed(() => this.wishlistSignal().items.map(item => item.productId));

  constructor() {
    // Auto-save to localStorage whenever wishlist changes
    effect(() => {
      const wishlist = this.wishlistSignal();
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    });
  }

  private loadFromStorage(): Wishlist {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        parsed.items = parsed.items.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        }));
        return parsed;
      }
    } catch (error) {
      console.error('Error loading wishlist from storage:', error);
    }
    return { items: [] };
  }

  addItem(productId: string, productName: string, productImage: string, price: number): void {
    const current = this.wishlistSignal();
    
    // Check if item already exists
    if (current.items.some(item => item.productId === productId)) {
      return;
    }

    const newItem: WishlistItem = {
      id: crypto.randomUUID(),
      productId,
      productName,
      productImage,
      price,
      addedAt: new Date()
    };

    this.wishlistSignal.set({
      items: [...current.items, newItem]
    });
  }

  removeItem(itemId: string): void {
    const current = this.wishlistSignal();
    this.wishlistSignal.set({
      items: current.items.filter(item => item.id !== itemId)
    });
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistSignal().items.some(item => item.productId === productId);
  }

  toggleItem(productId: string, productName: string, productImage: string, price: number): void {
    if (this.isInWishlist(productId)) {
      const item = this.wishlistSignal().items.find(i => i.productId === productId);
      if (item) {
        this.removeItem(item.id);
      }
    } else {
      this.addItem(productId, productName, productImage, price);
    }
  }

  clearWishlist(): void {
    this.wishlistSignal.set({ items: [] });
  }
}
