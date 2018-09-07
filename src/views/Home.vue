<template>
    <div class="mcj_home">
        <x-header :title=pageTitle class="xheader" style="width: 100%; position: fixed; left: 0px; top: 0px; z-index: 100;">
            <a slot="right" @click="routerJumpToPush()" v-if="this.$route.path === '/home/index'">发布动态</a>
            <a slot="right" @click="routerJumpToGroup()" v-if="this.$route.path === '/home/group'">新建分组</a>
            <a slot="right" @click="routerJumpToPushInGroup()" v-if="this.$route.name == 'GroupDetail'">发布动态</a>
            <a slot="right" @click="userLogOut()" v-if="this.$route.path == '/home/member'">注销</a>
        </x-header>        
        
        <div class="content">
            <!-- <div class="topbarbox"></div>            
            <swiper :list="demo01_list" v-model="demo01_index" :loop="isloop" :auto="isauto"></swiper>
            <panel header="我的圈子" :footer="footer" :list="list" :type="type" ></panel>
            <div class="navbarbox"></div> -->
            <keep-alive>
                <!-- <transition name="fade"> -->
                <router-view v-if="$route.meta.keepAlive"></router-view>
                <!-- </transition> -->
            </keep-alive>
            <!-- <transition name="" v-if="$route.meta.routerAnimate"> -->
            <transition>
                <router-view v-if="!$route.meta.keepAlive"></router-view>
            </transition>
            <!-- <transition name="" v-else>
                <router-view v-if="!$route.meta.keepAlive"></router-view>
            </transition> -->

        </div>
        
        <Navbar v-if="$route.meta.topNav"></Navbar>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import { mapActions } from 'vuex'
import Storge from '../assets/commonjs/SetLocalStorge'

export default {
    data(){
        return{
            // pageTitle:'首页',           
        }
    },
    computed:{
        pageTitle:function(){
            return this.$route.meta.title
            // let nowRoute = this.$route.path;
            // if(nowRoute == '/home/index'){
            //     return '首页'
            // }
            // if(nowRoute == '/home/member'){
            //     return '个人中心'
            // }
            // if(nowRoute == '/home/group'){
            //     return '分组'
            // }
            // else{
            //     return 'mcjisok'
            // }
        }
    },
    components:{
        Navbar,
    },
    methods:{
        ...mapActions([
            'setGroupID','logOut'
        ]),
        
        show:function(){
            // console.log(this.a)
            this.$router.push('/home/index')
        },
        routerJumpToPush:function(){
            this.$store.dispatch('setGroupID',{ID:''})
            this.$router.push('/home/push')            
        },
        routerJumpToGroup:function(){
            this.$router.push('/home/newgroup')
        },
        routerJumpToPushInGroup:function(){
            this.$router.push('/home/push')      
        },
        userLogOut:function(){              //注销
            this.$store.dispatch('logOut')
            Storge.remove('userInfo')        //删除本地客户端localstorge
            Storge.remove('token')        //删除本地客户端localstorge
            this.$router.push('/login')
        }
    },
    beforeMount:function (){
          
    },
    mounted:function () {
        this.show();
    }
}
</script>

<style lang="stylus" scoped>
p2r(size){
    size/32 * 1rem
}

.navbarbox{
    height: p2r(85);
}

.content{
    top: 40px;
}

.fade-enter-active{
     animation:Ado .2s ease-in;
 }
 @keyframes Ado{
       0%{transform:scale(0.8,0.5);}
       60%{transform:scale(1,1);}
       80%{transform:scale(1.1,1.1);}
       100%{transform:scale(1,1);}
 }
//  .fade-leave-active{
//      animation:Bdo .5s ease-in;
//  }
//  @keyframes Bdo{
//        0%{transform:scale(1,1);}
//        60%{transform:scale(1.5,1.5);}
//        80%{transform:scale(1,1);}
//        100%{transform:scale(0.5,0.5);}

//  }
</style>
