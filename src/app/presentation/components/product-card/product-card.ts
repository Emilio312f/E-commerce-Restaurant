import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../domain/entities/product.entity';
import { WishlistStateService } from '../../../application/state/wishlist-state.service';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() addToCart = new EventEmitter<Product>();
  
  wishlistState = inject(WishlistStateService);

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }

  toggleWishlist(): void {
    this.wishlistState.toggleItem(
      this.product.id,
      this.product.name,
      this.product.imageUrl,
      this.product.price
    );
  }

  isInWishlist(): boolean {
    return this.wishlistState.isInWishlist(this.product.id);
  }
}
