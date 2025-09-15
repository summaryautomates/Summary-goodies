import { Button } from "@/components/ui/button";
import { ProductCategory, PRODUCT_CATEGORIES } from "@shared/schema";

interface CategoryFilterProps {
  activeCategory: ProductCategory;
  onCategoryChange: (category: ProductCategory) => void;
}

export default function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
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
          onClick={() => onCategoryChange(category)}
          data-testid={`button-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}