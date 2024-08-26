import axios from "axios";

const BASE_URL = "http://localhost:8899/api/v1";

// Safely parse localStorage data
const persistedRoot = localStorage.getItem("persist:root");
let TOKEN = "";

// Check if the data exists before parsing
if (persistedRoot) {
  try {
    const user = JSON.parse(JSON.parse(persistedRoot).user);
    TOKEN = user?.currentUser?.accessToken || "";
  } catch (error) {
    console.error("Error parsing localStorage data:", error);
  }
}

// Public request (no auth required)
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// Authenticated request (with bearer token)
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`, // Use 'Authorization' for Bearer tokens
  },
});
