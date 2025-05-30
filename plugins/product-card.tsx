import React from "react";
import { Card, CardBody, CardFooter, Button, Image } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Product } from "../types";
import { useCart } from "../contexts/cart-context";
import ProductModal from "./product-modal";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { addItem } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2
    }).format(price);
  };

  return (
    <>
      <Card 
        isPressable 
        onPress={() => setIsModalOpen(true)}
        className="product-card transition-all duration-300 bg-[#2d2e2e]"
        disableRipple
      >
        <CardBody className="p-0 overflow-hidden">
          <div className="bg-[#2d2e2e] w-full h-48 flex items-center justify-center">
            <Image
              removeWrapper
              alt={product.name}
              className="w-full h-full object-contain p-2"
              src={product.image}
            />
          </div>
        </CardBody>
        <CardFooter className="flex flex-col items-start text-small gap-1 p-3">
          <div className="flex justify-between w-full">
            <span className="text-xs font-medium text-[#f4f4f4] uppercase">
              {product.subcategory}
            </span>
            {product.featured && (
              <span className="text-xs font-medium text-primary-500 flex items-center gap-1">
                <Icon icon="lucide:star" className="text-xs" />
                Destacado
              </span>
            )}
          </div>
          <h3 className="font-medium text-base line-clamp-2 h-12 text-[#f4f4f4]">{product.name}</h3>
          <div className="flex justify-between items-center w-full mt-1">
            <div className="w-full">
              <p className="font-semibold text-[#f4f4f4]">{formatPrice(product.priceUnit)}</p>
              {product.priceBox && (
                <p className="text-xs text-[#a0a0a0]">
                  Caja: {formatPrice(product.priceBox)}
                </p>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
      
      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProductCard;