import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "./URL";

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default api;
