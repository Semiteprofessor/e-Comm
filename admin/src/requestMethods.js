import axios from "axios";

const BASE_URL = "http://localhost:8899/api/v1";

const persistedRoot = localStorage.getItem("persist:root");
let TOKEN = "";

if (persistedRoot) {
  try {
    const user = JSON.parse(JSON.parse(persistedRoot).user);
    TOKEN = user?.currentUser?.accessToken || "";
  } catch (error) {
    console.error("Error parsing localStorage data:", error);
  }
}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});
