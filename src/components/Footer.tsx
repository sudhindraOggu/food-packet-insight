
import React from 'react';
import { Apple } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-muted py-6 mt-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Apple className="h-5 w-5 text-primary" />
            <span className="font-bold">NutriScan</span>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <p className="text-xs text-muted-foreground mb-2">
              This tool is for informational purposes only. Always consult product packaging for accurate information.
            </p>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} NutriScan. All rights reserved.
            </p>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div id="about" className="mb-6">
          <h3 className="text-lg font-medium mb-2">About NutriScan</h3>
          <p className="text-sm text-muted-foreground">
            NutriScan is dedicated to helping consumers make informed decisions about the food they eat.
            Our ingredient analyzer provides detailed information about food ingredients, potential allergens,
            and common additives to help you understand what's in your food.
          </p>
        </div>
        
        <div id="contact">
          <h3 className="text-lg font-medium mb-2">Contact Us</h3>
          <p className="text-sm text-muted-foreground">
            Have questions or feedback? Email us at <a href="mailto:info@nutriscan.example.com" className="text-primary hover:underline">info@nutriscan.example.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
