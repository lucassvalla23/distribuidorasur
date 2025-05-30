import React from "react";
import { Button, Image } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useCart } from "../contexts/cart-context";
import { CartItem as CartItemType } from "../types";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2
    }).format(price);
  };

  return (
    <div className="flex gap-3 p-2 border border-[#4a4b4b] rounded-medium bg-[#383939]">
      <div className="w-20 h-20 flex-shrink-0 bg-[#2d2e2e] rounded-medium">
        <Image
          removeWrapper
          alt={item.name}
          className="w-full h-full object-contain rounded-medium p-1"
          src={item.image}
        />
      </div>
      
      <div className="flex-grow">
        <div className="flex justify-between">
          <h3 className="font-medium text-sm line-clamp-2 text-[#f4f4f4]">{item.name}</h3>
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            color="primary"
            className="h-6 w-6 min-w-0"
            onPress={() => removeItem(item.id)}
          >
            <Icon icon="lucide:x" className="text-xs" />
          </Button>
        </div>
        
        <div className="text-xs text-[#a0a0a0] mt-1">
          {item.isBox ? `Caja (${item.unitsPerBox} unidades)` : "Unidad"}
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="font-semibold text-[#f4f4f4]">
            {formatPrice(item.price)}
          </div>
          
          <div className="flex items-center gap-1">
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              color="primary"
              className="h-6 w-6 min-w-0"
              onPress={() => updateQuantity(item.id, item.quantity - 1)}
              isDisabled={item.quantity <= 1}
            >
              <Icon icon="lucide:minus" className="text-xs" />
            </Button>
            
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              color="primary"
              className="h-6 w-6 min-w-0"
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Icon icon="lucide:plus" className="text-xs" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;