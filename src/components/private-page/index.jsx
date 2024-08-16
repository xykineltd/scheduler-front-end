import React from "react";
import { Outlet } from "react-router-dom";
import PrivateContextProvider from "./private-context";
import PrivateHeader from "./private-header";

export default function PrivatePage() {
  return (
    <PrivateContextProvider>
      <PrivateHeader />
      <Outlet />
    </PrivateContextProvider>
  );
}
