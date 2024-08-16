import React from "react";
import { Outlet } from "react-router-dom";
import DashboardContextProvider from "./dashboard-context";

export default function Dashboard() {
  return (
    <DashboardContextProvider>
      <Outlet />
    </DashboardContextProvider>
  );
}
