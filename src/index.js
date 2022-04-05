import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { makeServer } from "./server";
import {
  AuthProvider,
  FilterProvider,
  WishlistProvider,
  CartProvider,
  OrderProvider,
} from "frontend/context";

makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <OrderProvider>
              <FilterProvider>
                <App />
              </FilterProvider>
            </OrderProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
