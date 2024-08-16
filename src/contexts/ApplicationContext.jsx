import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContext, userRoles } from "./AuthContext";

export const ApplicationContext = createContext();

export const ApplicationContextProvider = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState({open: false, context: ''});
  const [pageTitle, setPageTitle] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { isRole, user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      if (isRole(userRoles.CUSTOMEREMPLOYEE)) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    }
  }, [user]);

  const setIsAlertOpen = (open, context='appContext') => setAlertOpen({open, context})
const {open: isAlertOpen, context:alertContext} = alertOpen
  return (
    <ApplicationContext.Provider
      value={{
        isDrawerOpen,
        setIsDrawerOpen,
        isModalOpen,
        setIsModalOpen,
        pageTitle,
        setPageTitle,
        sidebarOpen,
        setSidebarOpen,
        isAlertOpen,
        alertContext,
        setIsAlertOpen,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;

export const useApplicationContext = () => useContext(ApplicationContext);
