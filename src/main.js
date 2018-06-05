// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'

Vue.config.productionTip = false

import { Group, XInput, XButton, Flexbox, FlexboxItem, Tabbar, TabbarItem, XHeader, Swiper, Panel, Alert, XTextarea, Cell, XImg, Spinner, Icon, XSwitch, Previewer, Scroller, LoadMore, Confirm, Loading} from 'vux'

Vue.component('group', Group)
Vue.component('x-input', XInput)
Vue.component('x-button', XButton)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)
Vue.component('x-header', XHeader)
Vue.component('swiper', Swiper)
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
// vux以插件形式引入
import { AlertPlugin } from 'vux'
Vue.use(AlertPlugin)

import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

import  { ConfirmPlugin } from 'vux'
Vue.use(ConfirmPlugin)


import axios from 'axios'
Vue.prototype.$http = axios;  

// 引入时间格式化插件moment 
// Vue.use(require(vue-moment'))
Vue.use(require('vue-moment'));
// 设置域名前缀为全局变量，方便修改
import global_ from "./assets/commonjs/Global";
Vue.prototype.HOST = global_

// 路由守卫

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    console.log('登录页')
    console.log(store.state.isLogin)
    next()
  }
  else if (store.state.isLogin === false){
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


