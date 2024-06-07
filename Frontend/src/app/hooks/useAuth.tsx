import { useState } from "react";
import useAuthContext from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import agent from "../api/agent";
import { UserLoginValues, UserRegisterValues } from "../models/user";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async ({ email, password }: UserLoginValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await agent.Account.login({ email, password });
      console.log(response);
      setIsLoading(false);
      localStorage.setItem("jwt", response.data.token);
      dispatch({ type: "LOGIN", payload: response.data });
      navigate("/dashboard");
    } catch (error) {
      const loginError = error as AxiosError;
      const response = loginError.response as AxiosResponse;
      setError(response.data.message);
      setIsLoading(false);
      throw error;
    }
  };

  const register = async (values: UserRegisterValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await agent.Account.register(values);
      setIsLoading(false);
      toast.success("User registered successfully");
      navigate("/admin/users");
    } catch (error) {
      console.log(error);
      setError("Error occured");
      setIsLoading(false);
      throw error;
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUTUSER", payload: null });
    navigate("/login");
  };

  return {
    login,
    error,
    isLoading,
    register,
    logout,
  };
};

export default useAuth;
