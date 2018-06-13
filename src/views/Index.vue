<template>
    <div class="indexPage">
        <div class="topbarbox"></div>            
        <!-- <swiper :list="demo01_list" v-model="demo01_index" :loop="isloop" :auto="isauto"></swiper> -->
        <swiper auto height="100px">
            <swiper-item class="black"><h3 class="title fadeInUp animated">人是情感动物</h3></swiper-item>
            <swiper-item class="black"><h3 class="title fadeInUp animated">当你觉得你的生活枯燥无味时</h3></swiper-item>
            <swiper-item class="black"><h3 class="title fadeInUp animated">或许是因为你的生活没了“仪式感”</h3></swiper-item>
            <swiper-item class="black"><h3 class="title fadeInUp animated">仪式感是为了让你觉得</h3></swiper-item>
            <swiper-item class="black"><h3 class="title fadeInUp animated">你是在生活</h3></swiper-item>
            <swiper-item class="black"><h3 class="title fadeInUp animated">而不是只是生存。</h3></swiper-item>
        </swiper>
        <!-- <panel header="我的圈子" :footer="footer" :list="list" :type="type" ></panel> -->
        <pushlist></pushlist>
        <div class="navbarbox"></div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import PushList from '@/components/Home/PushList'

export default {
    data(){
        return{
            pageTitle:'首页',
            // demo01_list: baseList,
            demo01_index:0,
            isloop:true,
            isauto:true,
            type:'4',
            
        }
    },
    components:{
        pushlist:PushList,
    },
    methods:{
        onImgError (item, $event) {
            console.log(item, $event)
        },
        show:function(){
            console.log(this.a)
        }
    },
    computed:mapState({
        a:state => state.nowLoginUsername
    }),
    mounted:function () {
        // this.show();
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

.black {
  background-color: #000;
}
.title{
  line-height: 100px;
  text-align: center;
  color: #fff;
}
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
.fadeInUp {
  animation-name: fadeInUp;
}
.swiper-demo-img img {
  width: 100%;
}
</style>
