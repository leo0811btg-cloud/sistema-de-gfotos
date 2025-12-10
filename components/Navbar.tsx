import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full z-40 bg-gradient-to-b from-black/80 to-transparent">
      <div className="flex items-center justify-between px-4 md:px-12 py-6">
        <h1 className="text-[#E50914] text-3xl md:text-4xl font-bold tracking-tighter drop-shadow-lg">
          LEOMAR & YASMIN
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;