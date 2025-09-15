import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ProductCategory, PRODUCT_CATEGORIES } from "@shared/schema";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CategoryFilterProps {
  activeCategory: ProductCategory;
  onCategoryChange: (category: ProductCategory) => void;
}

export default function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filter = filterRef.current;
    if (!filter) return;

    const buttons = filter.querySelectorAll('button');
    
    // Initial state
    gsap.set(buttons, { opacity: 0, y: 20, scale: 0.9 });

    // Staggered animation on scroll
    gsap.to(buttons, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: filter,
        start: "top bottom-=50",
        toggleActions: "play none none reverse"
      }
    });
  }, []);

  const handleCategoryClick = (category: ProductCategory, element: HTMLElement) => {
    // Add click animation
    gsap.to(element, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
    onCategoryChange(category);
  };

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === filterRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div ref={filterRef} className="flex flex-wrap gap-2 justify-center mb-8">
      {PRODUCT_CATEGORIES.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          size="sm"
          className={`
            transition-all duration-300 border-accent/30
            ${activeCategory === category 
              ? 'bg-accent text-accent-foreground border-accent' 
              : 'text-card-foreground hover:bg-accent/10 hover:border-accent/50'
            }
          `}
          onClick={(e) => handleCategoryClick(category, e.currentTarget)}
          data-testid={`button-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}