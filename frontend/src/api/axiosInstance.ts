import axios from "axios";
import { BACKEND_BASE_URL } from "../contants.ts";

const axiosInstnce = axios.create({
  baseURL: BACKEND_BASE_URL,
});

export default axiosInstnce;
