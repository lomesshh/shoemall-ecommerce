import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { makeServer } from "./server";
import { FilterProvider } from "./context/filtercontext";
import { WishlistProvider } from "./context/wishlistcontext";
import { CartProvider } from "./context/cartcontext";
import { AuthProvider } from "./context/authcontext";
import { OrderProvider } from "./context/ordercontext";

makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <AuthProvider>
            <OrderProvider>
              <FilterProvider>
                <App />
              </FilterProvider>
            </OrderProvider>
          </AuthProvider>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
