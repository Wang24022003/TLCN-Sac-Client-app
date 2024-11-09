import axios from "axios";
const local = 'http://localhost:8800'
const api = axios.create({
    baseURL : `${local}/api/v1`,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    
})
api.interceptors.request.use(
    async (config) => {
        // Do something before request is sent
        const access_token = localStorage.getItem("access_token");
        if (access_token) {
            config.headers.Authorization = `Bearer ${access_token}`;
        }
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

export default api