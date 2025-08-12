import axios from "axios";
import { BASE_URL } from "../constants/env";

export const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
