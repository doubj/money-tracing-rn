import axios from 'axios';
import Config from 'react-native-config';

axios.defaults.baseURL = Config.API_URL;
axios.defaults.timeout = 3000

axios.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //   config.headers['token'] = getToken()
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)
