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
        <pushlist 
            :pushlist="pushlist" 
            :loadingShow="loadingShow" 
            :loadmoreSW="loadmoreSW" 
            :hasMore="hasMore" 
            @comment="renewComment"
            @loadMore="renewPush">
        </pushlist>

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
            


            // push数据
            page:0,
            total:0,
            pushlist:[],
            hasMore:true,
            loadmoreSW:true,//数据首次加载之前的加载动画
            loadingShow:true,//页面下拉加载中动画

            //API
            host:this.HOST.host,
            GET_PUSHLIST_API:this.HOST.host + '/getpushlist',       

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
        },

        loadmore(){
            // this.lilength.push(1)
            // console.log(this.page)
            if(this.hasMore){
                this.page ++;            
                let _this = this;
                this.$http.post(this.GET_PUSHLIST_API,{
                    page:_this.page
                })
                .then(res=>{
                    setTimeout(() => {
                        // console.log(res)
                        _this.loadmoreSW = true
                        _this.total = res.data.toal
                        _this.hasMore = res.data.hasMore                        
                        _this.pushlist = _this.pushlist.concat(res.data.pushList)  
                        _this.loadingShow = false                      
                    }, 300);
                    
                })
                .catch(err=>{

                })
            }
            else{                
                _this.loadingShow = false     
                this.loadmoreSW = !this.loadmoreSW
            }
        },

        // 监听pushlist组件的评论是否有变化
        renewComment:function(res){
            // console.log('孙子组件传出来的数据为：',res)
            // 并添加新的评论数据
            this.$set(this.pushlist, res.key, res.res.data.data)
        },

        // 加载更多push
        renewPush:function(msg){
            this.loadmoreSW = false;  
            this.loadmore();   
        }

    },
    computed:mapState({
        a:state => state.nowLoginUsername
    }),
    mounted:function () {
        // this.show();
        let _this = this;  
        this.loadmore();
        // this.loadmoreSW = true;  
        // window.addEventListener('scroll',function(){  
        //     // console.log(document.documentElement.clientHeight+'-----------'+window.innerHeight); // 可视区域高度  
        //     // console.log(document.body.scrollTop); // 滚动高度  
        //     // console.log(document.body.offsetHeight); // 文档高度  
        //     if(document.body.scrollTop + window.innerHeight >= document.body.offsetHeight && _this.hasMore) {  
        //         // console.log(sw);  
        //         // 如果开关打开则加载数据  
        //         if(_this.loadmoreSW){  
        //             // 将开关关闭 
        //             // console.log(sw) 
        //             _this.loadmoreSW = false;  
        //             _this.loadmore();                    
        //         }  
        //     }
        // })
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
