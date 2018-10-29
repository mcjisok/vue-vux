// 对axios进行二次封装和拦截  token验证等

import axios from 'axios'
import Storge from '../assets/commonjs/SetLocalStorge'
import { AlertModule } from 'vux'
import router from '@/router'

axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;
// axios.defaults.baseURL = 'https://api.example.com';
axios.interceptors.request.use(
    config => {
      const token = Storge.get('token');
      const udata = Storge.get('userInfo')
      if (token) {
        // Bearer是JWT的认证头部信息
        config.headers.common['Authorization'] = 'Bearer ' + token;
        config.headers.common['UserID'] = udata._id;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      // console.log(error.config);
      // console.log('/sds')


      // var config = error.config;
      // // If config does not exist or the retry option is not set, reject
      // if(!config || !config.retry) return Promise.reject(error);
      
      // // Set the variable for keeping track of the retry count
      // config.__retryCount = config.__retryCount || 0;
      
      // // Check if we've maxed out the total number of retries
      // if(config.__retryCount >= config.retry) {
      //     // Reject with the error
      //     return Promise.reject(error);
      // }
      
      // // Increase the retry count
      // config.__retryCount += 1;
      
      // // Create new promise to handle exponential backoff
      // var backoff = new Promise(function(resolve) {
      //     setTimeout(function() {
      //         resolve();
      //     }, config.retryDelay || 1);
      // });
      
      // // Return the promise in which recalls axios to retry the request
      // return backoff.then(function() {
      //     return axios(config);
      // });
      // console.log(errpr.res)
      if (error.response.status === 401 || error.response.status === 400) {
        console.log(error.response.status)
        AlertModule.show({
          title: '请重新登录',
          content: '认证失效 请重新登录',
          onShow () {
          },
          onHide () {
            router.push('/login')
          }
        })
      } else {
        AlertModule.show({
          title: '系统出错',
          content: '系统出错，请稍后再试',
          onShow () {
          },
          onHide () {
            router.push('/login')
          }
        })
      }
      return Promise.reject(error);
    }
);

export default axios