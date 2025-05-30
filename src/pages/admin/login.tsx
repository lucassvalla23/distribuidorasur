import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Card, CardBody, Input, Button, Image } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useAuth } from "../../contexts/auth-context";
import { addToast } from "@heroui/react";

const AdminLoginPage: React.FC = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  
  const { login } = useAuth();
  const history = useHistory();
  const location = useLocation<{ from: { pathname: string } }>();
  
  const from = location.state?.from?.pathname || "/admin/dashboard";
  
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      addToast({
        title: "Error",
        description: "Por favor ingrese usuario y contraseña",
        color: "warning"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(username, password);
      
      if (success) {
        addToast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido al panel de administración",
          color: "success"
        });
        history.replace(from);
      } else {
        addToast({
          title: "Error de autenticación",
          description: "Usuario o contraseña incorrectos",
          color: "danger"
        });
      }
    } catch (error) {
      addToast({
        title: "Error",
        description: "Ocurrió un error al intentar iniciar sesión",
        color: "danger"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#383939] p-4">
      <Card className="w-full max-w-md bg-[#2d2e2e] text-[#f4f4f4]">
        <CardBody className="p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-black font-bold text-2xl">DS</span>
            </div>
            <h1 className="text-2xl font-bold">Panel de Administración</h1>
            <p className="text-default-500 text-center mt-2">
              Ingrese sus credenciales para acceder al panel
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Usuario"
              placeholder="Ingrese su nombre de usuario"
              value={username}
              onValueChange={setUsername}
              variant="bordered"
              color="primary"
              startContent={<Icon icon="lucide:user" className="text-default-400" />}
              className="bg-[#383939] text-[#f4f4f4]"
              isRequired
            />
            
            <Input
              label="Contraseña"
              placeholder="Ingrese su contraseña"
              value={password}
              onValueChange={setPassword}
              type={isPasswordVisible ? "text" : "password"}
              variant="bordered"
              color="primary"
              className="bg-[#383939] text-[#f4f4f4]"
              startContent={<Icon icon="lucide:lock" className="text-default-400" />}
              endContent={
                <button type="button" onClick={togglePasswordVisibility}>
                  <Icon 
                    icon={isPasswordVisible ? "lucide:eye-off" : "lucide:eye"} 
                    className="text-default-400 cursor-pointer"
                  />
                </button>
              }
              isRequired
            />
            
            <Button
              type="submit"
              color="primary"
              className="w-full"
              isLoading={isLoading}
            >
              Iniciar Sesión
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <Button
              as="a"
              href="/"
              variant="light"
              color="primary"
              startContent={<Icon icon="lucide:arrow-left" />}
            >
              Volver a la tienda
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AdminLoginPage;