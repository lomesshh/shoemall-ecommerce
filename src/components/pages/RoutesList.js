import React from "react";

import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Pathnotfound from "./Pathnotfound";
import ProductsList from "../product/ProductsList";
import Cart from "../product/cart";
import Checkout from "../product/checkout";
import Wishlist from "../product/wishlist";
import SingleProduct from "../product/singleproduct";
import Profile from "../auth/Profile";
import Mockman from "mockman-js";
import Login from "../auth/login";
import Signup from "../auth/signup";
import Profileinfo from "../auth/Profileinfo";
import Address from "../product/Address";
import Orders from "../product/Orders";

const RoutesList = () => {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/productslist" element={<ProductsList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/product/:productId" element={<SingleProduct />} />
        <Route path="/profile" element={<Profile />}>
          <Route path="orders" element={<Orders />} />
          <Route path="address" element={<Address />} />
          <Route path="info" element={<Profileinfo />} />
        </Route>
        <Route path="/mock" element={<Mockman />} />
        <Route path="*" element={<Pathnotfound />} />
      </Routes>
    </div>
  );
};

export default RoutesList;
