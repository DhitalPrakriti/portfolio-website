// src/components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">
        </div>
        <div className="flex gap-8">
          <a href="#home" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Home</a>
          <a href="#about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">About</a>
          <a href="#projects" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Projects</a>
          <a href="#contact" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Contact</a>
        </div>
      </nav>\
    </header>
  );
};

export default Header;