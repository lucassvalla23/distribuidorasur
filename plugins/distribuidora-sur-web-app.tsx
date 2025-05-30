import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { CartProvider } from "./contexts/cart-context";
import { AuthProvider } from "./contexts/auth-context";
import { ProductProvider } from "./contexts/product-context";

import Layout from "./components/layout";
import HomePage from "./pages/home";
import ContactPage from "./pages/contact";
import HowToBuyPage from "./pages/how-to-buy";
import AdminLoginPage from "./pages/admin/login";
import AdminDashboardPage from "./pages/admin/dashboard";
import AdminProductsPage from "./pages/admin/products";
import AdminAddProductPage from "./pages/admin/add-product";
import AdminEditProductPage from "./pages/admin/edit-product";
import ProtectedRoute from "./components/protected-route";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <Switch>
              <Route path="/admin/login" exact>
                <AdminLoginPage />
              </Route>
              <ProtectedRoute path="/admin/dashboard" exact>
                <AdminDashboardPage />
              </ProtectedRoute>
              <ProtectedRoute path="/admin/products" exact>
                <AdminProductsPage />
              </ProtectedRoute>
              <ProtectedRoute path="/admin/products/add" exact>
                <AdminAddProductPage />
              </ProtectedRoute>
              <ProtectedRoute path="/admin/products/edit/:id" exact>
                <AdminEditProductPage />
              </ProtectedRoute>
              <Route path="/" exact>
                <Layout>
                  <HomePage />
                </Layout>
              </Route>
              <Route path="/contacto" exact>
                <Layout>
                  <ContactPage />
                </Layout>
              </Route>
              <Route path="/como-comprar" exact>
                <Layout>
                  <HowToBuyPage />
                </Layout>
              </Route>
              <Redirect to="/" />
            </Switch>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;