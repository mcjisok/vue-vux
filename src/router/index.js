import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Home from '@/views/Home'

// Home 子路由页面组件引入
import IndexPage from '@/views/Index'
import PushPage from '@/views/Push'
import ZonePage from '@/views/Zone'
import MemberPage from '@/views/Member'
import GroupPage from '@/views/Group/groupList'
import NewGroupPage from '@/views/Group/addNewGroup'
// 个人中心子页面
import SettingPage from '@/views/Member/Setting'
import Drafts from '@/views/Member/Drafts'

// 分组详情页面
import GroupDetailPage from '@/views/Group/groupDetail'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'/register',
      name:'Register',
      component: Register
    },
    {
      path:'/home',
      name:'Home',
      component: Home,
      children:[
        {
          path: 'index',
          name: 'Index',
          component: IndexPage
        },
        {
          path:'push',
          name:'Push',
          component:PushPage
        },
        {
          path:'group',
          name:'Group',
          component:GroupPage,          
        },
        {
          path:'group/:id',
          name:'GroupDetail',
          component:GroupDetailPage,          
        },
        {
          // 新建分组
          path:'newgroup',
          name:'NewGroup',
          component:NewGroupPage
        },
        {
          //修改草稿页
          path:'push/:id',
          component:PushPage
        },
        {
          path:'zone',
          name:'Zone',
          component:ZonePage
        },
        {
          path:'member',
          name:'Member',
          component:MemberPage
        },
        {
          path:'setting',
          name:'Setting',
          component:SettingPage
        },
        {
          path:'drafts',
          name:'Drafts',
          component: Drafts
        }

      ]
    }
  ]
})
