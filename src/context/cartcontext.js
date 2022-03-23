import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { Notify } from "../components/pages/Toast";

const CartContext = createContext();

const token = localStorage.getItem("token");

const initialValue = {
  cart: [],
  loading: false,
};

const incrementQty = (state, item) => {
  const tempArr = JSON.parse(JSON.stringify(state));
  const findItem = tempArr.cart.find((prod) => prod._id === item._id);

  tempArr.cart[tempArr.cart.indexOf(findItem)].quantity++;
  return tempArr;
};

const decrementQty = (state, item) => {
  const tempArr = JSON.parse(JSON.stringify(state));
  const findItem = tempArr.cart.find((prod) => prod._id === item._id);

  tempArr.cart[tempArr.cart.indexOf(findItem)].quantity--;
  return tempArr;
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...action.payload], loading: false };
    case "INCREMENT_QTY":
      return incrementQty(state, action.payload);
    case "DECREMENT_QTY":
      return decrementQty(state, action.payload);
    case "API_REQUEST":
      return { ...state, loading: true };
    case "ERROR_HANDLE":
      return { ...state, loading: false };
    case "EMPTY_CART":
      return { ...state, cart: [] };
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [cartstate, cartdispatch] = useReducer(reducer, initialValue);

  //total cart amount
  const totalAmount = cartstate.cart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  //total discount amount
  const discountAmount = cartstate.cart.reduce(
    (acc, curr) => acc + 150 * curr.quantity,
    0
  );

  //delivery amount
  const delivery = totalAmount === 0 ? 0 : 299;

  //final amount
  const finalAmount = totalAmount - discountAmount + delivery;

  const getCartData = async () => {
    console.log("getdata called");
    cartdispatch({ type: "API_REQUEST" });
    try {
      const response = await axios.get("/api/user/cart", {
        headers: { authorization: token },
      });
      cartdispatch({
        type: "ADD_TO_CART",
        payload: response.data.cart,
        loading: false,
      });
      console.log("cartData", response.data.cart);
    } catch (error) {
      console.log(error);
      cartdispatch({ type: "ERROR_HANDLE" });
    }
  };

  const addToCart = async (item) => {
    cartdispatch({ type: "API_REQUEST" });
    const findIndex = cartstate.cart.findIndex((prod) => prod._id === item._id);
    if (findIndex === -1) {
      try {
        const response = await axios.post(
          "/api/user/cart",
          { product: { ...item } },
          {
            headers: { authorization: token },
          }
        );
        cartdispatch({ type: "ADD_TO_CART", payload: response.data.cart });
        Notify("Added to cart", "info");
      } catch (error) {
        console.log(error);
        cartdispatch({ type: "ERROR_HANDLE" });
        Notify("Unable to add product in cart, try again later !", "error");
      }
    } else {
      try {
        const response = await axios.delete(`/api/user/cart/${item._id}`, {
          headers: { authorization: token },
        });
        cartdispatch({ type: "ADD_TO_CART", payload: response.data.cart });
        Notify("Removed from cart", "info");
      } catch (error) {
        console.log(error);
        cartdispatch({ type: "ERROR_HANDLE" });
        Notify(
          "Unable to removed product from cart, try again later !",
          "error"
        );
      }
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  return (
    <div>
      <CartContext.Provider
        value={{
          cartstate,
          cartdispatch,
          totalAmount,
          discountAmount,
          finalAmount,
          addToCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </div>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
