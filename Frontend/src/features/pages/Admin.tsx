import { useEffect, useState } from "react";
import useUser from "../../app/hooks/useUser";
import { User } from "../../app/models/auth";
import { Navigate, Outlet } from "react-router-dom";

const Admin = () => {
  const { getUser, isLoading } = useUser();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser();
      console.log(data);
      setCurrentUser(data);
    };
    fetchUser();
  }, []);

  return (
    <>
      {currentUser !== null &&
        (currentUser.role !== "Admin" ? (
          <Navigate to="/unauthorized" />
        ) : (
          <Outlet />
        ))}
    </>
  );
};

export default Admin;
