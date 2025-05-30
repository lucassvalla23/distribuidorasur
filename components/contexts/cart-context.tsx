import React from "react";
import { CartItem, Product } from "../types";
import { addToast } from "@heroui/react";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity: number, isBox: boolean, variantId?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

export const CartContext = React.createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0,
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = React.useState<CartItem[]>(() => {
    const savedItems = localStorage.getItem("cart");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  React.useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, quantity: number, isBox: boolean, variantId?: string) => {
    let variant = undefined;
    let price = isBox ? product.priceBox : product.priceUnit;
    let unitsPerBox = product.unitsPerBox;
    
    if (variantId && product.variants) {
      variant = product.variants.find(v => v.id === variantId);
      if (variant) {
        price = isBox ? variant.priceBox : variant.priceUnit;
        unitsPerBox = variant.unitsPerBox;
      }
    }
    
    const variantName = variant ? variant.name : undefined;
    const cartItemId = `${product.id}${variantId ? `-${variantId}` : ''}-${isBox ? 'box' : 'unit'}`;
    
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === cartItemId);
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        
        addToast({
          title: "Producto actualizado",
          description: `Se actualizó la cantidad de ${product.name}`,
          color: "primary",
          classNames: {
            base: "bg-primary-500 text-black border-none",
            title: "text-black font-bold",
            description: "text-black"
          }
        });
        
        return updatedItems;
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          productId: product.id,
          name: product.name + (variantName ? ` - ${variantName}` : ''),
          image: product.image,
          price: price || 0,
          quantity,
          variant: variantName,
          isBox,
          unitsPerBox
        };
        
        addToast({
          title: "Producto agregado",
          description: `${product.name} agregado al carrito`,
          color: "primary",
          classNames: {
            base: "bg-primary-500 text-black border-none",
            title: "text-black font-bold",
            description: "text-black"
          }
        });
        
        return [...prevItems, newItem];
      }
    });
  };

  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
    
    addToast({
      title: "Producto eliminado",
      description: "El producto fue eliminado del carrito",
      color: "secondary",
      classNames: {
        base: "bg-secondary-500 text-white border-none font-bold",
        title: "text-white font-bold",
        description: "text-white"
      }
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    
    addToast({
      title: "Carrito vacío",
      description: "Se han eliminado todos los productos del carrito",
      color: "secondary",
      classNames: {
        base: "bg-secondary-500 text-white border-none font-bold",
        title: "text-white font-bold",
        description: "text-white"
      }
    });
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      addItem, 
      removeItem, 
      updateQuantity, 
      clearCart, 
      totalItems, 
      totalPrice 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => React.useContext(CartContext);