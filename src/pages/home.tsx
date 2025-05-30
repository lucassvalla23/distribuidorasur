import React from "react";
import { useLocation } from "react-router-dom";
import { useProducts } from "../contexts/product-context";
import HeroBanner from "../components/hero-banner";
import CategoryTabs from "../components/category-tabs";
import SubcategoryFilter from "../components/subcategory-filter";
import ProductGrid from "../components/product-grid";
import FeaturedProducts from "../components/featured-products";
import CategoryShowcase from "../components/category-showcase";
import { getCategoryName, getSubcategoryName } from "../data/categories";

const HomePage: React.FC = () => {
  const location = useLocation();
  const { getProductsByCategory, getProductsBySubcategory, getProduct } = useProducts();
  
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [selectedSubcategory, setSelectedSubcategory] = React.useState<string | null>(null);
  const [showProductsSection, setShowProductsSection] = React.useState(false);
  
  const productsRef = React.useRef<HTMLDivElement>(null);
  
  // Parse query parameters
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    const subcategoryParam = params.get("subcategory");
    const productParam = params.get("product");
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      setShowProductsSection(true);
      
      if (subcategoryParam) {
        setSelectedSubcategory(subcategoryParam);
      }
      
      setTimeout(() => {
        if (productsRef.current) {
          productsRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
    
    if (productParam) {
      const product = getProduct(productParam);
      if (product) {
        // Open product modal
        const event = new CustomEvent("openProductModal", { detail: { productId: productParam } });
        window.dispatchEvent(event);
      }
    }
  }, [location.search, getProduct]);
  
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    setShowProductsSection(true);
    
    setTimeout(() => {
      if (productsRef.current) {
        productsRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };
  
  const handleExploreClick = () => {
    setShowProductsSection(true);
    
    setTimeout(() => {
      if (productsRef.current) {
        productsRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };
  
  // Get products based on selected category and subcategory
  const products = React.useMemo(() => {
    if (selectedCategory === "all") {
      return getProductsByCategory("golosinas")
        .concat(getProductsByCategory("almacen"))
        .concat(getProductsByCategory("limpieza"));
    }
    
    if (selectedSubcategory) {
      return getProductsBySubcategory(selectedCategory, selectedSubcategory);
    }
    
    return getProductsByCategory(selectedCategory);
  }, [selectedCategory, selectedSubcategory, getProductsByCategory, getProductsBySubcategory]);
  
  // Generate title based on selection
  const productsTitle = React.useMemo(() => {
    if (selectedCategory === "all") {
      return "Todos los Productos";
    }
    
    if (selectedSubcategory) {
      return `${getSubcategoryName(selectedCategory, selectedSubcategory)} - ${getCategoryName(selectedCategory)}`;
    }
    
    return getCategoryName(selectedCategory);
  }, [selectedCategory, selectedSubcategory]);
  
  return (
    <div className="container mx-auto px-4">
      <HeroBanner onExploreClick={handleExploreClick} />
      
      <FeaturedProducts />
      
      <CategoryShowcase onCategorySelect={handleCategorySelect} />
      
      {showProductsSection && (
        <div ref={productsRef} className="mt-12 pt-4">
          <CategoryTabs 
            selectedCategory={selectedCategory} 
            onSelectCategory={handleCategorySelect} 
          />
          
          <SubcategoryFilter 
            categoryId={selectedCategory} 
            selectedSubcategory={selectedSubcategory} 
            onSelectSubcategory={setSelectedSubcategory} 
          />
          
          <ProductGrid products={products} title={productsTitle} />
        </div>
      )}
    </div>
  );
};

export default HomePage;