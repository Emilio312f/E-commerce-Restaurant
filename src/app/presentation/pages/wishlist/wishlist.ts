import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WishlistStateService } from '../../../application/state/wishlist-state.service';
import { CartStateService } from '../../../application/state/cart-state.service';
import { ProductService } from '../../../application/services/product.service';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.scss',
})
export class WishlistComponent {
  wishlistState = inject(WishlistStateService);
  private cartState = inject(CartStateService);
  private productService = inject(ProductService);

  removeFromWishlist(itemId: string): void {
    this.wishlistState.removeItem(itemId);
  }

  addToCart(item: any): void {
    this.cartState.addItem(
      item.productId,
      item.productName,
      item.productImage,
      item.price,
      1
    );
  }

  clearWishlist(): void {
    if (confirm('¿Estás seguro de que deseas vaciar tu lista de favoritos?')) {
      this.wishlistState.clearWishlist();
    }
  }
}
