import axios from "axios"

const dev = import.meta.env.VITE_MODE === "development"
const staging = import.meta.env.VITE_MODE === "staging"

const api = axios.create({
    baseURL: dev
        ? import.meta.env.VITE_API_BASE_DEV
        : staging
        ? import.meta.env.VITE_API_BASE_STAGING
        : import.meta.env.VITE_API_BASE,
    headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
    },
})

export default api
