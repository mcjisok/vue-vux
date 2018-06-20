<template>
    <div class="pushList">
        <!-- <scroller lock-x height="200px" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200"> -->
        
        <div class="pl_head"><p>我的圈子</p></div>
        <loading :show="loadingShow" text=""></loading>        
        <div class="pl_content">
            <ul v-if="pushlist.length > 0">
                <li v-for="(n,i) in pushlist" :key="i">
                    <div class="pl_context">
                        <div class="ctx_head">
                            <div class="head_left">
                                <div class="pensonal_headimg">
                                    <img :src="host + n.userID.userInfoPhoto" alt="" width="80%">
                                </div>
                                <div class="push_info">
                                    <p>{{n.userID.name}}</p>
                                    <p class="push_time">{{n.pushdateAt | moment('YYYY年MM月DD日 HH:mm:ss')}}</p>
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
                                    <figure v-bind:style="{backgroundImage:'url('+host+item+')'}" class="previewer-demo-img">
                                        <!-- <a href="#"></a> -->
                                        <!-- <img src="" alt=""> -->
                                    </figure>
                                </li>                            
                            </ul>
                             
                            <!-- <div v-transfer-dom>
                            <previewer :list="list" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
                            </div> -->
                        </div>

                        <Comment 
                            :pushID="n._id" 
                            :fromID="$store.state.nowLoginUserID" 
                            :comment="n.comment" 
                            :pushIndex="i" 
                            @reply="changePush">
                        </Comment>

                    </div>
                </li>
                <load-more tip="正在加载" v-if="!loadmoreSW"></load-more>
                <load-more v-if="!hasMore" :show-loading="hasMore" tip="已经加载完啦~" background-color="#fbf9fe"></load-more>
                <!-- <li><p @click="loadmore()">加载更多...</p><br></li> -->
                
            </ul>
        </div>
        
    </div>
</template>

<script>
import { TransferDom } from 'vux'
import Comment from '@/components/Home/Comment'
export default {
    name:'pushlist',
    props:{
        pushlist:{
            type: Array
        },
        loadingShow:{
            type:Boolean,
        },
        loadmoreSW:{
            type:Boolean
        },
        hasMore:{
            type:Boolean
        }
    },
    data () {
        return {
            host:this.HOST.host,
        }
    },
    // directives: {
    //     TransferDom
    // },
    components: {
        Comment
    },
    methods: {
        logIndexChange (arg) {
            console.log(arg)
        },
        show (index) {
            console.log(index)
            this.$refs.previewer.show(index)
        },
        
        changePush:function(msg){
            console.log('接收到子组件传出来的数据')
            console.log(msg)
            // this.pushlist[msg.key] = msg.res.data.data
            // console.log(msg)
            // this.$set(this.pushlist, msg.key, msg.res.data.data)
            this.$emit('comment',msg)
        }
    },
    beforeMount:function(){
      
    },
    mounted:function () {
        let _this = this;  
        // this.loadmoreSW = true;  
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
                    // _this.loadmoreSW = false;  
                    // _this.loadmore();     
                    _this.$emit('loadMore')               
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
                margin-top p2r(10)
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
                p{
                    padding 0 p2r(10)
                    margin-top p2r(15)
                    margin-bottom p2r(15)
                    color #999999
                    word-wrap:break-word /* 允许数字字母换行*/
                    display -webkit-box
                    -webkit-line-clamp 2
                    overflow hidden
                    text-overflow ellipsis
                    -webkit-box-orient vertical
                }
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
                height p2r(210)
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
    margin: 0 2% 0 0;
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
