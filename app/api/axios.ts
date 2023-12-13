import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3011",
    // baseURL: "https://serve-cakap-me.vercel.app",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'X-Requested-With': 'XMLHttpRequest'
    },

    withCredentials: true,
});

export default instance;