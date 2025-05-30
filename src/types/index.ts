export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  image: string;
  priceUnit: number;
  priceBox?: number;
  unitsPerBox?: number;
  variants?: ProductVariant[];
  featured?: boolean;
  stock: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  priceUnit: number;
  priceBox?: number;
  unitsPerBox?: number;
  stock: number;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string;
  isBox: boolean;
  unitsPerBox?: number;
}

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
}

export interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  instagram?: string;
  facebook?: string;
}
