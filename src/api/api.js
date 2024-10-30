import axios from "axios";
const local = 'http://localhost:8800'
const api = axios.create({
    baseURL : `${local}/api/v1`
})

export default api