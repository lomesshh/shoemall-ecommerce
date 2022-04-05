import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { Notify } from "frontend/components";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // dark mode
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const navigate = useNavigate();

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
    Notify("Logged Out Successfully", "warning");
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
          theme,
          switchTheme,
        }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
