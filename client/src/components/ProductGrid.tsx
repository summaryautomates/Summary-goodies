import { Product, ProductCategory } from "@shared/schema";
import ProductCard from "./ProductCard";

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
  const filteredProducts = activeCategory === "All Products" 
    ? products 
    : products.filter(product => product.category === activeCategory);

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