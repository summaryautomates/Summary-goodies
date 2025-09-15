import Header from '../Header';

export default function HeaderExample() {
  const mockCartItems = [
    { id: "1", productId: "1", quantity: 2 },
    { id: "2", productId: "2", quantity: 1 }
  ];

  return (
    <Header 
      cartItems={mockCartItems}
      onCartClick={() => console.log('Cart clicked')}
      onMenuClick={() => console.log('Mobile menu clicked')}
    />
  );
}