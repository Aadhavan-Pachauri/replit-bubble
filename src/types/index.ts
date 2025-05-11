export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: 'USD' | 'INR';
  image: string;
  category: string;
  materials: string[];
  sizes: string[];
  colors: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  selectedColor: string;
  selectedMaterial: string;
  selectedSize: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface Message {
  id: string;
  userId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface Database {
  users: User[];
  products: Product[];
}

export interface Settings {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  language: string;
  animations: boolean;
  showImages: boolean;
  holographic: boolean;
  saveHistory: boolean;
  shareData: boolean;
  caching: boolean;
  lowBandwidth: boolean;
  darkMode: boolean;
  odooLike: boolean;
}