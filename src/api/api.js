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

export default api