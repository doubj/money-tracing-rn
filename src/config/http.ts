import axios from 'axios';
import Config from 'react-native-config';

const errorMsg = '请求出错啦，请稍后再试！';

// axios.defaults.baseURL = Config.API_URL;
axios.defaults.baseURL = "http://192.168.0.109:3005/api/v1";
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
    // const { code, data, msg } = response.data
    // if (code !== 200) {
    //   return Promise.reject(new Error(msg || 'Error'))
    // } else {
    //   return data
    // }
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)
