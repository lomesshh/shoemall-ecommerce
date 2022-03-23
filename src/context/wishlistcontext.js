import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { Notify } from "../components/pages/Toast";

const WishlistContext = createContext();

const token = localStorage.getItem("token");

const initialValue = {
  wishlist: [],
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        wishlist: [...action.payload],
        loading: false,
      };
    case "API_REQUEST":
      return { ...state, loading: true };
    case "ERROR_HANDLE":
      return { ...state, loading: false };
    default:
      return state;
  }
};

const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  const getDataFromWishlist = async () => {
    dispatch({ type: "API_REQUEST" });
    try {
      const response = await axios.get("/api/user/wishlist", {
        headers: { authorization: token },
      });
      dispatch({
        type: "ADD_TO_WISHLIST",
        payload: response.data.wishlist,
        loading: false,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: "ERROR_HANDLE" });
    }
  };

  const addToWishlist = async (item) => {
    dispatch({ type: "API_REQUEST" });
    const currIndex = state.wishlist.findIndex((prod) => prod._id === item._id);
    if (currIndex === -1) {
      try {
        const response = await axios.post(
          "/api/user/wishlist",
          {
            product: { ...item },
          },
          {
            headers: { authorization: token },
          }
        );
        dispatch({ type: "ADD_TO_WISHLIST", payload: response.data.wishlist });
        Notify("Added to wishlist", "info");
      } catch (error) {
        console.log(error);
        dispatch({ type: "ERROR_HANDLE" });
        Notify("Unable to add product in wishlist, try again later !", "error");
      }
    } else {
      try {
        const response = await axios.delete(`/api/user/wishlist/${item._id}`, {
          headers: { authorization: token },
        });
        dispatch({ type: "ADD_TO_WISHLIST", payload: response.data.wishlist });
        Notify("Removed from wishlist", "info");
      } catch (error) {
        console.log(error);
        dispatch({ type: "ERROR_HANDLE" });
        Notify(
          "Unable to remove product from wishlist, try again later !",
          "error"
        );
      }
    }
  };

  useEffect(() => {
    getDataFromWishlist();
  }, []);

  return (
    <div>
      <WishlistContext.Provider value={{ state, dispatch, addToWishlist }}>
        {children}
      </WishlistContext.Provider>
    </div>
  );
};

const useWishlist = () => useContext(WishlistContext);

export { WishlistProvider, useWishlist };
