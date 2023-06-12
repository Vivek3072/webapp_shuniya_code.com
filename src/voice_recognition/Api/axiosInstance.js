import axios from "axios";

const baseURL = "http://43.204.229.206:8000/api/v1/";

export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});
