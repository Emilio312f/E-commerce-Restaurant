// Cart State Service using Angular Signals
// Single Responsibility Principle - Solo maneja el estado del carrito
import { Injectable, signal, computed, effect } from '@angular/core';
import { Cart, CartItem, ProductCustomization } from '../../domain/entities/cart.entity';

@Injectable({
  providedIn: 'root'
})
export class CartStateService {
  private readonly STORAGE_KEY = 'shopping_cart';
  private readonly TAX_RATE = 0.08; // 8% impuesto
  private readonly DELIVERY_FEE = 5.99;

  // Signals para estado reactivo
  private cartSignal = signal<Cart>(this.loadCartFromStorage());

  // Computed signals (valores derivados)
  cart = this.cartSignal.asReadonly();
  itemCount = computed(() => 
    this.cartSignal().items.reduce((sum, item) => sum + item.quantity, 0)
  );
  subtotal = computed(() => 
    this.cartSignal().items.reduce((sum, item) => sum + item.subtotal, 0)
  );
  tax = computed(() => this.subtotal() * this.TAX_RATE);
  deliveryFee = computed(() => this.subtotal() > 0 ? this.DELIVERY_FEE : 0);
  total = computed(() => this.subtotal() + this.tax() + this.deliveryFee());

  constructor() {
    // Auto-guardar en localStorage cuando cambie el carrito usando effect
    effect(() => {
      const cart = this.cartSignal();
      if (typeof window !== 'undefined' && localStorage) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
      }
    });
  }

  addItem(
    productId: string,
    productName: string,
    productImage: string,
    price: number,
    quantity: number = 1,
    customizations?: ProductCustomization[]
  ): void {
    const currentCart = this.cartSignal();
    const existingItemIndex = currentCart.items.findIndex(
      item => item.productId === productId && 
              JSON.stringify(item.customizations) === JSON.stringify(customizations)
    );

    let updatedItems: CartItem[];

    if (existingItemIndex !== -1) {
      // Actualizar cantidad si ya existe
      updatedItems = currentCart.items.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + quantity, subtotal: (item.quantity + quantity) * item.price }
          : item
      );
    } else {
      // Agregar nuevo item
      const customizationPrice = customizations?.reduce((sum, c) => sum + (c.additionalPrice || 0), 0) || 0;
      const itemPrice = price + customizationPrice;
      
      const newItem: CartItem = {
        id: this.generateItemId(),
        productId,
        productName,
        productImage,
        price: itemPrice,
        quantity,
        customizations,
        subtotal: itemPrice * quantity,
      };
      updatedItems = [...currentCart.items, newItem];
    }

    this.updateCart({ ...currentCart, items: updatedItems, updatedAt: new Date() });
  }

  removeItem(itemId: string): void {
    const currentCart = this.cartSignal();
    const updatedItems = currentCart.items.filter(item => item.id !== itemId);
    this.updateCart({ ...currentCart, items: updatedItems, updatedAt: new Date() });
  }

  updateQuantity(itemId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(itemId);
      return;
    }

    const currentCart = this.cartSignal();
    const updatedItems = currentCart.items.map(item =>
      item.id === itemId
        ? { ...item, quantity, subtotal: item.price * quantity }
        : item
    );
    this.updateCart({ ...currentCart, items: updatedItems, updatedAt: new Date() });
  }

  clearCart(): void {
    this.updateCart(this.createEmptyCart());
  }

  private updateCart(cart: Cart): void {
    const updatedCart = {
      ...cart,
      subtotal: this.calculateSubtotal(cart.items),
      tax: this.calculateSubtotal(cart.items) * this.TAX_RATE,
      deliveryFee: cart.items.length > 0 ? this.DELIVERY_FEE : 0,
      total: this.calculateTotal(cart.items),
    };
    this.cartSignal.set(updatedCart);
  }

  private calculateSubtotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.subtotal, 0);
  }

  private calculateTotal(items: CartItem[]): number {
    const subtotal = this.calculateSubtotal(items);
    const tax = subtotal * this.TAX_RATE;
    const delivery = items.length > 0 ? this.DELIVERY_FEE : 0;
    return subtotal + tax + delivery;
  }

  private createEmptyCart(): Cart {
    return {
      id: this.generateCartId(),
      items: [],
      subtotal: 0,
      tax: 0,
      deliveryFee: 0,
      total: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  private loadCartFromStorage(): Cart {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const cart = JSON.parse(saved);
        return {
          ...cart,
          createdAt: new Date(cart.createdAt),
          updatedAt: new Date(cart.updatedAt),
        };
      }
    } catch (error) {
      console.error('Error loading cart from storage:', error);
    }
    return this.createEmptyCart();
  }

  private generateCartId(): string {
    return `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateItemId(): string {
    return `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
