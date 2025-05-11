import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThreeBackground from '../components/ThreeBackground';

const Home: React.FC = () => {
  useEffect(() => {
    document.title = 'Bubble - 3D Printing Revolution';
  }, []);
  
  return (
    <>
      {/* Hero Section with 3D Background */}
      <section id="home" className="relative min-h-screen flex items-center justify-center">
        <ThreeBackground />
        <div className="container mx-auto text-center relative z-10 px-4">
          <h1 className="text-4xl md:text-7xl font-extrabold holo-text mb-6 animate-hero">
            Bubble: Print the Future
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto animate-hero delay-1">
            Custom 3D-printed parts or your own print files—Bubble empowers creators with cutting-edge technology.
          </p>
          <div className="space-x-3 md:space-x-6 animate-hero delay-2">
            <Link 
              to="/shop" 
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full neon-glow hover:from-blue-600 hover:to-purple-700 text-lg"
            >
              Shop Now
            </Link>
            <Link 
              to="/about" 
              className="inline-block bg-transparent border-2 border-blue-400 text-blue-400 px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-blue-400 hover:text-white text-lg"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold holo-text mb-8 text-center">
              Welcome to the Future of 3D Printing
            </h2>
            <p className="text-lg md:text-xl mb-10 leading-relaxed">
              At Bubble, we're revolutionizing the way creators bring their ideas to life. 
              Our state-of-the-art 3D printing technology combines precision engineering with 
              user-friendly design, giving you the power to create anything you can imagine.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gray-800 p-6 rounded-xl neon-glow text-center">
                <span className="text-4xl font-bold holo-text block mb-2">1000+</span>
                <span className="text-lg">Successful Projects</span>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl neon-glow text-center">
                <span className="text-4xl font-bold holo-text block mb-2">45+</span>
                <span className="text-lg">Expert Designers</span>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl neon-glow text-center">
                <span className="text-4xl font-bold holo-text block mb-2">98%</span>
                <span className="text-lg">Customer Satisfaction</span>
              </div>
            </div>
            
            <p className="text-lg md:text-xl leading-relaxed">
              Whether you're an engineer seeking precise components, a designer creating 
              prototypes, or a hobbyist exploring new ideas, our platform makes high-quality 
              3D printing accessible to everyone. Join our community of creators and start 
              bringing your ideas to life today.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl md:text-5xl font-extrabold holo-text mb-16">How it Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-gray-800 p-8 rounded-xl neon-glow card-3d">
              <div className="text-4xl mb-6 holo-text">1</div>
              <h3 className="text-2xl font-semibold holo-text mb-4">Design</h3>
              <p>Upload your design or collaborate with our team to create the perfect 3D model for your needs.</p>
            </div>
            
            <div className="bg-gray-800 p-8 rounded-xl neon-glow card-3d">
              <div className="text-4xl mb-6 holo-text">2</div>
              <h3 className="text-2xl font-semibold holo-text mb-4">Print</h3>
              <p>We use advanced 3D printing technology to bring your design to life with precision and quality.</p>
            </div>
            
            <div className="bg-gray-800 p-8 rounded-xl neon-glow card-3d">
              <div className="text-4xl mb-6 holo-text">3</div>
              <h3 className="text-2xl font-semibold holo-text mb-4">Receive</h3>
              <p>Get your custom printed parts delivered to your door or download your optimized print files.</p>
            </div>
          </div>
          
          <div className="mt-16">
            <Link 
              to="/shop" 
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full neon-glow hover:from-blue-600 hover:to-purple-700 text-lg"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;