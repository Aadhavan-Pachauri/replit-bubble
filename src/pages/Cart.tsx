import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => {
    const itemPrice = item.price;
    const materialPrice = item.selectedMaterial === 'PLA' ? 0 :
      item.selectedMaterial === 'ABS' ? 2 :
      item.selectedMaterial === 'PETG' ? 3 :
      item.selectedMaterial === 'Resin' ? 5 :
      item.selectedMaterial === 'Carbon Fiber' ? 10 :
      item.selectedMaterial === 'Nylon' ? 4 :
      item.selectedMaterial === 'Polycarbonate' ? 6 :
      item.selectedMaterial === 'TPU' ? 2 :
      item.selectedMaterial === 'Silicone' ? 3 :
      item.selectedMaterial === 'Memory Foam' ? 4 :
      item.selectedMaterial === 'Leather' ? 8 : 0;

    const sizePrice = item.selectedSize === 'Small' ? 0 :
      item.selectedSize === 'Medium' ? 5 :
      item.selectedSize === 'Large' ? 10 : 0;

    return sum + (itemPrice + materialPrice + sizePrice) * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto">
        <h1 className="text-5xl font-extrabold holo-text text-center mb-12">Your Cart</h1>
        <div className="bg-gray-800 p-8 rounded-xl neon-glow max-w-2xl mx-auto">
          {cart.length === 0 ? (
            <p className="text-lg text-center">Your cart is empty.</p>
          ) : (
            <div className="space-y-6">
              {cart.map((item, index) => (
                <div key={index} className="flex items-center justify-between border-b border-gray-700 pb-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-contain rounded-lg bg-gray-900"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-400">
                        Color: <span style={{ color: item.selectedColor }}>■</span> {item.selectedColor}
                      </p>
                      <p className="text-sm text-gray-400">
                        Material: {item.selectedMaterial}
                      </p>
                      <p className="text-sm text-gray-400">
                        Size: {item.selectedSize}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-red-500 hover:text-red-400"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">
                      ${((item.price + 
                        (item.selectedMaterial === 'PLA' ? 0 :
                        item.selectedMaterial === 'ABS' ? 2 :
                        item.selectedMaterial === 'PETG' ? 3 :
                        item.selectedMaterial === 'Resin' ? 5 :
                        item.selectedMaterial === 'Carbon Fiber' ? 10 :
                        item.selectedMaterial === 'Nylon' ? 4 :
                        item.selectedMaterial === 'Polycarbonate' ? 6 :
                        item.selectedMaterial === 'TPU' ? 2 :
                        item.selectedMaterial === 'Silicone' ? 3 :
                        item.selectedMaterial === 'Memory Foam' ? 4 :
                        item.selectedMaterial === 'Leather' ? 8 : 0) +
                        (item.selectedSize === 'Small' ? 0 :
                        item.selectedSize === 'Medium' ? 5 :
                        item.selectedSize === 'Large' ? 10 : 0)) * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-400">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="max-w-2xl mx-auto mt-8 text-right">
          <p className="text-xl mb-4">Total: ${total.toFixed(2)}</p>
          <div className="flex justify-between">
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
            >
              Clear Cart
            </button>
            <Link
              to="/login"
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full neon-glow hover:from-blue-600 hover:to-purple-700"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;