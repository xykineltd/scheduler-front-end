import React from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import PublicHeader from "./public-header";

export default function PublicPage() {
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();

    // const token = localStorage.getItem("token");
    // if (token) {
    //     navigate("/dashboard");
    // }
  return (
    <div>
      <PublicHeader />
      <Outlet />
    </div>
  );
}
