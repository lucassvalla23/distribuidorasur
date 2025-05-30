import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@heroui/react";
import { Icon } from "@iconify/react";
import { contactInfo } from "../data/contact-info";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#383939] py-8 mt-12 border-t border-[#4a4b4b]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#f4f4f4]">Distribuidora Sur</h3>
            <p className="text-sm mb-4 text-[#f4f4f4]">
              Tu distribuidora de confianza para golosinas, productos de almacén y limpieza.
            </p>
            <div className="flex space-x-4">
              {contactInfo.instagram && (
                <a href={`https://instagram.com/${contactInfo.instagram}`} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-400">
                  <Icon icon="logos:instagram-icon" className="text-2xl" />
                </a>
              )}
              {contactInfo.facebook && (
                <a href={`https://facebook.com/${contactInfo.facebook}`} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-400">
                  <Icon icon="logos:facebook" className="text-2xl" />
                </a>
              )}
              <a href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-400">
                <Icon icon="logos:whatsapp-icon" className="text-2xl" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#f4f4f4]">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link as={RouterLink} to="/" color="primary" className="text-sm">
                  Inicio
                </Link>
              </li>
              <li>
                <Link as={RouterLink} to="/como-comprar" color="primary" className="text-sm">
                  Cómo Comprar
                </Link>
              </li>
              <li>
                <Link as={RouterLink} to="/contacto" color="primary" className="text-sm">
                  Contacto
                </Link>
              </li>
              <li>
                <Link as={RouterLink} to="/admin/login" color="primary" className="text-sm">
                  Acceso Administrador
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#f4f4f4]">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm">
                <Icon icon="lucide:map-pin" className="text-primary-500" />
                <span className="text-[#f4f4f4]">{contactInfo.address}</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Icon icon="lucide:phone" className="text-primary-500" />
                <span className="text-[#f4f4f4]">{contactInfo.phone}</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Icon icon="lucide:mail" className="text-primary-500" />
                <span className="text-[#f4f4f4]">{contactInfo.email}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#4a4b4b] mt-8 pt-6 text-center text-sm text-[#f4f4f4]">
          <p>&copy; {new Date().getFullYear()} Distribuidora Sur. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;