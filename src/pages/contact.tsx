import React from "react";
import { Card, CardBody, Input, Textarea, Button, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { contactInfo } from "../data/contact-info";
import { addToast } from "@heroui/react";

const ContactPage: React.FC = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      addToast({
        title: "Error",
        description: "Por favor complete todos los campos requeridos",
        color: "warning"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      
      addToast({
        title: "Mensaje enviado",
        description: "Nos pondremos en contacto a la brevedad",
        color: "success"
      });
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Contacto</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardBody className="p-6">
              <h2 className="text-xl font-semibold mb-4">Información de Contacto</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary-100 p-2 rounded-full">
                    <Icon icon="lucide:map-pin" className="text-red-700 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium">Dirección</h3>
                    <p className="text-default-500">{contactInfo.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-primary-100 p-2 rounded-full">
                    <Icon icon="lucide:phone" className="text-red-700 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium">Teléfono</h3>
                    <p className="text-default-500">{contactInfo.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-primary-100 p-2 rounded-full">
                    <Icon icon="lucide:smartphone" className="text-red-700 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium">WhatsApp</h3>
                    <p className="text-default-500">{contactInfo.whatsapp}</p>
                    <a 
                      href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-secondary-500 text-sm flex items-center gap-1 mt-1 hover:underline"
                    >
                      <Icon icon="logos:whatsapp-icon" className="text-base" />
                      Enviar mensaje
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-primary-100 p-2 rounded-full">
                    <Icon icon="lucide:mail" className="text-red-700 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-default-500">{contactInfo.email}</p>
                  </div>
                </div>
              </div>
              
              <Divider className="my-6" />
              
              <h3 className="font-semibold mb-3">Horarios de Atención</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Lunes a Viernes</span>
                  <span>8:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábados</span>
                  <span>9:00 - 13:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingos y Feriados</span>
                  <span>Cerrado</span>
                </div>
              </div>
              
              {(contactInfo.instagram || contactInfo.facebook) && (
                <>
                  <Divider className="my-6" />
                  
                  <h3 className="font-semibold mb-3">Redes Sociales</h3>
                  <div className="flex gap-4">
                    {contactInfo.instagram && (
                      <a 
                        href={`https://instagram.com/${contactInfo.instagram}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-secondary-500 hover:text-secondary-600"
                      >
                        <Icon icon="logos:instagram-icon" className="text-2xl" />
                      </a>
                    )}
                    {contactInfo.facebook && (
                      <a 
                        href={`https://facebook.com/${contactInfo.facebook}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-secondary-500 hover:text-secondary-600"
                      >
                        <Icon icon="logos:facebook" className="text-2xl" />
                      </a>
                    )}
                  </div>
                </>
              )}
            </CardBody>
          </Card>
          
          <Card>
            <CardBody className="p-6">
              <h2 className="text-xl font-semibold mb-4">Envíanos un Mensaje</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Nombre"
                  placeholder="Ingrese su nombre"
                  value={name}
                  onValueChange={setName}
                  variant="bordered"
                  color="primary"
                  isRequired
                />
                
                <Input
                  label="Email"
                  placeholder="Ingrese su email"
                  value={email}
                  onValueChange={setEmail}
                  type="email"
                  variant="bordered"
                  color="primary"
                  isRequired
                />
                
                <Input
                  label="Teléfono (opcional)"
                  placeholder="Ingrese su teléfono"
                  value={phone}
                  onValueChange={setPhone}
                  variant="bordered"
                  color="primary"
                />
                
                <Textarea
                  label="Mensaje"
                  placeholder="Escriba su mensaje aquí"
                  value={message}
                  onValueChange={setMessage}
                  variant="bordered"
                  color="primary"
                  minRows={4}
                  isRequired
                />
                
                <Button
                  type="submit"
                  color="primary"
                  className="w-full"
                  isLoading={isSubmitting}
                >
                  Enviar Mensaje
                </Button>
              </form>
            </CardBody>
          </Card>
        </div>
        
        <div className="mt-8">
          <Card>
            <CardBody className="p-0">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.8861951882496!2d-58.38414532345364!3d-34.60373297295427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac630121623%3A0x53386f2ac88991a9!2sAv.%20Rivadavia%201234%2C%20C1033AAZ%20CABA!5e0!3m2!1ses-419!2sar!4v1696012345678!5m2!1ses-419!2sar" 
                width="100%" 
                height="400" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Distribuidora Sur"
              ></iframe>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;