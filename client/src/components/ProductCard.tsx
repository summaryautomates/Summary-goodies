import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye } from "lucide-react";
import { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  return (
    <Card className="group hover-elevate overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
          data-testid={`img-product-${product.id}`}
        />
        
        {/* Glow overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            size="icon" 
            variant="secondary"
            className="bg-white/90 text-gray-900 hover:bg-white shadow-lg"
            onClick={() => onViewDetails?.(product)}
            data-testid={`button-view-${product.id}`}
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Category badge */}
        <Badge 
          className="absolute top-4 left-4 bg-accent/90 text-accent-foreground"
          data-testid={`badge-category-${product.id}`}
        >
          {product.category}
        </Badge>
      </div>
      
      <div className="p-6 space-y-4">
        <div>
          <h3 className="font-serif text-xl font-semibold text-card-foreground mb-2" data-testid={`text-name-${product.id}`}>
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-description-${product.id}`}>
            {product.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-accent font-serif" data-testid={`text-price-${product.id}`}>
              ₹{product.price}
            </span>
          </div>
          
          <Button 
            size="sm"
            className="bg-accent text-accent-foreground hover:bg-accent/90 group/btn"
            onClick={() => onAddToCart?.(product)}
            data-testid={`button-add-cart-${product.id}`}
          >
            <ShoppingCart className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
}