// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import "./index.css";
import { UserProvider } from "./context/UserContext";
import { LoadingProvider } from "./context/LoadingContext";
import { ToastProvider } from "./context/ToastContext";
import { BasketProvider } from "./context/BasketContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <LoadingProvider>
          <ToastProvider>
            <BasketProvider>
              <RouterProvider router={router} />
            </BasketProvider>
          </ToastProvider>
        </LoadingProvider>
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
