import { Product } from '@shared/schema';
import apronImage from "@assets/generated_images/SA_Premium_Apron_product_9b67fc53.png";
import duffleImage from "@assets/generated_images/Professional_Duffle_Bag_product_f0f49e27.png";
import techImage from "@assets/generated_images/Tech_Accessories_Collection_a09c021d.png";
import organizerImage from "@assets/generated_images/Premium_Office_Organizer_85e3c510.png";

// todo: remove mock functionality - replace with API calls
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "SA Premium Apron",
    description: "Crafted from premium materials with sophisticated design details. Perfect for the professional chef or culinary enthusiast who demands both style and functionality.",
    price: "799.00",
    category: "Apparel",
    image: apronImage,
    inStock: 1
  },
  {
    id: "2",
    name: "Professional Duffle Bag",
    description: "Spacious and elegant duffle bag designed for the modern professional. Features premium materials and thoughtful organization for all your travel needs.",
    price: "2999.00",
    category: "Accessories",
    image: duffleImage,
    inStock: 1
  },
  {
    id: "3",
    name: "Tech Accessories Collection",
    description: "Complete collection of premium tech accessories including wireless chargers, cables, and device stands. Everything you need for a connected workspace.",
    price: "1499.00",
    category: "Tech Accessories",
    image: techImage,
    inStock: 1
  },
  {
    id: "4",
    name: "Premium Office Organizer",
    description: "Elegant desk organizer with sophisticated design and multiple compartments. Keep your workspace pristine with this luxury organizational solution.",
    price: "899.00",
    category: "Home & Office",
    image: organizerImage,
    inStock: 1
  },
  {
    id: "5",
    name: "Executive Notebook Set",
    description: "Luxurious notebook collection featuring premium paper and elegant binding. Perfect for the discerning professional who values quality stationery.",
    price: "599.00",
    category: "Home & Office",
    image: organizerImage,
    inStock: 1
  },
  {
    id: "6",
    name: "Premium Workspace Mat",
    description: "High-quality desk mat with premium materials and elegant design. Protect your workspace while adding sophistication to your office setup.",
    price: "1299.00",
    category: "Home & Office",
    image: apronImage,
    inStock: 1
  },
  {
    id: "7",
    name: "Professional Travel Case",
    description: "Sleek travel case designed for the modern professional. Features premium materials and intelligent organization for your essential items.",
    price: "1899.00",
    category: "Accessories",
    image: duffleImage,
    inStock: 1
  },
  {
    id: "8",
    name: "Smart Device Hub",
    description: "Elegant device charging hub with premium finish. Keep all your tech organized and charged with this sophisticated solution.",
    price: "1799.00",
    category: "Tech Accessories",
    image: techImage,
    inStock: 1
  },
  {
    id: "9",
    name: "Luxury Pen Collection",
    description: "Exquisite pen set crafted from premium materials. Make a statement with these sophisticated writing instruments designed for professionals.",
    price: "2499.00",
    category: "Home & Office",
    image: organizerImage,
    inStock: 1
  }
];