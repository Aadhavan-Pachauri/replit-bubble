import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-extrabold holo-text mb-12">Our Story</h1>
        <p className="text-xl mb-12 max-w-3xl mx-auto">
          Founded in 2025, Bubble emerged from a vision to democratize 3D printing. 
          Our founder, inspired by the maker movement, started Bubble to make custom 
          3D-printed parts accessible to everyone, from hobbyists to engineers. 
          We believe in empowering creators by offering high-quality parts or letting 
          you keep your print files for ultimate flexibility.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-4">
          <div className="bg-gray-800 p-8 rounded-xl neon-glow card-3d">
            <h3 className="text-2xl font-semibold holo-text mb-4">Mission</h3>
            <p>To spark innovation by making 3D printing simple, affordable, and creator-focused.</p>
          </div>
          
          <div className="bg-gray-800 p-8 rounded-xl neon-glow card-3d">
            <h3 className="text-2xl font-semibold holo-text mb-4">Team</h3>
            <p>A passionate group of designers, engineers, and makers building the future of fabrication.</p>
          </div>
          
          <div className="bg-gray-800 p-8 rounded-xl neon-glow card-3d">
            <h3 className="text-2xl font-semibold holo-text mb-4">Vision</h3>
            <p>A world where every idea can be printed, shared, and brought to life with Bubble.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;