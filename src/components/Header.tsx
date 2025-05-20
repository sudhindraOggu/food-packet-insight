
import React from 'react';
import { Apple } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-950 border-b border-border">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Apple className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold text-foreground">NutriScan</h1>
        </div>
        <nav className="flex items-center gap-4 sm:gap-6">
          <a href="#" className="text-sm font-medium hover:underline underline-offset-4">Home</a>
          <a href="#about" className="text-sm font-medium hover:underline underline-offset-4">About</a>
          <a href="#contact" className="text-sm font-medium hover:underline underline-offset-4">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
