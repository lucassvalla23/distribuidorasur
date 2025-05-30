import React from "react";
import { Product } from "../types";
import { sampleProducts } from "../data/sample-products";
import { addToast } from "@heroui/react";

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Product) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  getProductsBySubcategory: (category: string, subcategory: string) => Product[];
  getFeaturedProducts: () => Product[];
  searchProducts: (query: string) => Product[];
}

export const ProductContext = React.createContext<ProductContextType>({
  products: [],
  addProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
  getProduct: () => undefined,
  getProductsByCategory: () => [],
  getProductsBySubcategory: () => [],
  getFeaturedProducts: () => [],
  searchProducts: () => [],
});

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = React.useState<Product[]>(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : sampleProducts;
  });

  React.useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Product) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    };
    
    setProducts(prevProducts => [...prevProducts, newProduct]);
    
    addToast({
      title: "Producto agregado",
      description: `${product.name} ha sido agregado correctamente`,
      color: "success"
    });
  };

  const updateProduct = (id: string, product: Product) => {
    setProducts(prevProducts => 
      prevProducts.map(p => p.id === id ? { ...product, id } : p)
    );
    
    addToast({
      title: "Producto actualizado",
      description: `${product.name} ha sido actualizado correctamente`,
      color: "success"
    });
  };

  const deleteProduct = (id: string) => {
    const productToDelete = products.find(p => p.id === id);
    
    setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
    
    if (productToDelete) {
      addToast({
        title: "Producto eliminado",
        description: `${productToDelete.name} ha sido eliminado correctamente`,
        color: "secondary"
      });
    }
  };

  const getProduct = (id: string) => {
    return products.find(p => p.id === id);
  };

  const getProductsByCategory = (category: string) => {
    return products.filter(p => p.category === category);
  };

  const getProductsBySubcategory = (category: string, subcategory: string) => {
    return products.filter(p => p.category === category && p.subcategory === subcategory);
  };

  const getFeaturedProducts = () => {
    return products.filter(p => p.featured);
  };

  const searchProducts = (query: string) => {
    if (!query || query.trim() === '') return [];
    
    const normalizedQuery = query.toLowerCase().trim();
    
    return products.filter(product => 
      product.name.toLowerCase().includes(normalizedQuery) || 
      product.description.toLowerCase().includes(normalizedQuery) ||
      product.category.toLowerCase().includes(normalizedQuery) ||
      product.subcategory.toLowerCase().includes(normalizedQuery)
    );
  };

  return (
    <ProductContext.Provider value={{ 
      products, 
      addProduct, 
      updateProduct, 
      deleteProduct, 
      getProduct, 
      getProductsByCategory, 
      getProductsBySubcategory, 
      getFeaturedProducts,
      searchProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => React.useContext(ProductContext);