import React from "react";
import AdminLayout from "../../components/admin/admin-layout";
import ProductTable from "../../components/admin/product-table";
import { useProducts } from "../../contexts/product-context";

const AdminProductsPage: React.FC = () => {
  const { products, deleteProduct } = useProducts();
  
  return (
    <AdminLayout title="Gestión de Productos">
      <ProductTable 
        products={products} 
        onDelete={deleteProduct} 
      />
    </AdminLayout>
  );
};

export default AdminProductsPage;