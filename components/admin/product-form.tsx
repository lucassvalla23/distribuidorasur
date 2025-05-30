import React from "react";
import { Button, Input, Textarea, Select, SelectItem, Checkbox, Card, CardBody, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Product, ProductVariant } from "../../types";
import { categories, getSubcategories } from "../../data/categories";

interface ProductFormProps {
  initialProduct?: Product;
  onSubmit: (product: Product) => void;
  isLoading?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialProduct, onSubmit, isLoading = false }) => {
  const [name, setName] = React.useState(initialProduct?.name || "");
  const [description, setDescription] = React.useState(initialProduct?.description || "");
  const [category, setCategory] = React.useState(initialProduct?.category || "");
  const [subcategory, setSubcategory] = React.useState(initialProduct?.subcategory || "");
  const [priceUnit, setPriceUnit] = React.useState(initialProduct?.priceUnit?.toString() || "");
  const [priceBox, setPriceBox] = React.useState(initialProduct?.priceBox?.toString() || "");
  const [unitsPerBox, setUnitsPerBox] = React.useState(initialProduct?.unitsPerBox?.toString() || "");
  const [stock, setStock] = React.useState(initialProduct?.stock?.toString() || "");
  const [featured, setFeatured] = React.useState(initialProduct?.featured || false);
  const [image, setImage] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState(initialProduct?.image || "");
  const [hasBoxOption, setHasBoxOption] = React.useState(Boolean(initialProduct?.priceBox));
  const [hasVariants, setHasVariants] = React.useState(Boolean(initialProduct?.variants && initialProduct.variants.length > 0));
  const [variants, setVariants] = React.useState<ProductVariant[]>(initialProduct?.variants || []);
  
  const subcategories = getSubcategories(category);
  
  React.useEffect(() => {
    if (category && subcategories.length > 0 && !subcategory) {
      setSubcategory(subcategories[0].id);
    }
  }, [category, subcategory, subcategories]);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setImagePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const addVariant = () => {
    const newVariant: ProductVariant = {
      id: `new-${Date.now()}`,
      name: "",
      priceUnit: 0,
      priceBox: hasBoxOption ? 0 : undefined,
      unitsPerBox: hasBoxOption ? 0 : undefined,
      stock: 0
    };
    
    setVariants([...variants, newVariant]);
  };
  
  const updateVariant = (index: number, field: keyof ProductVariant, value: any) => {
    const updatedVariants = [...variants];
    updatedVariants[index] = {
      ...updatedVariants[index],
      [field]: value
    };
    setVariants(updatedVariants);
  };
  
  const removeVariant = (index: number) => {
    const updatedVariants = variants.filter((_, i) => i !== index);
    setVariants(updatedVariants);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Use a placeholder image if no image is selected
    const productImage = imagePreview || "https://img.heroui.chat/image/food?w=400&h=300&u=placeholder";
    
    const product: Product = {
      id: initialProduct?.id || "",
      name,
      description,
      category,
      subcategory,
      image: productImage,
      priceUnit: parseFloat(priceUnit),
      stock: parseInt(stock),
      featured,
      ...(hasBoxOption && {
        priceBox: parseFloat(priceBox),
        unitsPerBox: parseInt(unitsPerBox)
      }),
      ...(hasVariants && { variants })
    };
    
    onSubmit(product);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Input
            label="Nombre del Producto"
            placeholder="Ingrese el nombre del producto"
            value={name}
            onValueChange={setName}
            variant="bordered"
            color="primary"
            isRequired
          />
          
          <Textarea
            label="Descripción"
            placeholder="Ingrese una descripción del producto"
            value={description}
            onValueChange={setDescription}
            variant="bordered"
            color="primary"
            minRows={3}
            isRequired
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Categoría"
              placeholder="Seleccione una categoría"
              selectedKeys={[category]}
              onChange={(e) => setCategory(e.target.value)}
              variant="bordered"
              color="primary"
              isRequired
            >
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </Select>
            
            <Select
              label="Subcategoría"
              placeholder="Seleccione una subcategoría"
              selectedKeys={[subcategory]}
              onChange={(e) => setSubcategory(e.target.value)}
              variant="bordered"
              color="primary"
              isDisabled={!category || subcategories.length === 0}
              isRequired
            >
              {subcategories.map((subcat) => (
                <SelectItem key={subcat.id} value={subcat.id}>
                  {subcat.name}
                </SelectItem>
              ))}
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Precio Unitario"
              placeholder="0.00"
              value={priceUnit}
              onValueChange={setPriceUnit}
              variant="bordered"
              color="primary"
              type="number"
              min="0"
              step="0.01"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
              isRequired
            />
            
            <Input
              label="Stock"
              placeholder="0"
              value={stock}
              onValueChange={setStock}
              variant="bordered"
              color="primary"
              type="number"
              min="0"
              isRequired
            />
          </div>
          
          <div className="flex items-center gap-4">
            <Checkbox
              isSelected={hasBoxOption}
              onValueChange={setHasBoxOption}
              color="primary"
            >
              Vender por caja
            </Checkbox>
            
            <Checkbox
              isSelected={featured}
              onValueChange={setFeatured}
              color="primary"
            >
              Producto destacado
            </Checkbox>
          </div>
          
          {hasBoxOption && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Precio por Caja"
                placeholder="0.00"
                value={priceBox}
                onValueChange={setPriceBox}
                variant="bordered"
                color="primary"
                type="number"
                min="0"
                step="0.01"
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">$</span>
                  </div>
                }
                isRequired={hasBoxOption}
              />
              
              <Input
                label="Unidades por Caja"
                placeholder="0"
                value={unitsPerBox}
                onValueChange={setUnitsPerBox}
                variant="bordered"
                color="primary"
                type="number"
                min="1"
                isRequired={hasBoxOption}
              />
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium mb-2">Imagen del Producto</p>
            <div className="border-2 border-dashed border-default-200 rounded-large p-4 text-center relative">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Vista previa"
                    className="mx-auto h-48 object-contain bg-[#2d2e2e] p-2 rounded-medium"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Button
                    isIconOnly
                    color="danger"
                    size="sm"
                    variant="flat"
                    className="absolute top-2 right-2"
                    onPress={() => {
                      setImage(null);
                      setImagePreview("");
                    }}
                  >
                    <Icon icon="lucide:x" />
                  </Button>
                </div>
              ) : (
                <div className="py-8">
                  <Icon icon="lucide:image" className="text-4xl text-default-400 mx-auto mb-2" />
                  <p className="text-default-500">Haga clic para seleccionar una imagen</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 pointer-events-auto"
                style={{ pointerEvents: "auto" }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
          
          <div className="mt-8 pt-4">
            <div className="flex items-center justify-between mb-4">
              <Checkbox
                isSelected={hasVariants}
                onValueChange={setHasVariants}
                color="primary"
              >
                Este producto tiene variantes
              </Checkbox>
              
              {hasVariants && (
                <Button
                  size="sm"
                  color="primary"
                  variant="flat"
                  startContent={<Icon icon="lucide:plus" />}
                  onPress={addVariant}
                >
                  Agregar Variante
                </Button>
              )}
            </div>
            
            {hasVariants && (
              <div className="space-y-4">
                {variants.length === 0 ? (
                  <p className="text-center text-default-500 py-4">
                    No hay variantes. Haga clic en "Agregar Variante" para comenzar.
                  </p>
                ) : (
                  variants.map((variant, index) => (
                    <Card key={variant.id} className="overflow-visible">
                      <CardBody className="gap-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Variante {index + 1}</h3>
                          <Button
                            isIconOnly
                            size="sm"
                            color="danger"
                            variant="light"
                            onPress={() => removeVariant(index)}
                          >
                            <Icon icon="lucide:trash-2" />
                          </Button>
                        </div>
                        
                        <Divider />
                        
                        <Input
                          label="Nombre de la Variante"
                          placeholder="Ej: Blanco, Negro, Frutilla, etc."
                          value={variant.name}
                          onValueChange={(value) => updateVariant(index, "name", value)}
                          variant="bordered"
                          color="primary"
                          isRequired
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            label="Precio Unitario"
                            placeholder="0.00"
                            value={variant.priceUnit.toString()}
                            onValueChange={(value) => updateVariant(index, "priceUnit", parseFloat(value) || 0)}
                            variant="bordered"
                            color="primary"
                            type="number"
                            min="0"
                            step="0.01"
                            startContent={
                              <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">$</span>
                              </div>
                            }
                            isRequired
                          />
                          
                          <Input
                            label="Stock"
                            placeholder="0"
                            value={variant.stock.toString()}
                            onValueChange={(value) => updateVariant(index, "stock", parseInt(value) || 0)}
                            variant="bordered"
                            color="primary"
                            type="number"
                            min="0"
                            isRequired
                          />
                        </div>
                        
                        {hasBoxOption && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                              label="Precio por Caja"
                              placeholder="0.00"
                              value={variant.priceBox?.toString() || ""}
                              onValueChange={(value) => updateVariant(index, "priceBox", parseFloat(value) || 0)}
                              variant="bordered"
                              color="primary"
                              type="number"
                              min="0"
                              step="0.01"
                              startContent={
                                <div className="pointer-events-none flex items-center">
                                  <span className="text-default-400 text-small">$</span>
                                </div>
                              }
                              isRequired={hasBoxOption}
                            />
                            
                            <Input
                              label="Unidades por Caja"
                              placeholder="0"
                              value={variant.unitsPerBox?.toString() || ""}
                              onValueChange={(value) => updateVariant(index, "unitsPerBox", parseInt(value) || 0)}
                              variant="bordered"
                              color="primary"
                              type="number"
                              min="1"
                              isRequired={hasBoxOption}
                            />
                          </div>
                        )}
                      </CardBody>
                    </Card>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-4">
        <Button
          as="a"
          href="/admin/products"
          variant="flat"
          color="default"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          color="primary"
          isLoading={isLoading}
        >
          {initialProduct ? "Actualizar Producto" : "Crear Producto"}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;