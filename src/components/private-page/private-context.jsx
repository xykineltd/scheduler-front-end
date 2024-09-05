import React, { createContext, useContext } from "react";

const PrivateContext = createContext(null);

function PrivateContextProvider({ children }) {
  // TODO
  // NOTE it is better to get all itenary here
  // All the parts of the application will need it.
  // getSchedule by userID

  return (
    <PrivateContext.Provider value={{}}>{children}</PrivateContext.Provider>
  );
}

export default PrivateContextProvider;
export const usePrivateContext = () => useContext(PrivateContext);
