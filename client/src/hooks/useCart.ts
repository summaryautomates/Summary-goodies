import { useState, useCallback } from 'react';
import { Product, CartItem } from '@shared/schema';

interface CartItemWithProduct extends CartItem {
  product: Product;
}

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = useCallback((product: Product) => {
    setCartItems(items => {
      const existingItem = items.find(item => item.productId === product.id);
      
      if (existingItem) {
        return items.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...items, {
          id: `cart-${Date.now()}`,
          productId: product.id,
          quantity: 1,
          product
        }];
      }
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(items => items.filter(item => item.productId !== productId));
    } else {
      setCartItems(items =>
        items.map(item =>
          item.productId === productId ? { ...item, quantity } : item
        )
      );
    }
  }, []);

  const removeItem = useCallback((productId: string) => {
    setCartItems(items => items.filter(item => item.productId !== productId));
  }, []);

  const checkout = useCallback(() => {
    const orderDetails = cartItems.map(item => 
      `${item.product.name} (x${item.quantity}) - ₹${(parseFloat(item.product.price) * item.quantity).toFixed(2)}`
    ).join('\n');
    
    const total = cartItems.reduce((sum, item) => 
      sum + (parseFloat(item.product.price) * item.quantity), 0
    );
    
    const message = `Hello! I'd like to place an order:\n\n${orderDetails}\n\nTotal: ₹${total.toFixed(2)}\n\nThank you!`;
    const whatsappUrl = `https://wa.me/917666395733?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  }, [cartItems]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  return {
    cartItems,
    isCartOpen,
    addToCart,
    updateQuantity,
    removeItem,
    checkout,
    openCart,
    closeCart
  };
}