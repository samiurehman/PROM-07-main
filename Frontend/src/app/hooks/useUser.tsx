import React, { useState } from "react";
import agent from "../api/agent";
import { toast } from "react-toastify";

const useUser = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);

  const getUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await agent.Users.list();
      setIsLoading(false);
      return response.data;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      throw error;
    }
  };

  const getUser = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await agent.Users.getUser();
      setIsLoading(false);
      return response.data;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      throw error;
    }
  };

  return { getUsers, getUser, error, isLoading };
};

export default useUser;
