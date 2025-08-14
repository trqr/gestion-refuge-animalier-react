import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080"
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("RAtoken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
