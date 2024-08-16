import React from "react";
import { Outlet } from "react-router-dom";
import ScheduleContextProvider from "./schedule-context";

export default function Schedule() {
  return (
    <ScheduleContextProvider>
      <Outlet />
    </ScheduleContextProvider>
  );
}
