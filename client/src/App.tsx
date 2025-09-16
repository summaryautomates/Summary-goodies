import React, { useState, useEffect, useRef } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NotFound from "@/pages/not-found";

gsap.registerPlugin(ScrollTrigger);

// Components
import Header from "./components/Header";
import About from "./components/ui/about";
import Hero from "./components/Hero";
import CategoryFilter from "./components/CategoryFilter";
import ProductGrid from "./components/ProductGrid";
import CartSidebar from "./components/CartSidebar";
import Footer from "./components/Footer";
import ThemeToggle from "./components/ThemeToggle";

// Hooks and Data
import { useCart } from "./hooks/useCart";
import { mockProducts } from "./data/products";
import { ProductCategory } from "@shared/schema";

function EcommercePage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("All Products");
  const { toast } = useToast();
  const sectionsRef = useRef<HTMLElement>(null);
  
  const {
    cartItems,
    isCartOpen,
    addToCart,
    updateQuantity,
    removeItem,
    checkout,
    openCart,
    closeCart
  } = useCart();

  // Initialize with dark theme and smooth scrolling
  useEffect(() => {
    document.documentElement.classList.add('dark');
    
    // Smooth scrolling for the entire page
    gsap.set(document.documentElement, {
      scrollBehavior: "smooth"
    });

    // Global page load animation
    const sections = document.querySelectorAll('section');
    gsap.set(sections, { opacity: 0 });
    
    gsap.to(sections, {
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleShopNow = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header 
        cartItems={cartItems}
        onCartClick={openCart}
      />

      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-20 right-4 z-40">
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <Hero onShopNow={handleShopNow} />

      {/* Products Section */}
      <section ref={sectionsRef} id="products" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our <span className="text-accent">Collection</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover premium workspace essentials designed for the modern professional.
            </p>
          </div>

          {/* Category Filter */}
          <CategoryFilter 
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Product Grid */}
          <ProductGrid 
            products={mockProducts}
            activeCategory={activeCategory}
            onAddToCart={handleAddToCart}
            onViewDetails={(product) => console.log('View details:', product.name)}
          />
        </div>
      </section>

        {/* About Section */}
        <section id="about" className="py-16 px-4">
          <div className="container mx-auto">
            {/* Directly import and render About component */}
            <About />
          </div>
        </section>

      {/* Footer */}
      <Footer />

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={closeCart}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={checkout}
      />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={EcommercePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;