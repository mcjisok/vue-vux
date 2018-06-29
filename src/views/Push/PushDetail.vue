<template>
    <div class="pushDetail">
        <div class="topbarbox"></div>
            <div class="pl_context" v-if="pushDetail !== ''">
                <div class="ctx_head">
                    <div class="head_left">
                        <div class="pensonal_headimg">
                            <img :src="host + pushDetail.userID.userInfoPhoto" alt="" width="80%">
                        </div>
                        <div class="push_info">
                            <p>{{pushDetail.userID.name}}</p>
                            <p class="push_time">{{pushDetail.pushdateAt | moment('YYYY年MM月DD日 HH:mm:ss')}}</p>
                        </div>
                    </div>
                    <div class="head_right"></div>
                </div>
                <div class="ctx_warp">
                    <p class="warp_title">{{pushDetail.pushContent}}</p>
                </div>
                <div class="ctx_img" v-if="pushDetail.pushImageList">
                
                    <ul class="figure-list">
                        <li v-for="(item, index) in pushDetail.pushImageList.slice(0,9)" :key="index" @click="show(index)">
                            <figure v-bind:style="{backgroundImage:'url('+host+item+')'}" class="previewer-demo-img">
                            
                            </figure>
                        </li>  
                        <div v-transfer-dom>
                            <previewer :list="list" ref="previewer" :options="options" ></previewer>
                        </div>    
                        <div style="clear:both"></div>                      
                    </ul>                   
                
                </div>

                <Comment 
                    :pushID=pushDetail._id
                    :fromID=$store.state.nowLoginUserID 
                    :comment="pushDetail.comment" 
                    :maxCommentReply=100
                    @reply="changePush">
                </Comment>

            </div>
        <!-- <p>{{pushID}}</p> -->
        <div class="navbarbox"></div>
    </div>
</template>

<script>
import Comment from '@/components/Home/Comment'
import { Previewer, TransferDom } from 'vux'
export default {
    data () {
        return {
            host:this.HOST.host,
            pushID:this.$route.params.id,
            pushDetail:'',

            // API
            getPushDetailAPI:this.HOST.host + '/getPushDetail',



            list: [],
            options: {
                getThumbBoundsFn (index) {
                // find thumbnail element
                let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
                // get window scroll Y
                let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                // optionally get horizontal scroll
                // get position of element relative to viewport
                let rect = thumbnail.getBoundingClientRect()
                // w = width
                return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
                // Good guide on how to get element coordinates:
                // http://javascript.info/tutorial/coordinates
                }
            }

            
        }
    },
    directives: {
        TransferDom
    },

    components: {
        Comment
    },

    methods:{
        getPushDetail(){
            // console.log(1)
            let _this = this;
            this.$http.post(_this.getPushDetailAPI,{
                _id:this.pushID
            })
            .then(res=>{    
                if(res.data.code === 200){
                    _this.pushDetail = res.data.data
                    _this.imgArrayToObj(_this.pushDetail.pushImageList)
                }
            })
            .catch(e=>{
                console.log(e)
            })
        },
        changePush:function(msg){
            console.log('接收到子组件传出来的数据')
            console.log(msg)
            // this.$set(this.pushDetail, msg.key, msg.res.data.data)
            // this.$emit('comment',msg)
             this.pushDetail = msg.res.data.data
        },

        // 生成图片数据数组
        imgArrayToObj:function(imgarr){
            let imglist = []
            imgarr.map((item,index)=>{
                imglist.push({
                    msrc: this.HOST.host + item,
                    src: this.HOST.host + item,
                })
            })
            this.list = imglist
        },

        show (index) {
            this.$refs.previewer.show(index)
        }
    },
    created:function(){
        this.getPushDetail()
    },
    beforeMount:function(){
        
    },
    mounted:function(){
        window.onload = function(){
            alert(123213213)
        }
    },
}
</script>

<style lang="stylus" scoped>
p2r(size){
    size/32 * 1rem
}

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
            // display -webkit-box
            // -webkit-line-clamp 2
            // overflow hidden
            // text-overflow ellipsis
            // -webkit-box-orient vertical
        }
        padding 0 p2r(25)
        margin-top p2r(15)
        margin-bottom p2r(15)
        color #999999
        // display -webkit-box
        // -webkit-line-clamp 2
        // overflow hidden
        // text-overflow ellipsis
        // -webkit-box-orient vertical
    }
    .ctx_img{
        // height p2r(210)
        padding 0 p2r(20)
        padding-bottom p2r(20)
        img{
            width p2r(200)
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
