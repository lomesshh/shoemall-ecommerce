import React from "react";
import { Routes, Route } from "react-router-dom";
import { Homepage, Pathnotfound } from "frontend/components";
import {
  ProductList,
  Cart,
  Checkout,
  Wishlist,
  SingleProduct,
  Profile,
  Login,
  Signup,
  Profileinfo,
  Address,
  Orders,
} from "frontend/pages";
import Mockman from "mockman-js";

const RoutesList = () => {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/productslist" element={<ProductList />} />
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

export { RoutesList };
