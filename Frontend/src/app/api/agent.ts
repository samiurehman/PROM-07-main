import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import {
  User,
  UserLoginValues,
  UserRegisterValues,
  userLoginResponse,
} from "../models/user";
import { Incident, Log } from "../models/incident";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    if (import.meta.env.dev) await sleep(5000);
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config, headers } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (
          config.method === "get" &&
          Object.prototype.hasOwnProperty.call(data.errors, "id")
        ) {
          //router.navigate("/not-found");
        }
        if (data.errors) {
          const moduleStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) moduleStateErrors.push(data.errors[key]);
          }
          throw moduleStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        if (
          status === 401 &&
          headers["www-authenticate"]?.startsWith('Bearer error="invalid_token')
        ) {
          localStorage.removeItem("jwt");
          toast.error("Session expired - Please login again");
          router.navigate("/login");
        } else {
          toast.error("Unauthorized");
        }

        break;
      case 403:
        toast.error("Forbidden");
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        router.navigate("/server-error");
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: object) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: object) =>
    axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Account = {
  login: (user: UserLoginValues) =>
    requests.post<userLoginResponse>("/users/login", user),
  register: (user: UserRegisterValues) =>
    requests.post<{ status: string }>("/users/signup", user),
};

const Incidents = {
  list: () => requests.get<Incident[]>("/incidents"),
  create: (incident: Incident) =>
    requests.post<{ status: string; data: Incident }>("/incidents", incident),
  get: (id: string) => requests.get<Incident>(`/incidents/${id}`),
  switch: (id: string, data: string) =>
    requests.post<Incident>(`/incidents/switch/${id}`, { officerEmail: data }),
  close: (id: string) => requests.post<Incident>(`/incidents/close/${id}`, {}),
};

const Log = {
  add: (log: Log, id: string) =>
    requests.post<Log>(`/incidents/log/${id}`, log),
};

const Users = {
  list: () => requests.get<User[]>("/users/getAllUsers"),
  getUser: () => requests.get<User>("/users/getUser"),
};

const agent = { Account, Incidents, Log, Users };

export default agent;
