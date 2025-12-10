// src/components/Header.js
import React, { useState } from 'react';

const Header = ({ darkMode, setDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Increased for better scrolling
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false); // Close mobile menu after clicking
    }
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  const navItems = ['home', 'about', 'projects', 'achievements', 'contact'];

  return (
    <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
      <nav className="container mx-auto px-4 py-4">
        {/* Main Navigation Row */}
        <div className="flex justify-between items-center">
          {/* Logo - Left side with proper spacing */}
          <div 
            onClick={() => scrollToSection('home')}
            className="text-xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex-shrink-0"
          >
            Praks
          </div>
          
          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((section) => (
              <a 
                key={section}
                href={`#${section}`}
                onClick={(e) => handleNavClick(e, section)}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors capitalize relative group text-sm lg:text-base whitespace-nowrap"
              >
                {section}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
            
            {/* Dark Mode Toggle - Desktop */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ml-2"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <span className="w-5 h-5 block">☀️</span>
              ) : (
                <span className="w-5 h-5 block">🌙</span>
              )}
            </button>
          </div>

          {/* Mobile Controls - Right side */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Dark Mode Toggle - Mobile */}
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

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <span className="w-5 h-5 block text-gray-600 dark:text-gray-300">✕</span>
              ) : (
                <span className="w-5 h-5 block text-gray-600 dark:text-gray-300">☰</span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((section) => (
                <a 
                  key={section}
                  href={`#${section}`}
                  onClick={(e) => handleNavClick(e, section)}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors capitalize py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-base"
                >
                  {section}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;