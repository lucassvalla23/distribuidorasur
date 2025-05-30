import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Badge, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useCart } from "../contexts/cart-context";
import { useProducts } from "../contexts/product-context";
import { categories } from "../data/categories";
import SearchBar from "./search-bar";

const AppNavbar: React.FC = () => {
  const { totalItems } = useCart();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Navbar 
      className={`transition-all duration-300 ${isScrolled ? 'shadow-md bg-background/90 backdrop-blur-md' : 'bg-background'}`}
      maxWidth="xl"
      isBordered={isScrolled}
    >
      <NavbarBrand>
        <RouterLink to="/" className="flex items-center">
          <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center mr-2">
            <span className="text-black font-bold">DS</span>
          </div>
          <p className="font-bold text-inherit text-xl">Distribuidora Sur</p>
        </RouterLink>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={isActive("/")}>
          <Link as={RouterLink} to="/" color={isActive("/") ? "primary" : "foreground"}>
            Inicio
          </Link>
        </NavbarItem>
        
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-primary-500 font-medium"
                endContent={<Icon icon="lucide:chevron-down" className="text-sm text-primary-500" />}
                radius="sm"
                variant="light"
              >
                Productos
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu aria-label="Categorías de productos">
            {categories.map((category) => (
              <DropdownItem key={category.id} textValue={category.name}>
                <Link 
                  as={RouterLink} 
                  to={`/?category=${category.id}`}
                  className="w-full"
                  color="foreground"
                >
                  {category.name}
                </Link>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        
        <NavbarItem isActive={isActive("/como-comprar")}>
          <Link as={RouterLink} to="/como-comprar" color={isActive("/como-comprar") ? "primary" : "foreground"}>
            Cómo Comprar
          </Link>
        </NavbarItem>
        
        <NavbarItem isActive={isActive("/contacto")}>
          <Link as={RouterLink} to="/contacto" color={isActive("/contacto") ? "primary" : "foreground"}>
            Contacto
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden md:flex">
          <SearchBar />
        </NavbarItem>
        <NavbarItem>
          <Button
            as={RouterLink}
            to="/admin/login"
            variant="solid"
            color="primary"
            startContent={<Icon icon="lucide:user" />}
            className="hidden sm:flex"
          >
            Admin
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            isIconOnly
            variant="solid"
            color="primary"
            aria-label="Carrito de compras"
            className="relative rounded-full shadow-md"
            onPress={() => {
              const cartDrawer = document.getElementById("cart-drawer");
              if (cartDrawer) {
                cartDrawer.classList.toggle("translate-x-full");
              }
            }}
          >
            <Icon icon="lucide:shopping-bag" className="text-xl" />
            {totalItems > 0 && (
              <Badge 
                content={totalItems} 
                color="secondary" 
                shape="circle" 
                size="sm"
                className="absolute -top-1 -right-1"
              />
            )}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default AppNavbar;