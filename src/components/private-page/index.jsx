import React, { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import PrivateContextProvider from "./private-context";
import PrivateHeader from "./private-header";
import { AuthContext } from "../../contexts/AuthContext.jsx";

export default function PrivatePage() {
  const { token: stateToken, code, isRole } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, stateToken, token, location.pathname]);

  return (
    <PrivateContextProvider>
      <PrivateHeader />
      <div className="mx-auto max-w-7xl px-4">
        <Outlet />
      </div>
    </PrivateContextProvider>
  );
}
