import React, {useContext} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import PrivateContextProvider from "./private-context";
import PrivateHeader from "./private-header";
import {AuthContext} from "../../contexts/AuthContext.jsx";

export default function PrivatePage() {
    const { user, code, isRole } = useContext(AuthContext);

    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    if (!token) {
        console.log("if-->", token)
        navigate("/");
    }

  return (
    <PrivateContextProvider>
      <PrivateHeader />
      <div className="mx-auto max-w-7xl px-4">
        <Outlet />
      </div>
    </PrivateContextProvider>
  );
}
