import React, { createContext, useContext } from "react";

const PrivateContext = createContext(null);

function PrivateContextProvider({ children }) {
  return (
    <PrivateContext.Provider value={{}}>{children}</PrivateContext.Provider>
  );
}

export default PrivateContextProvider;
export const usePrivateContext = () => useContext(PrivateContext);
