import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Product, CartItem } from '../types';

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('US');
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);

  const locations = {
    US: { currency: 'USD', symbol: '$', rate: 1 },
    EU: { currency: 'EUR', symbol: '€', rate: 0.92 },
    UK: { currency: 'GBP', symbol: '£', rate: 0.79 },
    IN: { currency: 'INR', symbol: '₹', rate: 83.12 }
  };

  useEffect(() => {
    document.title = 'Bubble - Shop';
    
    try {
      // Load products from localStorage
      const savedProducts = localStorage.getItem('products');
      if (savedProducts) {
        const parsedProducts = JSON.parse(savedProducts);
        if (Array.isArray(parsedProducts)) {
          setProducts(parsedProducts);
        } else {
          throw new Error('Invalid products data');
        }
      } else {
        // If no products in localStorage, initialize with default products
        const defaultProducts: Product[] = [
          {
            id: 1,
            name: "Custom Gear",
            price: 29.99,
            description: "Precision engineered custom gear for robotics and mechanical projects.",
            stock: 15,
            image: "/images/gear.jpg",
            colors: ["#3B82F6", "#EC4899", "#10B981", "#F59E0B"],
            materials: ["PLA", "ABS", "PETG", "Resin"],
            modelUrl: "/models/gear.glb",
            category: "Mechanical"
          },
          {
            id: 2,
            name: "Drone Frame",
            price: 49.99,
            description: "Lightweight and durable drone frame for custom builds.",
            stock: 8,
            image: "/images/drone-frame.jpg",
            colors: ["#000000", "#FFFFFF", "#FF0000", "#00FF00"],
            materials: ["Carbon Fiber", "Nylon", "Polycarbonate", "ABS"],
            modelUrl: "/models/drone-frame.glb",
            category: "Electronics"
          },
          {
            id: 3,
            name: "Modular Bracket",
            price: 19.99,
            description: "Universal modular mounting bracket for various applications.",
            stock: 24,
            image: "/images/bracket.jpg",
            colors: ["#777777", "#999999", "#BBBBBB", "#DDDDDD"],
            materials: ["ABS", "PLA", "TPU", "Nylon"],
            category: "Mechanical"
          }
        ];
        setProducts(defaultProducts);
        localStorage.setItem('products', JSON.stringify(defaultProducts));
      }
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    if (!products) return;
    
    // Filter products based on search term and selected material
    const filtered = products.filter(product => {
      if (!product) return false;
      
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesMaterial = selectedMaterial === 'all' || 
                            (product.materials && product.materials.includes(selectedMaterial));
      
      return matchesSearch && matchesMaterial;
    });
    
    setFilteredProducts(filtered);
  }, [searchTerm, selectedMaterial, products]);
  
  const getLocalizedPrice = (price: number) => {
    const location = locations[selectedLocation as keyof typeof locations];
    const convertedPrice = price * location.rate;
    return `${location.symbol}${convertedPrice.toFixed(2)}`;
  };

  const handleAddToCart = (product: Product) => {
    if (!product) return;
    
    const cartItem: CartItem = {
      ...product,
      quantity: 1,
      selectedColor: product.colors[0] || '#000000',
      selectedMaterial: product.materials[0] || 'PLA',
      selectedSize: 'Medium'
    };
    
    addToCart(cartItem);
    
    // Show confirmation
    const confirmation = document.createElement('div');
    confirmation.className = 'fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-lg z-50';
    confirmation.textContent = `${product.name} added to cart!`;
    document.body.appendChild(confirmation);
    setTimeout(() => confirmation.remove(), 2000);
  };
  
  // Get unique materials from all products
  const allMaterials = Array.from(
    new Set(products.flatMap(product => product?.materials || []))
  );

  const categories = ['all', ...new Set(products.map(product => product?.category).filter(Boolean))];
  const filteredProductsByCategory = selectedCategory === 'all' 
    ? filteredProducts 
    : filteredProducts.filter(product => product?.category === selectedCategory);

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-500 mb-4">{error}</h1>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-extrabold holo-text">Shop</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">Location:</span>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="bg-gray-700 text-white rounded-lg px-4 py-2"
            >
              {Object.keys(locations).map((loc) => (
                <option key={loc} value={loc}>
                  {locations[loc as keyof typeof locations].symbol} {loc}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Filters */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select 
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
            >
              <option value="all">All Materials</option>
              {allMaterials.map(material => (
                <option key={material} value={material}>{material}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Category Filter */}
        <div className="flex justify-center space-x-4 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Products */}
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-pulse bg-gray-800 p-8 rounded-xl neon-glow">
              <div className="h-8 bg-gray-700 rounded mb-4"></div>
              <div className="h-4 bg-gray-700 rounded mb-6 w-3/4"></div>
              <div className="h-10 bg-gray-700 rounded"></div>
            </div>
          </div>
        ) : filteredProductsByCategory.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-400">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProductsByCategory.map(product => (
              <div key={product.id} className="bg-gray-800 rounded-xl overflow-hidden neon-glow hover:shadow-lg transition-shadow">
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                </Link>
                <div className="p-6">
                  <Link to={`/product/${product.id}`} className="block">
                    <h2 className="text-2xl font-semibold mb-2 hover:text-blue-400 transition-colors">{product.name}</h2>
                  </Link>
                  <p className="text-gray-400 mb-4">{product.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.colors.map((color, index) => (
                      <div 
                        key={index} 
                        className="w-6 h-6 rounded-full border border-gray-600" 
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium">{product.materials.join(', ')}</span>
                    <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold holo-text">
                      {getLocalizedPrice(product.price)}
                    </span>
                    <button 
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product);
                      }}
                      disabled={product.stock <= 0}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Shop;