import axios from 'axios';

const api = axios.create({
  baseURL: "https://sos-woman-service.onrender.com",
});

export default api;