import Hero from '../Hero';

export default function HeroExample() {
  return (
    <Hero 
      onShopNow={() => console.log('Shop Now clicked')} 
    />
  );
}