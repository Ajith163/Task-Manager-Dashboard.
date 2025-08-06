import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ResponsiveContainer = ({ children, className = '' }) => {
  const { isDarkMode, colors } = useTheme();
  const currentColors = isDarkMode ? colors.dark : colors.light;

  return (
    <div 
      className={`min-h-screen transition-colors duration-300 ${className}`}
      style={{ backgroundColor: currentColors.background.primary }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-7xl">
        {children}
      </div>
    </div>
  );
};

export default ResponsiveContainer; 