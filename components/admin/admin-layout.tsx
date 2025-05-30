import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useAuth } from "../../contexts/auth-context";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const { logout, user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#383939] text-[#f4f4f4]">
      <Navbar isBordered maxWidth="xl" className="bg-[#2d2e2e] border-[#4a4b4b]">
        <NavbarBrand>
          <RouterLink to="/" className="flex items-center">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center mr-2">
              <span className="text-black font-bold">DS</span>
            </div>
            <p className="font-bold text-inherit">Admin Panel</p>
          </RouterLink>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive={isActive("/admin/dashboard")}>
            <Link as={RouterLink} to="/admin/dashboard" color={isActive("/admin/dashboard") ? "primary" : "foreground"}>
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem isActive={isActive("/admin/products")}>
            <Link as={RouterLink} to="/admin/products" color={isActive("/admin/products") ? "primary" : "foreground"}>
              Productos
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <Dropdown>
            <DropdownTrigger>
              <Button 
                variant="light" 
                className="flex items-center gap-2"
              >
                <Icon icon="lucide:user" />
                <span>{user?.username}</span>
                <Icon icon="lucide:chevron-down" className="text-sm" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions">
              <DropdownItem key="profile" textValue="Perfil">
                Perfil
              </DropdownItem>
              <DropdownItem key="settings" textValue="Configuración">
                Configuración
              </DropdownItem>
              <DropdownItem 
                key="logout" 
                textValue="Cerrar Sesión"
                color="danger"
                onPress={logout}
              >
                Cerrar Sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavbarItem>
            <Button 
              as={RouterLink} 
              to="/" 
              variant="flat" 
              color="primary"
              startContent={<Icon icon="lucide:external-link" />}
            >
              Ver Tienda
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">{title}</h1>
          {location.pathname === "/admin/products" && (
            <Button 
              as={RouterLink} 
              to="/admin/products/add" 
              color="primary"
              startContent={<Icon icon="lucide:plus" />}
            >
              Agregar Producto
            </Button>
          )}
        </div>
        {children}
      </div>

      <footer className="bg-[#2d2e2e] py-4 text-center text-sm text-[#a0a0a0]">
        <p>&copy; {new Date().getFullYear()} Distribuidora Sur - Panel de Administración</p>
      </footer>
    </div>
  );
};

export default AdminLayout;