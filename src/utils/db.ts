import { Database, Product, User, Order, Message, CartItem } from '../types';

// Create the initial database
export const createDefaultDatabase = (): Database => {
  return {
    users: [
      {
        id: '1',
        name: 'Admin User',
        email: 'admin@bubble.com',
        password: 'admin123',
        role: 'admin',
        dateCreated: Date.now() - 30 * 24 * 60 * 60 * 1000 // 30 days ago
      },
      {
        id: '2',
        name: 'Test User',
        email: 'user@bubble.com',
        password: 'user123',
        role: 'user',
        dateCreated: Date.now() - 7 * 24 * 60 * 60 * 1000 // 7 days ago
      }
    ],
    products: [
      {
        id: 1,
        name: 'Custom Mechanical Gear',
        price: 29.99,
        description: 'High-precision mechanical gear for robotics projects.',
        image: 'https://images.pexels.com/photos/414579/pexels-photo-414579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        stock: 100,
        colors: ['#3B82F6', '#10B981', '#F97316'],
        materials: ['PLA', 'ABS', 'PETG']
      },
      {
        id: 2,
        name: 'LED Enclosure',
        price: 19.99,
        description: 'Custom enclosure for LED light projects with diffusion panels.',
        image: 'https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        stock: 50,
        colors: ['#F97316', '#3B82F6', '#8B5CF6'],
        materials: ['PLA', 'PETG']
      },
      {
        id: 3,
        name: 'Miniature Robot Model',
        price: 49.99,
        description: 'Detailed 3D printed robot model, perfect for displays or collectors.',
        image: 'https://images.pexels.com/photos/73910/mars-mars-rover-space-travel-robot-73910.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        stock: 25,
        colors: ['#6B7280', '#3B82F6', '#F97316'],
        materials: ['Resin', 'PLA+']
      }
    ],
    orders: [],
    messages: []
  };
};

// Save database to localStorage
export const saveDatabase = (db: Database): void => {
  localStorage.setItem('bubbleDatabase', JSON.stringify(db));
};

// Get database from localStorage
export const getDatabase = (): Database => {
  const dbString = localStorage.getItem('bubbleDatabase');
  if (!dbString) {
    const defaultDb = createDefaultDatabase();
    saveDatabase(defaultDb);
    return defaultDb;
  }
  return JSON.parse(dbString);
};

// Reset database to default values
export const resetDatabase = (): void => {
  const defaultDb = createDefaultDatabase();
  saveDatabase(defaultDb);
};

// User management
export const getCurrentUser = (): User | null => {
  const userString = localStorage.getItem('currentUser');
  if (!userString) return null;
  return JSON.parse(userString);
};

export const loginUser = (email: string, password: string): User | null => {
  const db = getDatabase();
  const user = db.users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }
  return null;
};

export const logoutUser = (): void => {
  localStorage.removeItem('currentUser');
};

export const registerUser = (name: string, email: string, password: string): User | null => {
  const db = getDatabase();
  // Check if user already exists
  if (db.users.some(u => u.email === email)) {
    return null;
  }
  
  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    password,
    role: 'user',
    dateCreated: Date.now()
  };
  
  db.users.push(newUser);
  saveDatabase(db);
  
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  return newUser;
};

// Cart management
export const getCart = (): CartItem[] => {
  const cartString = localStorage.getItem('cart');
  if (!cartString) return [];
  return JSON.parse(cartString);
};

export const addToCart = (product: Product): void => {
  const cart = getCart();
  const cartItem = {
    productId: product.id,
    item: product.name,
    price: product.price
  };
  
  cart.push(cartItem);
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const removeFromCart = (index: number): void => {
  const cart = getCart();
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const clearCart = (): void => {
  localStorage.setItem('cart', JSON.stringify([]));
};