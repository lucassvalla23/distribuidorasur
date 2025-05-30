import React from "react";
import { Chip } from "@heroui/react";
import { getSubcategories } from "../data/categories";

interface SubcategoryFilterProps {
  categoryId: string;
  selectedSubcategory: string | null;
  onSelectSubcategory: (subcategory: string | null) => void;
}

const SubcategoryFilter: React.FC<SubcategoryFilterProps> = ({ 
  categoryId, 
  selectedSubcategory, 
  onSelectSubcategory 
}) => {
  const subcategories = getSubcategories(categoryId);

  if (categoryId === "all" || subcategories.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 my-4">
      <Chip
        color={selectedSubcategory === null ? "primary" : "default"}
        variant={selectedSubcategory === null ? "solid" : "bordered"}
        className="cursor-pointer"
        onClick={() => onSelectSubcategory(null)}
      >
        Todos
      </Chip>
      {subcategories.map((subcategory) => (
        <Chip
          key={subcategory.id}
          color={selectedSubcategory === subcategory.id ? "primary" : "default"}
          variant={selectedSubcategory === subcategory.id ? "solid" : "bordered"}
          className="cursor-pointer"
          onClick={() => onSelectSubcategory(subcategory.id)}
        >
          {subcategory.name}
        </Chip>
      ))}
    </div>
  );
};

export default SubcategoryFilter;