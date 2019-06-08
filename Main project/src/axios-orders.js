import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-app-2a8a9.firebaseio.com'
});

export default instance;