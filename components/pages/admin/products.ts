import { Product } from "../types";

export const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Alfajor Triple Chocolate",
    description: "Delicioso alfajor triple de chocolate con relleno de dulce de leche",
    category: "golosinas",
    subcategory: "alfajores",
    image: "https://img.heroui.chat/image/food?w=400&h=300&u=alfajor1",
    priceUnit: 350,
    priceBox: 3000,
    unitsPerBox: 12,
    variants: [
      {
        id: "1-1",
        name: "Blanco",
        priceUnit: 350,
        priceBox: 3000,
        unitsPerBox: 12,
        stock: 100
      },
      {
        id: "1-2",
        name: "Negro",
        priceUnit: 350,
        priceBox: 3000,
        unitsPerBox: 12,
        stock: 80
      }
    ],
    featured: true,
    stock: 180
  },
  {
    id: "2",
    name: "Chocolate con Almendras",
    description: "Chocolate con leche y almendras enteras",
    category: "golosinas",
    subcategory: "chocolates",
    image: "https://img.heroui.chat/image/food?w=400&h=300&u=chocolate1",
    priceUnit: 500,
    priceBox: 4500,
    unitsPerBox: 10,
    featured: true,
    stock: 50
  },
  {
    id: "3",
    name: "Caramelos Surtidos",
    description: "Bolsa de caramelos surtidos de diferentes sabores",
    category: "golosinas",
    subcategory: "caramelos",
    image: "https://img.heroui.chat/image/food?w=400&h=300&u=caramelos1",
    priceUnit: 200,
    priceBox: 1800,
    unitsPerBox: 10,
    stock: 30
  },
  {
    id: "4",
    name: "Aceite de Girasol",
    description: "Aceite de girasol de primera calidad",
    category: "almacen",
    subcategory: "aceites",
    image: "https://img.heroui.chat/image/food?w=400&h=300&u=aceite1",
    priceUnit: 1200,
    priceBox: 14000,
    unitsPerBox: 12,
    featured: true,
    stock: 40
  },
  {
    id: "5",
    name: "Arroz Largo Fino",
    description: "Arroz largo fino de excelente calidad",
    category: "almacen",
    subcategory: "arroz",
    image: "https://img.heroui.chat/image/food?w=400&h=300&u=arroz1",
    priceUnit: 800,
    priceBox: 9000,
    unitsPerBox: 12,
    stock: 60
  },
  {
    id: "6",
    name: "Detergente Concentrado",
    description: "Detergente concentrado para vajilla",
    category: "limpieza",
    subcategory: "detergentes",
    image: "https://img.heroui.chat/image/food?w=400&h=300&u=detergente1",
    priceUnit: 600,
    priceBox: 6500,
    unitsPerBox: 12,
    featured: true,
    stock: 45
  },
  {
    id: "7",
    name: "Lavandina Concentrada",
    description: "Lavandina concentrada con aroma a limón",
    category: "limpieza",
    subcategory: "lavandina",
    image: "https://img.heroui.chat/image/food?w=400&h=300&u=lavandina1",
    priceUnit: 450,
    priceBox: 5000,
    unitsPerBox: 12,
    stock: 35
  },
  {
    id: "8",
    name: "Galletitas Surtidas",
    description: "Surtido de galletitas dulces y saladas",
    category: "almacen",
    subcategory: "galletitas",
    image: "https://img.heroui.chat/image/food?w=400&h=300&u=galletitas1",
    priceUnit: 550,
    priceBox: 6000,
    unitsPerBox: 12,
    stock: 25
  }
];
