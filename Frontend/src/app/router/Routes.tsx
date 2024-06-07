import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../../features/pages/Dashboard";
import Incidents from "../../features/pages/Incidents";
import Log from "../layout/Log";
import CreateLogPage from "../../features/pages/CreateLogPage";
import UpdateLogPage from "../../features/pages/UpdateLogPage";
import LogPage from "../../features/pages/LogPage";
import Login from "../../features/pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Users from "../../features/pages/Users";
import AllUsers from "../../features/pages/AllUsers";
import CreateUser from "../../features/pages/CreateUser";
import Admin from "../../features/pages/Admin";
import Unauthorized from "../../features/pages/Unauthorized";

export const routes: RouteObject[] = [
  { path: "login", element: <Login /> },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/", element: <Navigate to="/dashboard" /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "incidents", element: <Incidents /> },
          {
            path: "log",
            element: <Log />,
            children: [
              { path: "create", element: <CreateLogPage /> },
              { path: ":id", element: <LogPage /> },
              { path: ":id/update", element: <UpdateLogPage /> },
            ],
          },
          {
            path: "admin",
            element: <Admin />,
            children: [
              {
                path: "users",
                element: <Users />,
                children: [
                  { path: "", element: <AllUsers /> },
                  { path: "create", element: <CreateUser /> },
                ],
              },
            ],
          },
          {
            path: "unauthorized",
            element: <Unauthorized />,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
