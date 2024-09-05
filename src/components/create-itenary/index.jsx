import React from "react";
import { Outlet } from "react-router-dom";
import CreateItenaryContextProvider from "./create-itenary-context";

export default function CreateItenary() {
  return (
    <CreateItenaryContextProvider>
      <Outlet />
    </CreateItenaryContextProvider>
  );
}
