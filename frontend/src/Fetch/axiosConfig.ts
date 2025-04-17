import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const axiosConfig = axios.create({
    baseURL: backendUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    });

export default axiosConfig;
