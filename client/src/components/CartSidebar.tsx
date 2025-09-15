import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { X, Plus, Minus, MessageCircle } from "lucide-react";
import { Product, CartItem } from "@shared/schema";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: (CartItem & { product: Product })[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export default function CartSidebar({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout 
}: CartSidebarProps) {
  const total = cartItems.reduce((sum, item) => sum + (parseFloat(item.product.price) * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
        data-testid="cart-backdrop"
      />
      
      {/* Sidebar */}
      <div 
        className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 overflow-y-auto"
        data-testid="cart-sidebar"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-bold text-card-foreground">
              Shopping Cart
            </h2>
            <Button 
              variant="outline" 
              size="icon"
              onClick={onClose}
              data-testid="button-close-cart"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Cart Items */}
          {cartItems.length === 0 ? (
            <div className="text-center py-16" data-testid="empty-cart">
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Button onClick={onClose} variant="outline" data-testid="button-continue-shopping">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <Card key={item.id} className="p-4" data-testid={`cart-item-${item.product.id}`}>
                    <div className="flex gap-4">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-md"
                        data-testid={`cart-img-${item.product.id}`}
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-card-foreground truncate" data-testid={`cart-name-${item.product.id}`}>
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground" data-testid={`cart-price-${item.product.id}`}>
                          ₹{item.product.price}
                        </p>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="w-8 h-8"
                            onClick={() => onUpdateQuantity(item.productId, Math.max(0, item.quantity - 1))}
                            data-testid={`button-decrease-${item.product.id}`}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          
                          <Badge 
                            variant="secondary"
                            className="px-3 py-1"
                            data-testid={`quantity-${item.product.id}`}
                          >
                            {item.quantity}
                          </Badge>
                          
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="w-8 h-8"
                            onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                            data-testid={`button-increase-${item.product.id}`}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                          
                          <Button 
                            variant="destructive" 
                            size="sm"
                            className="ml-auto"
                            onClick={() => onRemoveItem(item.productId)}
                            data-testid={`button-remove-${item.product.id}`}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Total */}
              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-accent font-serif" data-testid="cart-total">
                    ₹{total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-6 text-lg font-semibold group"
                onClick={onCheckout}
                data-testid="button-checkout"
              >
                <MessageCircle className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Checkout via WhatsApp
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}