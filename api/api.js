import axios from 'axios'; 
const api = axios.create({ 
baseURL: 'http://192.168.100.168:3000', // replace with your API 
}); 
export default api;