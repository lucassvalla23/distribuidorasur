import React from "react";
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import AdminLayout from "../../components/admin/admin-layout";
import { useProducts } from "../../contexts/product-context";
import { categories } from "../../data/categories";

const AdminDashboardPage: React.FC = () => {
  const { products } = useProducts();
  
  // Calculate statistics
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const lowStockProducts = products.filter(product => product.stock < 10).length;
  const featuredProducts = products.filter(product => product.featured).length;
  
  // Products by category
  const productsByCategory = categories.map(category => {
    const count = products.filter(product => product.category === category.id).length;
    return {
      id: category.id,
      name: category.name,
      count
    };
  });
  
  // Recent products
  const recentProducts = [...products]
    .sort((a, b) => parseInt(b.id) - parseInt(a.id))
    .slice(0, 5);
  
  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary-100 p-3 rounded-full">
                <Icon icon="lucide:package" className="text-2xl text-primary-500" />
              </div>
              <div>
                <p className="text-sm text-default-500">Total Productos</p>
                <p className="text-2xl font-bold">{totalProducts}</p>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-secondary-100 p-3 rounded-full">
                <Icon icon="lucide:star" className="text-2xl text-secondary-500" />
              </div>
              <div>
                <p className="text-sm text-default-500">Productos Destacados</p>
                <p className="text-2xl font-bold">{featuredProducts}</p>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-success-100 p-3 rounded-full">
                <Icon icon="lucide:layers" className="text-2xl text-success-500" />
              </div>
              <div>
                <p className="text-sm text-default-500">Stock Total</p>
                <p className="text-2xl font-bold">{totalStock}</p>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-warning-100 p-3 rounded-full">
                <Icon icon="lucide:alert-triangle" className="text-2xl text-warning-500" />
              </div>
              <div>
                <p className="text-sm text-default-500">Bajo Stock</p>
                <p className="text-2xl font-bold">{lowStockProducts}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardBody className="p-6">
            <h2 className="text-xl font-semibold mb-4">Productos por Categoría</h2>
            
            <div className="space-y-4">
              {productsByCategory.map((cat) => (
                <div key={cat.id} className="flex flex-col">
                  <div className="flex justify-between items-center mb-1">
                    <span>{cat.name}</span>
                    <span className="font-medium">{cat.count}</span>
                  </div>
                  <div className="w-full bg-default-100 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full" 
                      style={{ 
                        width: `${totalProducts > 0 ? (cat.count / totalProducts) * 100 : 0}%` 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <h2 className="text-xl font-semibold mb-4">Productos Recientes</h2>
            
            {recentProducts.length === 0 ? (
              <p className="text-default-500 text-center py-4">No hay productos recientes</p>
            ) : (
              <div className="space-y-4">
                {recentProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-3">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-10 h-10 rounded-small object-cover"
                    />
                    <div className="flex-grow">
                      <p className="font-medium line-clamp-1">{product.name}</p>
                      <p className="text-xs text-default-500">
                        Stock: {product.stock} | ${product.priceUnit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;