// 对axios进行二次封装和拦截  token验证等

import axios from 'axios'
import Storge from '../assets/commonjs/SetLocalStorge'


axios.interceptors.request.use(
    config => {
      const token = Storge.get('token');
      if (token) {
        // Bearer是JWT的认证头部信息
        config.headers.common['Authorization'] = 'Bearer ' + token;
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
      if (error.response.status === 401) {
        Vue.prototype.$msgBox.showMsgBox({
          title: '错误提示',
          content: '您的登录信息已失效，请重新登录',
          isShowCancelBtn: false
        }).then((val) => {
          router.push('/login');
        }).catch(() => {
          console.log('cancel');
        });
      } else {
        Vue.prototype.$message.showMessage({
          type: 'error',
          content: '系统出现错误'
        });
      }
      return Promise.reject(error);
    }
);

export default axios