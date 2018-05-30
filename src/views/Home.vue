<template>
    <div class="mcj_home">
        <x-header :title=pageTitle class="xheader" style="width: 100%; position: fixed; left: 0px; top: 0px; z-index: 100;"></x-header>        
        
        <div class="content">
            <!-- <div class="topbarbox"></div>            
            <swiper :list="demo01_list" v-model="demo01_index" :loop="isloop" :auto="isauto"></swiper>
            <panel header="我的圈子" :footer="footer" :list="list" :type="type" ></panel>
            <div class="navbarbox"></div> -->
            <router-view></router-view>
        </div>
        
        <Navbar></Navbar>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
    data(){
        return{
            // pageTitle:'首页',           
        }
    },
    computed:{
        pageTitle:function(){
            let nowRoute = this.$route.path;
            if(nowRoute == '/home/index'){
                return '首页'
            }
            if(nowRoute == '/home/member'){
                return '个人中心'
            }
            else{
                return 'mcjisok'
            }
        }
    },
    components:{
        Navbar,
    },
    methods:{
        
        show:function(){
            // console.log(this.a)
            this.$router.push('/home/index')
        }
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

</style>
