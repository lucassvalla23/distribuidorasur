import React from "react";
import { useHistory } from "react-router-dom";
import AdminLayout from "../../components/admin/admin-layout";
import ProductForm from "../../components/admin/product-form";
import { useProducts } from "../../contexts/product-context";
import { Product } from "../../types";

const AdminAddProductPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { addProduct } = useProducts();
  const history = useHistory();
  
  const handleSubmit = (product: Product) => {
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      addProduct(product);
      setIsSubmitting(false);
      history.push("/admin/products");
    }, 1000);
  };
  
  return (
    <AdminLayout title="Agregar Producto">
      <ProductForm 
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
      />
    </AdminLayout>
  );
};

export default AdminAddProductPage;