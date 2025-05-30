import React from "react";
import { Tabs, Tab } from "@heroui/react";
import { categories } from "../data/categories";

interface CategoryTabsProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="w-full overflow-x-auto">
      <Tabs 
        selectedKey={selectedCategory} 
        onSelectionChange={(key) => onSelectCategory(key as string)}
        color="primary"
        variant="underlined"
        classNames={{
          tabList: "gap-6",
          cursor: "bg-primary-500"
        }}
      >
        <Tab key="all" title="Todos" />
        {categories.map((category) => (
          <Tab key={category.id} title={category.name} />
        ))}
      </Tabs>
    </div>
  );
};

export default CategoryTabs;