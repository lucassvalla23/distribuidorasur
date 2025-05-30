import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import AdminLayout from "../../components/admin/admin-layout";
import ProductForm from "../../components/admin/product-form";
import { useProducts } from "../../contexts/product-context";
import { Product } from "../../types";
import { addToast } from "@heroui/react";

interface RouteParams {
  id: string;
}

const AdminEditProductPage: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { getProduct, updateProduct } = useProducts();
  const history = useHistory();
  
  const product = getProduct(id);
  
  React.useEffect(() => {
    if (!product) {
      addToast({
        title: "Error",
        description: "Producto no encontrado",
        color: "danger"
      });
      history.push("/admin/products");
    }
  }, [product, history]);
  
  const handleSubmit = (updatedProduct: Product) => {
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      updateProduct(id, updatedProduct);
      setIsSubmitting(false);
      history.push("/admin/products");
    }, 1000);
  };
  
  if (!product) {
    return null;
  }
  
  return (
    <AdminLayout title="Editar Producto">
      <div className="mb-6">
        <Button
          variant="light"
          color="default"
          startContent={<Icon icon="lucide:arrow-left" />}
          onPress={() => history.push("/admin/products")}
        >
          Volver a Productos
        </Button>
      </div>
      
      <ProductForm 
        initialProduct={product}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
      />
    </AdminLayout>
  );
};

export default AdminEditProductPage;