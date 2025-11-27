// src/components/Header.js
import React from 'react';

const Header = ({ darkMode, setDarkMode }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate position accounting for fixed header height
      const headerHeight = 20; // Adjust based on your header height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div 
          onClick={() => scrollToSection('home')}
          className="text-xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          Praks
        </div>
        
        {/* Navigation Links */}
        <div className="flex gap-8 items-center">
          {['home', 'about', 'projects', 'achievements', 'contact'].map((section) => (
            <a 
              key={section}
              href={`#${section}`}
              onClick={(e) => handleNavClick(e, section)}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors capitalize relative group"
            >
              {section}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
          
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <span className="w-5 h-5 block">☀️</span>
            ) : (
              <span className="w-5 h-5 block">🌙</span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;