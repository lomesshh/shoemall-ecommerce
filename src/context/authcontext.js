import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./cartcontext";
import { useWishlist } from "./wishlistcontext";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { cartdispatch } = useCart();
  const { dispatch } = useWishlist();

  const userdata = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [localToken, setLocalToken] = useState(() => {
    if (token) {
      return token;
    } else {
      return "";
    }
  });

  const [localUser, setLocalUser] = useState(() => {
    if (userdata) {
      return userdata;
    } else {
      return {};
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLocalToken("");
    setLocalUser({});
    cartdispatch({ type: "EMPTY_CART" });
    dispatch({ type: "EMPTY_WISHLIST" });
    navigate("/");
  };

  return (
    <div>
      <AuthContext.Provider
        value={{
          userdata,
          token,
          localToken,
          setLocalToken,
          localUser,
          setLocalUser,
          handleLogout,
        }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
