import ProductCard from '../ProductCard';
import apronImage from "@assets/generated_images/SA_Premium_Apron_product_9b67fc53.png";

export default function ProductCardExample() {
  const mockProduct = {
    id: "1",
    name: "SA Premium Apron",
    description: "Crafted from premium materials with sophisticated design details. Perfect for the professional chef or culinary enthusiast.",
    price: "799.00",
    category: "Apparel",
    image: apronImage,
    inStock: 1
  };

  return (
    <div className="p-8 bg-background">
      <ProductCard 
        product={mockProduct}
        onAddToCart={(product) => console.log('Add to cart:', product.name)}
        onViewDetails={(product) => console.log('View details:', product.name)}
      />
    </div>
  );
}