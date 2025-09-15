import { useState } from 'react';
import CartSidebar from '../CartSidebar';
import apronImage from "@assets/generated_images/SA_Premium_Apron_product_9b67fc53.png";
import duffleImage from "@assets/generated_images/Professional_Duffle_Bag_product_f0f49e27.png";

export default function CartSidebarExample() {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      productId: "1", 
      quantity: 2,
      product: {
        id: "1",
        name: "SA Premium Apron",
        description: "Crafted from premium materials",
        price: "799.00",
        category: "Apparel",
        image: apronImage,
        inStock: 1
      }
    },
    {
      id: "2",
      productId: "2",
      quantity: 1, 
      product: {
        id: "2",
        name: "Professional Duffle Bag",
        description: "Spacious and elegant duffle bag",
        price: "2999.00",
        category: "Accessories", 
        image: duffleImage,
        inStock: 1
      }
    }
  ]);

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(items => items.filter(item => item.productId !== productId));
    } else {
      setCartItems(items => 
        items.map(item => 
          item.productId === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeItem = (productId: string) => {
    setCartItems(items => items.filter(item => item.productId !== productId));
  };

  return (
    <CartSidebar 
      isOpen={true}
      onClose={() => console.log('Close cart')}
      cartItems={cartItems}
      onUpdateQuantity={updateQuantity}
      onRemoveItem={removeItem}
      onCheckout={() => console.log('Checkout clicked')}
    />
  );
}