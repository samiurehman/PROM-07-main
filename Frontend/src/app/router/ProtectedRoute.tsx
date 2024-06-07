import useAuthContext from "../hooks/useAuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const {
    state: { isLoggedIn },
  } = useAuthContext();

  return <>{isLoggedIn ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default ProtectedRoute;
