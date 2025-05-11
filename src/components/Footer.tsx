import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black py-12">
      <div className="container mx-auto text-center px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold holo-text mb-4">About Bubble</h3>
            <p className="text-gray-400">
              Revolutionizing 3D printing with custom solutions and print files for creators and makers.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold holo-text mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/shop" className="text-gray-400 hover:text-blue-400">Shop</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-blue-400">About Us</Link></li>
              <li><Link to="/support" className="text-gray-400 hover:text-blue-400">Support</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-blue-400">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold holo-text mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400">Twitter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400">Instagram</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400">LinkedIn</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400">YouTube</a></li>
            </ul>
          </div>
        </div>
        <p className="text-lg mb-4">© {currentYear} Bubble Inc. All rights reserved.</p>
        <div className="flex justify-center space-x-6">
          <a href="#" className="text-blue-400 hover:holo-text">Twitter</a>
          <a href="#" className="text-blue-400 hover:holo-text">Instagram</a>
          <a href="#" className="text-blue-400 hover:holo-text">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;