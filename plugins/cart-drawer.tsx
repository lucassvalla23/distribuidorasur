import React from "react";
import { Button, Divider, Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useCart } from "../contexts/cart-context";
import { addToast } from "@heroui/react";
import CartItem from "./cart-item";

const CartDrawer: React.FC = () => {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const [customerName, setCustomerName] = React.useState("");
  const [customerPhone, setCustomerPhone] = React.useState("");
  const [customerAddress, setCustomerAddress] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleCheckout = () => {
    if (!customerName || !customerPhone) {
      addToast({
        title: "Información incompleta",
        description: "Por favor complete su nombre y teléfono para continuar",
        color: "warning",
        classNames: {
          base: "bg-warning-500 text-black border-none font-bold",
          title: "text-black font-bold",
          description: "text-black"
        }
      });
      return;
    }

    if (items.length === 0) {
      addToast({
        title: "Carrito vacío",
        description: "Agregue productos al carrito antes de realizar el pedido",
        color: "warning",
        classNames: {
          base: "bg-warning-500 text-black border-none font-bold",
          title: "text-black font-bold",
          description: "text-black"
        }
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      clearCart();
      setCustomerName("");
      setCustomerPhone("");
      setCustomerAddress("");
      
      addToast({
        title: "¡Pedido enviado!",
        description: "Nos pondremos en contacto para confirmar su pedido",
        color: "success",
        classNames: {
          base: "bg-success-500 text-white border-none font-bold",
          title: "text-white font-bold",
          description: "text-white"
        }
      });

      // Close drawer
      const cartDrawer = document.getElementById("cart-drawer");
      if (cartDrawer) {
        cartDrawer.classList.add("translate-x-full");
      }
    }, 1500);
  };

  const closeDrawer = () => {
    const cartDrawer = document.getElementById("cart-drawer");
    if (cartDrawer) {
      cartDrawer.classList.add("translate-x-full");
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2
    }).format(price);
  };

  return (
    <div 
      id="cart-drawer" 
      className="fixed top-0 right-0 h-full w-full sm:w-96 bg-[#2d2e2e] shadow-lg z-50 transform translate-x-full transition-transform duration-300 ease-in-out text-[#f4f4f4]"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-[#4a4b4b]">
          <h2 className="text-xl font-semibold text-[#f4f4f4]">Carrito de Compras</h2>
          <Button isIconOnly variant="flat" color="primary" onPress={closeDrawer}>
            <Icon icon="lucide:x" className="text-lg" />
          </Button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Icon icon="lucide:shopping-cart" className="text-5xl text-primary-300 mb-4" />
              <p className="text-lg font-medium">Su carrito está vacío</p>
              <p className="text-sm text-default-500 mt-2">Agregue productos para comenzar a comprar</p>
              <Button 
                color="primary" 
                variant="flat" 
                className="mt-6"
                onPress={closeDrawer}
              >
                Ver Productos
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="p-4 border-t border-[#4a4b4b]">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Subtotal:</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total ({totalItems} items):</span>
              <span className="font-bold text-lg">{formatPrice(totalPrice)}</span>
            </div>
            
            <Divider className="my-4" />
            
            <div className="space-y-3 mb-4">
              <Input
                label="Nombre"
                placeholder="Ingrese su nombre"
                value={customerName}
                onValueChange={setCustomerName}
                variant="bordered"
                color="primary"
                className="bg-[#383939] text-[#f4f4f4]"
              />
              <Input
                label="Teléfono"
                placeholder="Ingrese su teléfono"
                value={customerPhone}
                onValueChange={setCustomerPhone}
                variant="bordered"
                color="primary"
                className="bg-[#383939] text-[#f4f4f4]"
              />
              <Input
                label="Dirección (opcional)"
                placeholder="Ingrese su dirección"
                value={customerAddress}
                onValueChange={setCustomerAddress}
                variant="bordered"
                color="primary"
                className="bg-[#383939] text-[#f4f4f4]"
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                color="secondary" 
                variant="flat" 
                className="flex-1"
                onPress={clearCart}
              >
                Vaciar
              </Button>
              <Button 
                color="primary" 
                className="flex-1"
                onPress={handleCheckout}
                isLoading={isSubmitting}
              >
                Realizar Pedido
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;