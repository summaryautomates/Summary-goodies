import { useEffect, useRef } from "react";
import { Product, ProductCategory } from "@shared/schema";
import ProductCard from "./ProductCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProductGridProps {
  products: Product[];
  activeCategory: ProductCategory;
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
}

export default function ProductGrid({ 
  products, 
  activeCategory, 
  onAddToCart, 
  onViewDetails 
}: ProductGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  
  const filteredProducts = activeCategory === "All Products" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // Animate grid container
    gsap.fromTo(grid, 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: grid,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === grid) {
          trigger.kill();
        }
      });
    };
  }, []);

  // Animate when category changes
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // Fade out and in with new products
    gsap.to(grid, {
      opacity: 0.3,
      scale: 0.98,
      duration: 0.2,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(grid, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    });
  }, [activeCategory]);

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-16" data-testid="empty-products">
        <h3 className="font-serif text-2xl text-muted-foreground mb-4">
          No products found
        </h3>
        <p className="text-muted-foreground">
          Try selecting a different category or check back later.
        </p>
      </div>
    );
  }

  return (
    <div 
      ref={gridRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      data-testid="product-grid"
    >
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}