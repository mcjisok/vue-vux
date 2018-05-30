<template>
    <div class="pushList">
        <!-- <scroller lock-x height="200px" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200"> -->
        
        <div class="pl_head"><p>我的圈子</p></div>
        <div class="pl_content">
            <ul>
                <li v-for="(n,i) in pushlist" :key="i">
                    <div class="pl_context">
                        <div class="ctx_head">
                            <div class="head_left">
                                <div class="pensonal_headimg">
                                    <img src="@/assets/kyb.png" alt="" width="80%">
                                </div>
                                <div class="push_info">
                                    <p>卡比兽的土豆</p>
                                    <p class="push_time">{{n.meta.createAt | moment('YYYY年MM月DD日 HH:mm:ss')}}</p>
                                </div>
                            </div>
                            <div class="head_right"></div>
                        </div>
                        <div class="ctx_warp">
                            <p class="warp_title">{{n.pushContent}}</p>
                        </div>
                        <div class="ctx_img" v-if="n.pushImageList.length > 0">
                            <!-- <img class="previewer-demo-img" v-for="(item, index) in list" :key="item.src" :src="item.src" width="100" @click="show(index)"> -->
                            
                            <ul class="figure-list">
                                <li v-for="(item, index) in n.pushImageList.slice(0,3)" :key="index">
                                    <figure v-bind:style="{backgroundImage:'url(http://localhost:3000'+item+')'}" class="previewer-demo-img">
                                        <a href="#"></a>
                                        <!-- <img src="" alt=""> -->
                                    </figure>
                                </li>                            
                            </ul>
                             
                            <!-- <div v-transfer-dom>
                            <previewer :list="list" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
                            </div> -->
                        </div>
                    </div>
                </li>
                <load-more tip="正在加载" v-if="!loadmoreSW"></load-more>
                <load-more v-if="!hasMore" :show-loading="hasMore" tip="暂无数据" background-color="#fbf9fe"></load-more>
                <!-- <li><p @click="loadmore()">加载更多...</p><br></li> -->
                
            </ul>
        </div>
        <!-- </scroller> -->
        
    </div>
</template>

<script>
import { TransferDom } from 'vux'
export default {
    name:'pushlist',
    data () {
        return {
            lilength:[1,2,3],
            
            page:0,
            total:0,
            pushlist:[],
            hasMore:true,
            GET_PUSHLIST_API:this.HOST.host + '/getpushlist',   

            loadmoreSW:true
        }
    },
    // directives: {
    //     TransferDom
    // },
    components: {
        
    },
    methods: {
        logIndexChange (arg) {
            console.log(arg)
        },
        show (index) {
            console.log(i)
            console.log(index)
            this.$refs.previewer.show(index)
        },
        loadmore(){
            // this.lilength.push(1)
            console.log(this.page)
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
                        
                    }, 300);
                    
                })
                .catch(err=>{

                })
            }
            else{
                // this.$vux.toast.show({
                //     text: '没有更多数据啦~~~',
                //     type:'text'
                // })
                this.loadmoreSW = !this.loadmoreSW
            }
        }
    },
    mounted:function () {
        this.loadmore();
        let _this = this;  
            // 设置一个开关来避免重负请求数据  
        this.loadmoreSW = true;  
        window.addEventListener('scroll',function(){  
            // console.log(document.documentElement.clientHeight+'-----------'+window.innerHeight); // 可视区域高度  
            // console.log(document.body.scrollTop); // 滚动高度  
            // console.log(document.body.offsetHeight); // 文档高度  
            if(document.body.scrollTop + window.innerHeight >= document.body.offsetHeight && _this.hasMore) {  
                // console.log(sw);  
                // 如果开关打开则加载数据  
                if(_this.loadmoreSW){  
                    // 将开关关闭 
                    // console.log(sw) 
                    _this.loadmoreSW = false;  
                    _this.loadmore();                    
                }  
            }
        })
    }
    
}
</script>

<style lang="stylus" scoped>
p2r(size){
    size/32 * 1rem
}

.pushList{
    margin-top p2r(10);
    width 100%
    border-top:1px solid #E5E5E5 
    .pl_head{
        height p2r(60)
        padding 0 p2r(20)
        p{
            line-height p2r(60)
            border-bottom:1px solid #E5E5E5
            font-size 14px
        }
    }
    .pl_content{
        width 100%

        .pl_context{
            border-bottom 3px solid #f3f4f6
            p{
                font-size 14px;
            }
            .ctx_head{
                width 100%
                height p2r(100)
                position relative
                
                .head_left{
                    width 70%
                    height p2r(100)
                    float left
                    padding-left p2r(15)                    
                    // margin 10px auto
                    .pensonal_headimg{
                        width p2r(100)
                        height p2r(100)
                        float left
                        img{
                            padding-top 10%
                            border-radius 50%
                        }
                    }
                    .push_info{
                        // width 100%
                        height p2r(100)
                        float left
                        padding-top p2r(10)
                        p{
                            line-height p2r(40)
                        };    
                        .push_time{
                            font-size 12px;
                        }         
                    }       
                }
                .head_right{
                    width 30%
                    height p2r(100)         
                    float left
                }
            }
            .ctx_warp{
                padding 0 p2r(25)
                margin-top p2r(15)
                margin-bottom p2r(15)
                color #999999
                display -webkit-box
                -webkit-line-clamp 2
                overflow hidden
                text-overflow ellipsis
                -webkit-box-orient vertical
            }
            .ctx_img{
                height p2r(220)
                padding 0 p2r(20)
                img{
                    width p2r(200)
                }
            }
        }
    }
}

.figure-list {
    margin: 0;
    padding: 0;
}

.figure-list:after {
    content: "";
    display: block;
    clear: both;
    height: 0;
    overflow: hidden;
    visibility: hidden;
}

.figure-list li {
    list-style: none;
    float: left;
    width: 31.3%;
    margin: 0 2% 2% 0;
}

.figure-list figure {
    border: 1px solid #eee;
    position: relative;
    width: 100%;
    height: 0;
    overflow: hidden;
    margin: 0;
    padding-bottom: 100%;
    /* 关键就在这里 */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.figure-list figure a {
    display: block;
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
}
</style>
