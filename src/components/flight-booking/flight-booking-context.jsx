import React, { createContext, useContext } from "react";

const FlightBookingContext = createContext(null);

function FlightBookingContextProvider({ children }) {
  return (
    <FlightBookingContext.Provider value={{}}>
      {children}
    </FlightBookingContext.Provider>
  );
}

export default FlightBookingContextProvider;
export const useFlightBookingContext = () => useContext(FlightBookingContext);
