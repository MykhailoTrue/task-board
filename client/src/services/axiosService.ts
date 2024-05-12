import axios from 'axios';

const API_URL = process.env.API_URL;

const axiosService = axios.create({ baseURL: API_URL });

export default axiosService;
