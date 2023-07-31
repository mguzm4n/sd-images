import axios from 'axios';

axios.defaults.baseURL = "/api";
axios.defaults.withCredentials = false;

export default axios;