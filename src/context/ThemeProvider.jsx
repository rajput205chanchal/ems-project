import React, { createContext, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
  };

export const ThemeProvider = ({ children }) => {
    // Always light theme with colorful design
    const isDarkMode = false;
    const toggleTheme = () => { }; // No-op function for compatibility

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
