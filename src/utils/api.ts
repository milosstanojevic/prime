import axios from "axios";
import { camelizeKeys } from "humps";

axios.interceptors.response.use(function (response) {
  const { data, ...rest } = response;
  return {
    ...rest,
    data: camelizeKeys(data),
  };
});

const API_ROOT = process.env.REACT_APP_API_URL || "";

const URI = process.env.REACT_APP_URI || "";

const ROOT_URL = `${URI}${API_ROOT}`;

const getHeaders = (headers?: Headers) => {
  const additional = headers || {};
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...additional,
  };
};

export const api = {
  get: <T>(url: string, params?: object) =>
    axios.get<T>(`${ROOT_URL}${url}`, {
      headers: getHeaders(),
      ...params,
    }),
  post: <T>(url: string, data: any) =>
    axios.post<T>(`${ROOT_URL}${url}`, data, {
      headers: getHeaders(),
    }),
  patch: <T>(url: string, data: any) =>
    axios.patch<T>(`${ROOT_URL}${url}`, data, {
      headers: getHeaders(),
    }),
  put: <T>(url: string, data: any) =>
    axios.put<T>(`${ROOT_URL}${url}`, data, {
      headers: getHeaders(),
    }),
  delete: <T>(url: string) =>
    axios.delete<T>(`${ROOT_URL}${url}`, {
      headers: getHeaders(),
    }),
};
