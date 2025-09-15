import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Menu, X, Sparkles } from "lucide-react";
import { CartItem } from "@shared/schema";

interface HeaderProps {
  cartItems?: CartItem[];
  onCartClick?: () => void;
  onMenuClick?: () => void;
}

export default function Header({ cartItems = [], onCartClick, onMenuClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    onMenuClick?.();
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3" data-testid="header-logo">
            <Sparkles className="w-8 h-8 text-accent" />
            <h1 className="font-serif text-2xl font-bold text-foreground">
              Summary <span className="text-accent">Goodies</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#products" className="text-foreground hover:text-accent transition-colors" data-testid="link-products">
              Products
            </a>
            <a href="#about" className="text-foreground hover:text-accent transition-colors" data-testid="link-about">
              About
            </a>
            <a href="#contact" className="text-foreground hover:text-accent transition-colors" data-testid="link-contact">
              Contact
            </a>
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <Button
              variant="outline"
              size="icon"
              className="relative border-accent/30 hover:bg-accent/10"
              onClick={onCartClick}
              data-testid="button-cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <Badge 
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 flex items-center justify-center bg-accent text-accent-foreground text-xs"
                  data-testid="badge-cart-count"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="icon"
              className="md:hidden border-accent/30 hover:bg-accent/10"
              onClick={toggleMobileMenu}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-border/50" data-testid="mobile-nav">
            <div className="flex flex-col gap-4">
              <a 
                href="#products" 
                className="text-foreground hover:text-accent transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="mobile-link-products"
              >
                Products
              </a>
              <a 
                href="#about" 
                className="text-foreground hover:text-accent transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="mobile-link-about"
              >
                About
              </a>
              <a 
                href="#contact" 
                className="text-foreground hover:text-accent transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="mobile-link-contact"
              >
                Contact
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}