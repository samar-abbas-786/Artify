import React, { useState, useEffect } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [auth, setAuth] = useState(false);
  const [selected, setSelected] = useState("");
  // if (localStorage.getItem("user") != undefined) {
  //   setAuth(true);
  // }
  return (
    <AuthContext.Provider
      value={{ token, setToken, auth, selected, setSelected }}
    >
      {children}
    </AuthContext.Provider>
  );
};
