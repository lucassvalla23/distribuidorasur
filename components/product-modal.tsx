import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Image, RadioGroup, Radio } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Product } from "../types";
import { useCart } from "../contexts/cart-context";

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = React.useState(1);
  const [selectedVariant, setSelectedVariant] = React.useState<string | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0].id : undefined
  );
  const [isBox, setIsBox] = React.useState(false);
  const { addItem } = useCart();

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    addItem(product, quantity, isBox, selectedVariant);
    onClose();
    setQuantity(1);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2
    }).format(price);
  };

  // Get current price based on selection
  const getCurrentPrice = () => {
    if (isBox) {
      if (selectedVariant && product.variants) {
        const variant = product.variants.find(v => v.id === selectedVariant);
        return variant?.priceBox || product.priceBox || 0;
      }
      return product.priceBox || 0;
    } else {
      if (selectedVariant && product.variants) {
        const variant = product.variants.find(v => v.id === selectedVariant);
        return variant?.priceUnit || product.priceUnit;
      }
      return product.priceUnit;
    }
  };

  const getUnitsPerBox = () => {
    if (selectedVariant && product.variants) {
      const variant = product.variants.find(v => v.id === selectedVariant);
      return variant?.unitsPerBox || product.unitsPerBox || 0;
    }
    return product.unitsPerBox || 0;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {product.name}
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#2d2e2e] rounded-large p-4">
                  <Image
                    removeWrapper
                    alt={product.name}
                    className="w-full h-64 object-contain rounded-large"
                    src={product.image}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                    <p className="text-default-500 text-sm">{product.description}</p>
                  </div>
                  
                  {product.variants && product.variants.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Variantes</h4>
                      <RadioGroup
                        value={selectedVariant}
                        onValueChange={setSelectedVariant}
                        orientation="horizontal"
                      >
                        {product.variants.map((variant) => (
                          <Radio key={variant.id} value={variant.id}>
                            {variant.name}
                          </Radio>
                        ))}
                      </RadioGroup>
                    </div>
                  )}
                  
                  {(product.priceBox || (selectedVariant && product.variants?.find(v => v.id === selectedVariant)?.priceBox)) && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Presentación</h4>
                      <RadioGroup
                        value={isBox ? "box" : "unit"}
                        onValueChange={(value) => setIsBox(value === "box")}
                        orientation="horizontal"
                      >
                        <Radio value="unit">Unidad</Radio>
                        <Radio value="box">
                          Caja ({getUnitsPerBox()} unidades)
                        </Radio>
                      </RadioGroup>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Cantidad</h4>
                    <div className="flex items-center gap-2">
                      <Button
                        isIconOnly
                        variant="flat"
                        color="primary"
                        onPress={() => handleQuantityChange(quantity - 1)}
                        isDisabled={quantity <= 1}
                      >
                        <Icon icon="lucide:minus" />
                      </Button>
                      <span className="w-10 text-center">{quantity}</span>
                      <Button
                        isIconOnly
                        variant="flat"
                        color="primary"
                        onPress={() => handleQuantityChange(quantity + 1)}
                      >
                        <Icon icon="lucide:plus" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <h4 className="text-sm font-medium">Precio</h4>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold">
                        {formatPrice(getCurrentPrice())}
                      </span>
                      <span className="text-sm text-default-500">
                        {isBox ? `por caja` : `por unidad`}
                      </span>
                    </div>
                    <div className="text-sm text-default-500 mt-1">
                      Total: {formatPrice(getCurrentPrice() * quantity)}
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="light" onPress={onClose}>
                Cerrar
              </Button>
              <Button 
                color="primary" 
                onPress={handleAddToCart}
                startContent={<Icon icon="lucide:shopping-cart" />}
              >
                Agregar al Carrito
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ProductModal;