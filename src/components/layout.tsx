import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import CartDrawer from "./cart-drawer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <CartDrawer />
      <Footer />
    </div>
  );
};

export default Layout;