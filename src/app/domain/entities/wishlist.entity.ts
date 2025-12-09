// Wishlist Entity
export interface WishlistItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  addedAt: Date;
}

export interface Wishlist {
  items: WishlistItem[];
}
