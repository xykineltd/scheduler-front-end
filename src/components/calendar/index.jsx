import React from "react";
import { Outlet } from "react-router-dom";
import CalendarContextProvider from "./calendar-context";

export default function Calendar() {
  return (
    <CalendarContextProvider>
      <Outlet />
    </CalendarContextProvider>
  );
}

