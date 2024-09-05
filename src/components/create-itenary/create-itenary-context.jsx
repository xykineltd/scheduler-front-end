import React, { createContext, useContext } from "react";

const CreateItenaryContext = createContext();

export default function CreateItenaryContextProvider({ children }) {
  return (
    <CreateItenaryContext.Provider value={{}}>
      {children}
    </CreateItenaryContext.Provider>
  );
}

export const useCreateItenaryContext = () => useContext(CreateItenaryContext);
