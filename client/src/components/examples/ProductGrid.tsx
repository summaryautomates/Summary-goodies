import ProductGrid from '../ProductGrid';
import apronImage from "@assets/generated_images/SA_Premium_Apron_product_9b67fc53.png";
import duffleImage from "@assets/generated_images/Professional_Duffle_Bag_product_f0f49e27.png";
import techImage from "@assets/generated_images/Tech_Accessories_Collection_a09c021d.png";
import organizerImage from "@assets/generated_images/Premium_Office_Organizer_85e3c510.png";

export default function ProductGridExample() {
  const mockProducts = [
    {
      id: "1",
      name: "SA Premium Apron",
      description: "Crafted from premium materials with sophisticated design details.",
      price: "799.00",
      category: "Apparel",
      image: apronImage,
      inStock: 1
    },
    {
      id: "2", 
      name: "Professional Duffle Bag",
      description: "Spacious and elegant duffle bag for the modern professional.",
      price: "2999.00",
      category: "Accessories",
      image: duffleImage,
      inStock: 1
    },
    {
      id: "3",
      name: "Tech Accessories Set",
      description: "Complete collection of premium tech accessories.",
      price: "1499.00", 
      category: "Tech Accessories",
      image: techImage,
      inStock: 1
    },
    {
      id: "4",
      name: "Premium Office Organizer",
      description: "Elegant desk organizer with sophisticated design.",
      price: "899.00",
      category: "Home & Office", 
      image: organizerImage,
      inStock: 1
    }
  ];

  return (
    <div className="p-8 bg-background">
      <ProductGrid 
        products={mockProducts}
        activeCategory="All Products"
        onAddToCart={(product) => console.log('Add to cart:', product.name)}
        onViewDetails={(product) => console.log('View details:', product.name)}
      />
    </div>
  );
}