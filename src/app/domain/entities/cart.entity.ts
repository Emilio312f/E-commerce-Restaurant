// Domain Entity - Cart
// Representa el carrito de compras del usuario
export interface Cart {
  id: string;
  userId?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  customizations?: ProductCustomization[];
  subtotal: number;
}

export interface ProductCustomization {
  type: CustomizationType;
  name: string;
  value: string;
  additionalPrice?: number;
}

export enum CustomizationType {
  SIZE = 'size',
  EXTRA = 'extra',
  REMOVE = 'remove',
  SPECIAL_REQUEST = 'special-request',
}
