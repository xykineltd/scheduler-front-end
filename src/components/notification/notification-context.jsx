import React, { createContext, useContext } from "react";

const NotificationContext = createContext(null);

function NotificationContextProvider({ children }) {
  return (
    <NotificationContext.Provider value={{}}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContextProvider;
export const useNotificationContext = () => useContext(NotificationContext);
