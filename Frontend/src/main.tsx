import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "./app/layout/index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/Routes.tsx";
import { AuthContextProvider } from "./app/context/AuthContext.tsx";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <RouterProvider router={router}></RouterProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
