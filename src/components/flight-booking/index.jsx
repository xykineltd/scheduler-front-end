import React from "react";
import { Outlet } from "react-router-dom";
import FlightBookingContextProvider from "./flight-booking-context";

export default function FlightBooking() {
  return (
    <FlightBookingContextProvider>
      <Outlet />
    </FlightBookingContextProvider>
  );
}
