import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import PublicHeader from "./public-header";

export default function PublicPage() {
  return (
    <div>
      <PublicHeader />
      <Outlet />
    </div>
  );
}
