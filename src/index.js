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
      <AuthProvider>
        <OrderProvider>
          <CartProvider>
            <WishlistProvider>
              <FilterProvider>
                <App />
              </FilterProvider>
            </WishlistProvider>
          </CartProvider>
        </OrderProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
