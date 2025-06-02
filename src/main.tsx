import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import "./index.css";
import { UserProvider } from "./context/UserContext";
import { LoadingProvider } from "./context/LoadingContext";
import { ToastProvider } from "./context/ToastContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <LoadingProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </LoadingProvider>
    </UserProvider>
  </React.StrictMode>
);
