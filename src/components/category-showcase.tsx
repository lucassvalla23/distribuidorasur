import React from "react";
import { Card, CardBody, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { categories } from "../data/categories";

interface CategoryShowcaseProps {
  onCategorySelect: (category: string) => void;
}

const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ onCategorySelect }) => {
  // Images for each category
  const categoryImages = {
    golosinas: "https://img.heroui.chat/image/food?w=400&h=300&u=golosinas",
    almacen: "https://img.heroui.chat/image/food?w=400&h=300&u=almacen",
    limpieza: "https://img.heroui.chat/image/food?w=400&h=300&u=limpieza"
  };

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-6">Nuestras Categorías</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card 
            key={category.id} 
            isPressable
            onPress={() => onCategorySelect(category.id)}
            className="overflow-hidden h-64 transition-transform duration-300 hover:-translate-y-2"
          >
            <CardBody className="p-0 overflow-hidden">
              <div className="absolute inset-0 bg-black/40 z-10 flex flex-col items-center justify-center text-white p-6">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-sm text-center mb-4">
                  {category.subcategories.slice(0, 4).map(sub => sub.name).join(', ')}
                  {category.subcategories.length > 4 ? '...' : ''}
                </p>
                <Button 
                  color="primary"
                  variant="solid"
                  endContent={<Icon icon="lucide:arrow-right" />}
                  size="sm"
                  onPress={() => onCategorySelect(category.id)} // Añadido onPress para asegurar funcionalidad
                  className="font-medium" // Añadido font-medium para mejor visibilidad
                >
                  Ver Productos
                </Button>
              </div>
              <img 
                src={categoryImages[category.id as keyof typeof categoryImages]} 
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CategoryShowcase;