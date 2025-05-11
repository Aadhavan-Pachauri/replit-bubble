import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

type MaterialType = 'PLA' | 'ABS' | 'PETG' | 'Resin' | 'Carbon Fiber' | 'Nylon' | 'Polycarbonate' | 'TPU' | 'Silicone' | 'Memory Foam' | 'Leather';
type SizeType = 'Small' | 'Medium' | 'Large';

const MATERIAL_PRICE_MOD: Record<MaterialType, number> = {
  'PLA': 0,
  'ABS': 2,
  'PETG': 3,
  'Resin': 5,
  'Carbon Fiber': 10,
  'Nylon': 4,
  'Polycarbonate': 6,
  'TPU': 2,
  'Silicone': 3,
  'Memory Foam': 4,
  'Leather': 8
};

const SIZE_PRICE_MOD: Record<SizeType, number> = {
  'Small': 0,
  'Medium': 5,
  'Large': 10
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType>('PLA');
  const [selectedSize, setSelectedSize] = useState<SizeType>('Medium');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Load product from localStorage
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      const products = JSON.parse(savedProducts);
      const foundProduct = products.find((p: Product) => String(p.id) === String(id));
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedColor(foundProduct.colors[0]);
        setSelectedMaterial(foundProduct.materials[0] as MaterialType);
      }
    }
    setLoading(false);
  }, [id]);

  const getPrice = () => {
    if (!product) return 0;
    let price = product.price;
    price += MATERIAL_PRICE_MOD[selectedMaterial];
    price += SIZE_PRICE_MOD[selectedSize];
    return price * quantity;
  };

  const handleQuantityChange = (value: number) => {
    if (product && value >= 1 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        quantity,
        selectedColor,
        selectedMaterial,
        selectedSize
      });
      navigate('/cart');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="animate-pulse bg-gray-800 p-8 rounded-xl neon-glow">
            <div className="h-8 bg-gray-700 rounded mb-4"></div>
            <div className="h-4 bg-gray-700 rounded mb-6 w-3/4"></div>
            <div className="h-10 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          <p className="text-red-500 text-center">Product not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="bg-gray-800 rounded-xl neon-glow p-8 flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex flex-col items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-96 h-96 object-contain rounded-xl bg-gray-900 mb-6"
            />
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
            <p className="text-lg text-gray-400 mb-4">{product.description}</p>
            <div className="text-2xl font-semibold text-green-400 mb-2">
              ${getPrice().toFixed(2)}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-gray-400">Color:</span>
              {product.colors.map(color => (
                <button
                  key={color}
                  className={`w-7 h-7 rounded-full border-2 ${
                    selectedColor === color ? 'border-blue-500' : 'border-gray-600'
                  }`}
                  style={{ background: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-gray-400">Material:</span>
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value as MaterialType)}
                className="bg-gray-700 text-white border border-gray-600 rounded px-2 py-1"
              >
                {product.materials.map(mat => (
                  <option key={mat} value={mat}>
                    {mat}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-gray-400">Size:</span>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value as SizeType)}
                className="bg-gray-700 text-white border border-gray-600 rounded px-2 py-1"
              >
                {['Small', 'Medium', 'Large'].map(size => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-gray-400">Quantity:</span>
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="px-2 py-1 border border-gray-600 rounded text-white hover:bg-gray-700"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                className="w-16 text-center bg-gray-700 text-white border border-gray-600 rounded"
              />
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="px-2 py-1 border border-gray-600 rounded text-white hover:bg-gray-700"
              >
                +
              </button>
              <span className="text-sm text-gray-500 ml-2">
                {product.stock} in stock
              </span>
            </div>
            <button
              onClick={handleAddToCart}
              className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 text-lg font-semibold"
            >
              Add to cart
            </button>
            <div className="mt-6 text-sm text-gray-400">
              <div className="font-bold">Terms and Conditions</div>
              <ul className="list-disc pl-5">
                <li>30-day money-back guarantee</li>
                <li>Shipping: 2-3 Business Days</li>
                <li>For custom designs, please contact us</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 