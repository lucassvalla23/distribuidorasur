import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useProducts } from "../contexts/product-context";
import ProductCard from "./product-card";

const FeaturedProducts: React.FC = () => {
  const { getFeaturedProducts } = useProducts();
  const featuredProducts = getFeaturedProducts();
  
  const scrollRef = React.useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 300;
      
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };
  
  if (featuredProducts.length === 0) {
    return null;
  }
  
  return (
    <section className="my-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Productos Destacados</h2>
        <div className="flex gap-2">
          <Button
            isIconOnly
            variant="flat"
            color="primary"
            onPress={() => scroll('left')}
            aria-label="Scroll left"
          >
            <Icon icon="lucide:chevron-left" />
          </Button>
          <Button
            isIconOnly
            variant="flat"
            color="primary"
            onPress={() => scroll('right')}
            aria-label="Scroll right"
          >
            <Icon icon="lucide:chevron-right" />
          </Button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {featuredProducts.map((product) => (
          <div key={product.id} className="min-w-[250px] max-w-[250px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;