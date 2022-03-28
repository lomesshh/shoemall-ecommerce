import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { Notify } from "../components/pages/Toast";

import { useAuth } from "./authcontext";

const CartContext = createContext();

const initialValue = {
  cart: [],
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...action.payload], loading: false };
    case "INCREMENT_QTY":
      return { ...state, cart: [...action.payload], loading: false };
    case "DECREMENT_QTY":
      return { ...state, cart: [...action.payload], loading: false };
    case "API_REQUEST":
      return { ...state, loading: true };
    case "ERROR_HANDLE":
      return { ...state, loading: false };
    case "EMPTY_CART":
      return { ...state, cart: [...action.payload], loading: false };
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [cartstate, cartdispatch] = useReducer(reducer, initialValue);
  const [coupon, setCoupon] = useState("");
  const [couponAmt, setCouponAmt] = useState(0);
  const { localToken } = useAuth();

  const applyCoupon = () => {
    if (coupon === "SHOEMALL200") {
      setCouponAmt(200);
      Notify("Yayyy, Coupon code applied", "success");
    } else if (coupon === "NEOGCAMP") {
      setCouponAmt(300);
      Notify("Yayyy, Coupon code applied", "success");
    } else {
      Notify("Invalid or Expired coupon code", "warning");
      setCouponAmt(0);
    }
  };

  //total cart amount
  const totalAmount = cartstate.cart.reduce(
    (acc, curr) => acc + curr.price * curr.qty,
    0
  );

  //total discount amount
  const discountAmount = cartstate.cart.reduce(
    (acc, curr) => acc + 150 * curr.qty,
    0
  );

  //delivery amount
  const delivery = totalAmount === 0 ? 0 : 299;

  //final amount
  const finalAmount = totalAmount - discountAmount + delivery - couponAmt;

  const getCartData = async () => {
    cartdispatch({ type: "API_REQUEST" });
    try {
      const response = await axios.get("/api/user/cart", {
        headers: { authorization: localToken },
      });
      cartdispatch({
        type: "ADD_TO_CART",
        payload: response.data.cart,
        loading: false,
      });
    } catch (error) {
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
            headers: { authorization: localToken },
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
          headers: { authorization: localToken },
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

  const incrementQty = async (item) => {
    try {
      const res = await axios.post(
        `/api/user/cart/${item._id}`,
        {
          action: { type: "increment" },
        },
        {
          headers: { authorization: localToken },
        }
      );
      cartdispatch({ type: "INCREMENT_QTY", payload: res.data.cart });
    } catch (error) {
      console.log(error);
    }
  };

  const decrementQty = async (item) => {
    try {
      const res = await axios.post(
        `/api/user/cart/${item._id}`,
        {
          action: { type: "decrement" },
        },
        {
          headers: { authorization: localToken },
        }
      );
      cartdispatch({ type: "DECREMENT_QTY", payload: res.data.cart });
    } catch (error) {
      console.log(error);
    }
  };

  // const clearAllCart = async () => {
  //   try {
  //     const res = await axios.post("/user/cart/all", {
  //       headers: { authorization: localToken },
  //     });
  //     console.log(res);
  //     cartdispatch({ type: "EMPTY_CART", payload: res.data.cart });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
          incrementQty,
          decrementQty,
          coupon,
          setCoupon,
          applyCoupon,
          couponAmt,
        }}
      >
        {children}
      </CartContext.Provider>
    </div>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
