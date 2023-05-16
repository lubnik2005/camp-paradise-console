import axios from 'axios';
// config
import { HOST_API_KEY } from '../config-global';
import localStorageAvailable from './localStorageAvailable';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API_KEY });
const storageAvailable = localStorageAvailable();
axiosInstance.defaults.headers.common['Authorization'] = storageAvailable ? localStorage.getItem('accessToken') : '';

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
