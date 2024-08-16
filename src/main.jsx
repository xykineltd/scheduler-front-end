import * as React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./contexts/AuthContext";
import ApplicationContextProvider from "./contexts/ApplicationContext";

const queryClient = new QueryClient();
const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ApplicationContextProvider>
          <App />
        </ApplicationContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
