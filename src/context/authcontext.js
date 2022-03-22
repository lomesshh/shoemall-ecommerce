import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const userdata = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [localToken, setLocalToken] = useState(token ?? "");

  const [localUser, setLocalUser] = useState(userdata ?? {});

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLocalToken("");
    setLocalUser({});
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
