import React from "react";
import { Outlet } from "react-router-dom";
import CalendarContextProvider, {useCalendarContext} from "./calendar-context";

export default function Calendar() {
  return (
    <CalendarContextProvider>
      <Outlet />
    </CalendarContextProvider>
  );
}

