import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Home from '@/views/Home'

// Home 子路由页面组件引入
import IndexPage from '@/views/Index'
import PushPage from '@/views/Push/Push'
import PushDetailPage from '@/views/Push/PushDetail'
import ZonePage from '@/views/Zone'
import MemberPage from '@/views/Member'
import GroupPage from '@/views/Group/groupList'
import NewGroupPage from '@/views/Group/addNewGroup'
// 个人中心子页面
import SettingPage from '@/views/Member/Setting'
import Drafts from '@/views/Member/Drafts'
import About from '@/views/AboutMe'

// 分组详情页面
import GroupDetailPage from '@/views/Group/groupDetail'

// 搜索页面
import SearchPage from '@/views/Search'
import SearchResult from '@/views/SearchResult'


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
      component:Login,
      meta:{
        title:'登录'
      }
    },
    {
      path:'/register',
      name:'Register',
      component: Register,
      meta:{
        title:'注册'
      }
    },
    {
      path:'/home',
      name:'Home',
      component: Home,
      children:[
        {
          path: 'index',
          name: 'Index',
          component: IndexPage,
          meta:{
            title:'首页',
            keepAlive:true
          }
        },
        {
          path:'push',
          name:'Push',
          component:PushPage,
          meta:{
            title:'发布动态',
            requiresAuth:true,
          }
        },
        {
          path:'pushdetail/:id',
          name:'PushDetail',
          component:PushDetailPage,
          meta:{
            requiresAuth:true
          }
        },
        {
          path:'group',
          name:'Group',
          component:GroupPage,
          meta:{
            title:'分组',
            requiresAuth:true,
            keepAlive:true
          }          
        },
        // 搜索页面
        {
          path:'search',
          name:'Search',
          component:SearchPage,
          meta:{
            title:'搜索',
            requiresAuth:true,
          }
        },
        {
          path:'searchresult',
          name:'searchresult',
          component:SearchResult,
          meta:{
            title:'搜索结果',
            requiresAuth:true
          }
        },
        {
          path:'groupdetail/:id',
          name:'GroupDetail',
          component:GroupDetailPage,    
          meta:{
            requiresAuth:true
          }      
        },
        {
          // 新建分组
          path:'newgroup',
          name:'NewGroup',
          component:NewGroupPage,
          meta:{
            title:'新建分组',
            requiresAuth:true
          }
        },
        {
          //修改草稿页
          path:'push/:id',
          component:PushPage,
          meta:{
            requiresAuth:true
          }
        },
        {
          path:'zone',
          name:'Zone',
          component:ZonePage
        },
        {
          path:'member',
          name:'Member',
          component:MemberPage,
          meta:{
            title:'个人中心',
            requiresAuth:true
          }
        },
        {
          path:'setting',
          name:'Setting',
          component:SettingPage,
          meta:{
            title:'设置',
            requiresAuth:true
          }
        },
        {
          path:'drafts',
          name:'Drafts',
          component: Drafts,
          meta:{
            title:'草稿箱',
            requiresAuth:true
          }
        },
        {
          path:'about',
          name:'About',
          component: About,
          meta:{
            title:'关于我们',
            requiresAuth:true
          }
        },
      ]
    }
  ]
})
