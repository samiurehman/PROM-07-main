import { useState } from "react";
import agent from "../api/agent";
import { Incident, Log } from "../models/incident";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useIncident = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const createIncident = async (incident: Incident) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await agent.Incidents.create(incident);
      toast.success("Incident created successfully");
      navigate(`/log/${response.data.id}/update`);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setError(e);
    }
  };

  const getIncidents = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await agent.Incidents.list();
      setIsLoading(false);
      return response.data;
    } catch (e) {
      setIsLoading(false);
      setError(e);
    }
  };

  const getIncident = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await agent.Incidents.get(id);
      setIsLoading(false);
      return response.data;
    } catch (e) {
      setIsLoading(false);
      setError(e);
    }
  };

  const addLog = async (log: Log, id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await agent.Log.add(log, id);
      setIsLoading(false);
      return response.data;
    } catch (e) {
      setIsLoading(false);
      setError(e);
    }
  };

  const switchOfficerOnScene = async (id: string, email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await agent.Incidents.switch(id, email);
      setIsLoading(false);

      return response.data;
    } catch (e) {
      setIsLoading(false);
      setError(e);
    }
  };

  const closeIncident = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await agent.Incidents.close(id);
      setIsLoading(false);

      return response.data;
    } catch (e) {
      setIsLoading(false);
      setError(e);
    }
  };

  return {
    createIncident,
    getIncident,
    getIncidents,
    addLog,
    switchOfficerOnScene,
    closeIncident,
    error,
    isLoading,
  };
};

export default useIncident;
