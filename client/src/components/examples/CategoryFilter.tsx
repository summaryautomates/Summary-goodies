import { useState } from 'react';
import CategoryFilter from '../CategoryFilter';
import { ProductCategory } from "@shared/schema";

export default function CategoryFilterExample() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("All Products");

  return (
    <div className="p-8 bg-background">
      <CategoryFilter 
        activeCategory={activeCategory}
        onCategoryChange={(category) => {
          console.log('Category changed to:', category);
          setActiveCategory(category);
        }}
      />
    </div>
  );
}