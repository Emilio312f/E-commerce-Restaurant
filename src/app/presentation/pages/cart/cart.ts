import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartStateService } from '../../../application/state/cart-state.service';
import { CartItem } from '../../../domain/entities/cart.entity';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class CartComponent {
  cartState = inject(CartStateService);
  private router = inject(Router);

  showDeleteModal = false;
  itemToDelete: string | null = null;
  showClearModal = false;

  increaseQuantity(item: CartItem): void {
    this.cartState.updateQuantity(item.id, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.cartState.updateQuantity(item.id, item.quantity - 1);
    }
  }

  confirmRemoveItem(itemId: string): void {
    this.itemToDelete = itemId;
    this.showDeleteModal = true;
  }

  removeItem(): void {
    if (this.itemToDelete) {
      this.cartState.removeItem(this.itemToDelete);
      this.closeDeleteModal();
    }
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.itemToDelete = null;
  }

  confirmClearCart(): void {
    this.showClearModal = true;
  }

  clearCart(): void {
    this.cartState.clearCart();
    this.closeClearModal();
  }

  closeClearModal(): void {
    this.showClearModal = false;
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}
