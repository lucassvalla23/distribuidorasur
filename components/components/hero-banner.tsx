import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface HeroBannerProps {
  onExploreClick: () => void;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreClick }) => {
  return (
    <div className="relative bg-[#2d2e2e] rounded-large overflow-hidden my-6">
      <div className="absolute inset-0 bg-[url('https://img.heroui.chat/image/shopping?w=1200&h=600&u=grocery-store')] bg-cover bg-center opacity-30"></div>
      <div className="relative z-10 py-16 px-6 md:px-12 flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-primary-500">
          Distribuidora Sur
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8 text-[#f4f4f4]">
          Tu distribuidora de confianza para golosinas, productos de almacén y limpieza.
          Calidad garantizada con los mejores precios del mercado.
        </p>
        <Button
          color="primary"
          size="lg"
          endContent={<Icon icon="lucide:arrow-right" />}
          onPress={onExploreClick}
          className="font-medium"
        >
          Explorar Productos
        </Button>
      </div>
    </div>
  );
};

export default HeroBanner;