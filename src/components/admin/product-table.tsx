import React from "react";
import { Link } from "react-router-dom";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Chip, Pagination, Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Product } from "../../types";
import { getCategoryName, getSubcategoryName } from "../../data/categories";

interface ProductTableProps {
  products: Product[];
  onDelete: (id: string) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onDelete }) => {
  const [page, setPage] = React.useState(1);
  const [filterValue, setFilterValue] = React.useState("");
  const rowsPerPage = 10;

  const filteredProducts = React.useMemo(() => {
    if (!filterValue) return products;
    
    return products.filter(product => 
      product.name.toLowerCase().includes(filterValue.toLowerCase()) ||
      product.description.toLowerCase().includes(filterValue.toLowerCase()) ||
      getCategoryName(product.category).toLowerCase().includes(filterValue.toLowerCase()) ||
      getSubcategoryName(product.category, product.subcategory).toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [products, filterValue]);

  const pages = Math.ceil(filteredProducts.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    
    return filteredProducts.slice(start, end);
  }, [page, filteredProducts]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2
    }).format(price);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("¿Está seguro de que desea eliminar este producto?")) {
      onDelete(id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Buscar productos..."
          value={filterValue}
          onValueChange={setFilterValue}
          startContent={<Icon icon="lucide:search" className="text-default-400" />}
          className="w-full max-w-xs bg-[#2d2e2e] text-[#f4f4f4]"
          variant="bordered"
          color="primary"
        />
      </div>
      
      <Table 
        aria-label="Tabla de productos"
        bottomContent={
          pages > 0 ? (
            <div className="flex justify-center">
              <Pagination
                isCompact
                showControls
                color="primary"
                page={page}
                total={pages}
                onChange={setPage}
                classNames={{
                  item: "text-[#f4f4f4]",
                  cursor: "bg-primary-500"
                }}
              />
            </div>
          ) : null
        }
        classNames={{
          wrapper: "min-h-[400px] bg-[#2d2e2e]",
          th: "bg-[#383939] text-[#f4f4f4]",
          td: "text-[#f4f4f4]",
        }}
        removeWrapper
      >
        <TableHeader>
          <TableColumn>PRODUCTO</TableColumn>
          <TableColumn>CATEGORÍA</TableColumn>
          <TableColumn>PRECIO</TableColumn>
          <TableColumn>STOCK</TableColumn>
          <TableColumn>ESTADO</TableColumn>
          <TableColumn>ACCIONES</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No hay productos disponibles">
          {items.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#2d2e2e] rounded-small flex items-center justify-center">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain p-1 rounded-small"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-tiny text-default-500 line-clamp-1">{product.description}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p>{getCategoryName(product.category)}</p>
                  <p className="text-tiny text-default-500">{getSubcategoryName(product.category, product.subcategory)}</p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p>{formatPrice(product.priceUnit)}</p>
                  {product.priceBox && (
                    <p className="text-tiny text-default-500">
                      Caja: {formatPrice(product.priceBox)}
                    </p>
                  )}
                </div>
              </TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                {product.featured ? (
                  <Chip color="primary" size="sm" variant="flat">Destacado</Chip>
                ) : (
                  <Chip color="default" size="sm" variant="flat">Normal</Chip>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    as={Link}
                    to={`/admin/products/edit/${product.id}`}
                    isIconOnly
                    size="sm"
                    variant="light"
                    color="primary"
                  >
                    <Icon icon="lucide:edit" />
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    color="danger"
                    onPress={() => handleDelete(product.id)}
                  >
                    <Icon icon="lucide:trash-2" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;