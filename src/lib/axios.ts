import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.albaeud.cyou/",
});

export default axiosInstance;
