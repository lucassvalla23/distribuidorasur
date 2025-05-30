import { Category } from "../types";

export const categories: Category[] = [
  {
    id: "golosinas",
    name: "Golosinas",
    subcategories: [
      { id: "alfajores", name: "Alfajores" },
      { id: "chocolates", name: "Chocolates" },
      { id: "caramelos", name: "Caramelos" },
      { id: "chicles", name: "Chicles" },
      { id: "chupetines", name: "Chupetines" },
      { id: "turrones", name: "Turrones" },
      { id: "barritas", name: "Barritas" },
      { id: "gomitas", name: "Gomitas" }
    ]
  },
  {
    id: "almacen",
    name: "Productos de Almacén",
    subcategories: [
      { id: "aceites", name: "Aceites" },
      { id: "arroz", name: "Arroz" },
      { id: "azucar", name: "Azúcar" },
      { id: "conservas", name: "Conservas" },
      { id: "fideos", name: "Fideos" },
      { id: "galletitas", name: "Galletitas" },
      { id: "harinas", name: "Harinas" },
      { id: "legumbres", name: "Legumbres" },
      { id: "yerba", name: "Yerba" }
    ]
  },
  {
    id: "limpieza",
    name: "Productos de Limpieza",
    subcategories: [
      { id: "detergentes", name: "Detergentes" },
      { id: "desinfectantes", name: "Desinfectantes" },
      { id: "jabon", name: "Jabón" },
      { id: "lavandina", name: "Lavandina" },
      { id: "limpiadores", name: "Limpiadores" },
      { id: "papel", name: "Papel" },
      { id: "suavizantes", name: "Suavizantes" }
    ]
  }
];

export const getSubcategories = (categoryId: string) => {
  const category = categories.find(cat => cat.id === categoryId);
  return category ? category.subcategories : [];
};

export const getCategoryName = (categoryId: string) => {
  const category = categories.find(cat => cat.id === categoryId);
  return category ? category.name : '';
};

export const getSubcategoryName = (categoryId: string, subcategoryId: string) => {
  const category = categories.find(cat => cat.id === categoryId);
  if (!category) return '';
  
  const subcategory = category.subcategories.find(sub => sub.id === subcategoryId);
  return subcategory ? subcategory.name : '';
};
