import axios from 'axios'; 
const api = axios.create({ 
baseURL: 'http://192.168.8.193:3000', // replace with your API 
}); 
export default api;