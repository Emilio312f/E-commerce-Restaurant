// Domain Entity - Product
// Representa un producto del menú del restaurante
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  imageUrl: string;
  isAvailable: boolean;
  preparationTime: number; // en minutos
  allergens?: string[];
  ingredients?: string[];
  nutritionalInfo?: NutritionalInfo;
  tags?: string[];
  rating?: number;
  reviewCount?: number;
}

export enum ProductCategory {
  APPETIZER = 'appetizer',
  MAIN_COURSE = 'main-course',
  DESSERT = 'dessert',
  BEVERAGE = 'beverage',
  SALAD = 'salad',
  SPECIAL = 'special',
}

export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}
