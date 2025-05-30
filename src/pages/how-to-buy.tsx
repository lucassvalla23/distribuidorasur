import React from "react";
import { Card, CardBody, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";

const HowToBuyPage: React.FC = () => {
  const steps = [
    {
      title: "Explora nuestros productos",
      description: "Navega por las diferentes categorías y subcategorías para encontrar los productos que necesitas.",
      icon: "lucide:search",
      color: "bg-primary-100 text-primary-500"
    },
    {
      title: "Selecciona tus productos",
      description: "Haz clic en el producto que te interesa para ver más detalles. Puedes elegir entre unidades o cajas completas según tu necesidad.",
      icon: "lucide:mouse-pointer-click",
      color: "bg-primary-100 text-primary-500"
    },
    {
      title: "Agrega al carrito",
      description: "Añade los productos a tu carrito de compras. Puedes ajustar las cantidades en cualquier momento.",
      icon: "lucide:shopping-cart",
      color: "bg-primary-100 text-primary-500"
    },
    {
      title: "Revisa tu pedido",
      description: "Verifica los productos seleccionados, cantidades y precios en tu carrito antes de continuar.",
      icon: "lucide:clipboard-check",
      color: "bg-primary-100 text-primary-500"
    },
    {
      title: "Completa tus datos",
      description: "Ingresa tu nombre, teléfono y dirección (opcional) para que podamos procesar tu pedido.",
      icon: "lucide:user",
      color: "bg-primary-100 text-primary-500"
    },
    {
      title: "Envía tu pedido",
      description: "Confirma tu pedido haciendo clic en 'Realizar Pedido'. Recibirás una confirmación y nos pondremos en contacto contigo a la brevedad.",
      icon: "lucide:send",
      color: "bg-primary-100 text-primary-500"
    }
  ];

  const faqs = [
    {
      question: "¿Cuál es el pedido mínimo?",
      answer: "No tenemos un monto mínimo de compra, pero recomendamos realizar pedidos superiores a $10,000 para aprovechar mejor los costos de envío."
    },
    {
      question: "¿Realizan envíos?",
      answer: "Sí, realizamos envíos en toda la zona. El costo varía según la distancia y el volumen del pedido. Para pedidos superiores a $30,000, el envío es gratuito dentro de la zona céntrica."
    },
    {
      question: "¿Cuánto tiempo tarda en llegar mi pedido?",
      answer: "Los pedidos suelen entregarse en un plazo de 24 a 48 horas hábiles, dependiendo de la zona de entrega y la disponibilidad de stock."
    },
    {
      question: "¿Qué métodos de pago aceptan?",
      answer: "Aceptamos efectivo, transferencia bancaria, Mercado Pago y tarjetas de débito/crédito (con recargo según la tarjeta)."
    },
    {
      question: "¿Puedo modificar mi pedido una vez realizado?",
      answer: "Sí, puedes modificar tu pedido contactándonos por teléfono o WhatsApp antes de que sea procesado para envío."
    },
    {
      question: "¿Ofrecen descuentos por cantidad?",
      answer: "Sí, ofrecemos descuentos especiales para compras mayoristas. Consulta con nuestro equipo de ventas para más información."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Cómo Comprar</h1>
        
        <Card className="mb-10">
          <CardBody className="p-6">
            <h2 className="text-xl font-semibold mb-6">Proceso de Compra</h2>
            
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className={`${step.color} p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0`}>
                    <Icon icon={step.icon} className="text-red-700 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">
                      {index + 1}. {step.title}
                    </h3>
                    <p className="text-default-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
        
        <Card className="mb-10">
          <CardBody className="p-6">
            <h2 className="text-xl font-semibold mb-6">Preguntas Frecuentes</h2>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                  <p className="text-default-500">{faq.answer}</p>
                  {index < faqs.length - 1 && <Divider className="mt-4" />}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <h2 className="text-xl font-semibold mb-4">¿Necesitas ayuda?</h2>
            <p className="mb-4">
              Si tienes alguna duda o consulta sobre el proceso de compra, no dudes en contactarnos:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-secondary-100 p-2 rounded-full">
                  <Icon icon="lucide:phone" className="text-secondary-500" />
                </div>
                <div>
                  <p className="text-sm text-default-500">Teléfono</p>
                  <p className="font-medium">+54 11 1234-5678</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-secondary-100 p-2 rounded-full">
                  <Icon icon="logos:whatsapp-icon" className="text-lg" />
                </div>
                <div>
                  <p className="text-sm text-default-500">WhatsApp</p>
                  <p className="font-medium">+54 9 11 1234-5678</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-secondary-100 p-2 rounded-full">
                  <Icon icon="lucide:mail" className="text-secondary-500" />
                </div>
                <div>
                  <p className="text-sm text-default-500">Email</p>
                  <p className="font-medium">contacto@distribuidorasur.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-secondary-100 p-2 rounded-full">
                  <Icon icon="lucide:clock" className="text-secondary-500" />
                </div>
                <div>
                  <p className="text-sm text-default-500">Horario de Atención</p>
                  <p className="font-medium">Lun-Vie: 8:00-18:00, Sáb: 9:00-13:00</p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default HowToBuyPage;