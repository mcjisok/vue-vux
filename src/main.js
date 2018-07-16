// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'

import Storge from './assets/commonjs/SetLocalStorge'

Vue.config.productionTip = false

import { Group, XInput, XButton, Flexbox, FlexboxItem, Tabbar, TabbarItem, XHeader, Swiper, SwiperItem,Panel, Alert, XTextarea, Cell, XImg, Spinner, Icon, XSwitch, Previewer, Scroller, LoadMore, Confirm, Loading, PopupPicker, Masker,Divider,Badge,TransferDom, Tab, TabItem} from 'vux'

Vue.component('group', Group)
Vue.component('x-input', XInput)
Vue.component('x-button', XButton)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)
Vue.component('x-header', XHeader)
Vue.component('swiper', Swiper)
Vue.component('swiper-item', SwiperItem)
Vue.component('panel', Panel)
Vue.component('alert', Alert)
Vue.component('x-textarea', XTextarea)
Vue.component('cell', Cell)
Vue.component('x-img', XImg)
Vue.component('spinner', Spinner)
Vue.component('icon', Icon)
Vue.component('x-switch', XSwitch)
Vue.component('previewer', Previewer)
// Vue.component('scroller', Scroller)
Vue.component('load-more', LoadMore)
Vue.component('confirm', Confirm)
Vue.component('loading', Loading)
Vue.component('popup-picker', PopupPicker)
Vue.component('masker', Masker)
Vue.component('divider', Divider)
Vue.component('badge', Badge)
Vue.directive('transfer-dom', TransferDom)

Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)

// vux以插件形式引入
import { AlertPlugin } from 'vux'
Vue.use(AlertPlugin)

import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

import  { ConfirmPlugin } from 'vux'
Vue.use(ConfirmPlugin)


// import axios from 'axios'
// 引入经过二次封装的axios
import axios from '@/serverAxios/index'
Vue.prototype.$http = axios;  

// 引入时间格式化插件moment 
// Vue.use(require(vue-moment'))
Vue.use(require('vue-moment'));
// 设置域名前缀为全局变量，方便修改
import global_ from "./assets/commonjs/Global";
Vue.prototype.HOST = global_

// 路由守卫

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.meta.requireAuth) {
    console.log('登录页')
    console.log(store.state.isLogin)
    console.log('localstorge是否有存储',Storge.get('userInfo'))
    let user = Storge.get('userInfo')
    let token = Storge.get('token')
    console.log('2')
    if(user!==null){
      store.dispatch('changeLogin',user)
      router.push('/home/index')
      console.log('3')
      console.log(store.state.isLogin)
      next()
    }
    console.log('4')
    next()
  }
  else if (store.state.isLogin === false){
    console.log('1')
    router.push('/login')
    next()
  }
  else if(to.path === '/home'){
    router.push('/home/index')
    next()
  }
  else{
    next()
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


