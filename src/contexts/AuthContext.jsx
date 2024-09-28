import React, { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { createContext, useState } from "react";
import { isEmpty } from "lodash";
import {getUser} from "../auth/auth_helper.js";

export const userRoles = {
  VENDOR: "vendor",
  ADMIN: "admin",
  CUSTOMERLEGALENTITY: "customerLegalEntity",
  CUSTOMERCOMPANY: "customerCompany",
  CUSTOMEREMPLOYEE: "customerEmployee",
};

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [authCompanyCode, setAuthCompanyCode] = useState(null);
  const [code, setCode] = useState("");


  getUser()
      .then((data) => {
        if (data.profile.email !== user?.email) setUser(data.profile);
        if (data.access_token) {
          localStorage.setItem("token", JSON.stringify(data.access_token));
        }
      })
      .catch((error) => {
        console.log({ success: false, error: error.message });
      })
      .finally(() => {});

  const logout = () => {
    localStorage.removeItem("centralizedCompanyCode");
    localStorage.removeItem("user");
    localStorage.removeItem("companyId");
    setUser("");
  };

  const {
    data: company,
    refetch: refetchCentralizedCompany,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["companyCode"],
    queryFn: () => {},
    enabled: !!code,
  });

  const login = (loginDetail) => {
    // window.open('/oauth2/authorization/keycloak', '_self')
    setAuthCompanyCode(loginDetail);
    setCode(loginDetail?.companyCode);
  };

  useEffect(() => {
    if (code) refetchCentralizedCompany();
  }, [code]);

  useEffect(() => {
    if (!isEmpty(company) && company?.status !== 404) {
      setUser(authCompanyCode);
      localStorage.setItem("user", JSON.stringify(authCompanyCode));
      //TODO handle scenario where we switch the company, update the company at that point
      localStorage.setItem("companyId", JSON.stringify(company.companyID));
    }
    // setCode("")
  }, [company, isLoading]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const isRole = (role) => {
    return role === user?.role;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        login,
        isRole,
        setUser,
        isLoading,
        isError,
        company,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
