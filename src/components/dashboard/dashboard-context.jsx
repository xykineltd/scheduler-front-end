import React, { createContext, useContext } from "react";

const DashboardContext = createContext(null);

function DashboardContextProvider({ children }) {
  return (
    <DashboardContext.Provider value={{}}>{children}</DashboardContext.Provider>
  );
}

export default DashboardContextProvider;
export const useDashboardContext = () => useContext(DashboardContext);
