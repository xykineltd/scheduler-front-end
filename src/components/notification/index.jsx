import React from "react";
import { Outlet } from "react-router-dom";
import NotificationContextProvider from "./notification-context";

export default function Notification() {
  return (
    <NotificationContextProvider>
      <Outlet />
    </NotificationContextProvider>
  );
}
