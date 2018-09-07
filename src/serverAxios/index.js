// 对axios进行二次封装和拦截  token验证等

import axios from 'axios'
import Storge from '../assets/commonjs/SetLocalStorge'
import { AlertModule } from 'vux'
import router from '@/router'

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