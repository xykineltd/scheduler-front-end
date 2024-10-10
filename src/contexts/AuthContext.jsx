import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import { getUser } from "../auth/auth_helper.js";
import { useLocation, useNavigate } from "react-router-dom";

export const userRoles = {
  VENDOR: "vendor",
  ADMIN: "admin",
  CUSTOMERLEGALENTITY: "customerLegalEntity",
  CUSTOMERCOMPANY: "customerCompany",
  CUSTOMEREMPLOYEE: "customerEmployee",
};

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();
        if (data.profile.email !== user?.email) {
          setUser(data.profile);
          localStorage.setItem("user", JSON.stringify(data.profile));
        }
        if (data.access_token) {
          localStorage.setItem("token", data.access_token);
          setToken(data.access_token);
          if (location.pathname === "/dashboard") navigate("/dashboard");
        }
      } catch (error) {
        console.log({ success: false, error: error.message });
      }
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("centralizedCompanyCode");
    localStorage.removeItem("user");
    localStorage.removeItem("companyId");
    localStorage.removeItem("token");
    setUser(null);
    setToken("");
  };

  const isRole = (role) => {
    return role === user?.role;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        isRole,
        setUser,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
