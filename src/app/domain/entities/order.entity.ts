// Domain Entity - Order
// Representa una orden completada
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  deliveryInfo: DeliveryInfo;
  paymentMethod: PaymentMethod;
  createdAt: Date;
  estimatedDeliveryTime?: Date;
  notes?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  customizations?: string[];
  subtotal: number;
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  READY = 'ready',
  ON_DELIVERY = 'on-delivery',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export interface DeliveryInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  deliveryInstructions?: string;
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit-card',
  DEBIT_CARD = 'debit-card',
  CASH = 'cash',
  PAYPAL = 'paypal',
}
