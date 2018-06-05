<template>
    <div class="comment">
        <div class="comment_input">
            <input type="text" :placeholder="placeholder" @focus="focusInput()" @blur="blurInput()" v-model="commentContent" v-bind:class=" {inputOnFocus:submitBtn||comment_content_is_empty}" v-focus="focusStatus">
            <transition name="fade">
                <div class="submit_btn" v-if="submitBtn||comment_content_is_empty">
                    <input type="button" value="评论" @click="saveComment()">
                </div>
            </transition>
        </div>

        <div class="comment_list" v-if="local_comment.length > 0">
            <div class="cl_head">
                <img src="../commonimg/liutan.png" alt="" width="25">
                <p>留言区</p>
            </div>
            <div class="cl_warp">
                <ul>
                    <li>
                        <div class="cl_con" v-for="(item,i) in local_comment" :key="i">
                            <div class="userInfo">
                                <div class="InfoImg">
                                    <img :src="host + item.from.userInfoPhoto" alt="" width="30" height="30">
                                </div>

                                <div class="InfoName">
                                    <!-- <router-link>用户名称</router-link> -->
                                    <a href="javascript:;">{{item.from.name}}</a>
                                    <p>2018年5月31日21:24:00</p>                                    
                                </div>

                                <div class="InfoNice">
                                    <a href="javascript:;" class="niceIcon" @click="reply(item.from.name,item.from._id,item._id)"></a>                                    
                                </div>

                                <div class="bothClear"></div>
                            </div>
                            <div class="commentText">
                                <p>{{item.content}}</p>
                            </div>

                            <div class="replyList" v-for="(n,i) in item.reply.slice(0,3)" :key="i" v-if="item.reply.length > 0">
                                <div class="reply_content">
                                    <p>
                                        {{n.from.name}} 回复 {{n.to.name}}:{{n.content}}
                                    </p>
                                    <div class="reply_icon">
                                        <span @click="reply(n.from.name,n.from._id,item._id)"></span>                                    
                                    </div>
                                </div>
                                    
                                

                                <div class="bothClear"></div>
                                
                            </div>
                            
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        
    </div>
</template>

<script>
// import liuyanicon from '@/assets/icon/liuyan.png'
export default {
    props:[        
        'pushID',
        'fromID',//userID   
        'comment',
        'pushIndex'  

    ],
    directives: {
        focus: {
            update: function (el, {value}) {
                if (value) {
                el.focus()
                }
            }
        },
    },
    data(){
        return{
            submitBtn:false,
            isFocus:true,
            placeholder:'点击评论...',
            
            // postdata
            commentID:'',
            commentContent:'',

            replyFromID:'',
            replyToId:'',
            replyContent:'',

            focusStatus:false,
            // hasreply:true,

            // local obj
            local_comment:[],
            local_comment:this.comment,
            local_pushIndex:this.pushIndex,

            // API
            saveCommentAPI:this.HOST.host + '/saveComment',
            host:this.HOST.host
            

        }
    },
    computed:{
        // 用于判断评论输入框中是否有内容，如果有则为true
        comment_content_is_empty:function(){
            if(this.commentContent === ''){
                return false
            }
            else{
                return true
            }
        }
    },
    // 通过监听属性，来监听父组件传进来的props，如果props动态更新了，子组件的本地数据也更新
    watch:{
        comment:function(){
            this.local_comment = this.comment            
        }
    },
    methods:{
        focusInput:function() {
            console.log('获得焦点')
            // if(this.comment_content !== '')
            this.submitBtn = !this.submitBtn  
        },
        blurInput:function(){
            console.log('失去焦点')
            // if(this.comment_content === ''){
            this.submitBtn = !this.submitBtn    
        },
        saveComment:function(){
            let _this = this;
            if(_this.commentContent !== ''){
                this.$http.post(this.saveCommentAPI,{
                    cid:_this.commentID,
                    push:_this.pushID,
                    from:_this.fromID,
                    to:_this.replyToId,
                    content:_this.commentContent
                })
                .then(res=>{
                    console.log(res)
                    // _this.local_comment.unshift(res.data.data)
                    // _this.local_comment = _this.local_comment.slice(0,3)
                   
                    if(res.data.code === 200 ){
                        _this.$vux.toast.show({
                            text: '评论成功',
                            type:'success',
                            onHide () {                            
                                // _this.$router.push('/home/index')
                                _this.commentContent = ''
                                _this.placeholder = '点击评论...',                                
                                _this.$emit('reply',{res:res,key:_this.pushIndex})                                
                            }
                        })
                    }
                })
                .catch(e=>{
                    console.log(e)
                })
            }            
        },
        reply:function(name,toID,commentID){
            let _this = this
            console.log(name,toID,commentID)
            _this.placeholder = '回复'+name+':'
            _this.replyToId = toID
            _this.commentID = commentID
            this.focusStatus = true       
        },
        focusStatusToFalse:function(){
            this.focusStatus = false
            this.placeholder = '点击评论...'
            this.commentID = ''
            // console.log('1111')
        }
        
    },
    mounted:function(){
        window.addEventListener('scroll', this.focusStatusToFalse)
    }
}
</script>

<style lang="stylus">
p2r(size){
    size/32 * 1rem
}

.comment{
    margin-bottom:p2r(15)
    .comment_input{        
        width 100%
        height 30px
        margin 0 auto
        padding 0 p2r(20)
        // border-radius 5px
        
        input{
            outline-color: invert ;  
            outline-style: none ;  
            outline-width: 0px ;  
            border:1px solid #ddd;
            text-shadow: none ;  
            -webkit-appearance: none ;  
            -webkit-user-select: text ;  
            outline-color: transparent ;  
            box-shadow: none;  
            width 100%
            height 28px
            border-radius 10px
            padding 0 15px
            transition: border linear 0.15s,box-shadow linear 0.15s,width .5s;
            -moz-transition:border linear 0.15s,box-shadow linear 0.15s,width .5s;
            -webkit-transition:border linear 0.15s,box-shadow linear 0.15s,width .5s;
        }
        input:focus{
            outline: 0;
            border: 1px solid #66cccc;
            box-shadow: 0px 0px 5px 0px #66cccc;
            // width 80%            
            
        }
        .inputOnFocus{
            width 80%
        }
    }
    .submit_btn{
        width 20%
        // height 30px
        position relative
        top -30px
        left 82%

        input[type=button]{
            width p2r(100)
            height 30px
            border-radius 10px
            background #66cccc
            border none
            color #fff
        }
        input[type=button]:focus{
            background #66cccc
            
        }
    }

    .comment_list{
        width 100%
        padding p2r(10) p2r(20)

        .cl_head{
            // background-image url('@/commonimg/liuyan.png')
            // background-size 30px 30px
            img{
                width 30px
                height 30px
                float left
            }
            p{
                font-size 14px
                color #bbb
                line-height 30px   
                padding-left 35px     
            }            
        }
        .cl_warp{
            .cl_con{
                // border 1px solid #66cccc
                .userInfo{
                    position relative
                    .InfoImg{
                        width p2r(80)
                        height 40px
                        float left
                        padding 5px 0px
                        img {
                            display inline
                            line-height 40px
                        }
                    }
                    .InfoName{
                        width p2r(480)
                        height 40px
                        float left
                        font-size 12px
                        padding 5px 0
                        a{
                            line-height 15px
                            color #989898
                        }
                        p{
                            line-height 15px
                            color #989898
                        }
                    }
                    .InfoNice{
                        width p2r(40)
                        height 40px
                        float left
                        padding 10px 0px                      
                        
                        .niceIcon{                            
                            width 20px
                            height 20px
                            display block
                            position relative
                            background-image url('../commonimg/reply.png')
                            background-size 20px 20px
                            
                        }
                    }
                }
                .commentText{
                    padding p2r(20) p2r(50) p2r(20) p2r(80)
                    // margin-top p2r(10)
                    // margin-bottom p2r(20)
                    // background-color #f5ffff
                    
                    p{
                        word-wrap:break-word
                        font-size 14px
                        color #333     
                        display -webkit-box
                        -webkit-line-clamp 2
                        overflow hidden
                        text-overflow ellipsis
                        -webkit-box-orient vertical                  
                    }
                }
                .replyList{
                    margin-left p2r(80)
                    // width 85%
                    width p2r(500)
                    display block
                    // padding p2r(5) 0
                    background-color #f3f4f6
                    padding p2r(20) p2r(0) p2r(20) p2r(0)
                    
                    
                    .reply_content{
                        width p2r(560)
                        padding-left p2r(20)                        
                        
                        p{
                            margin-right p2r(30)
                            width p2r(400)
                            // height 28px
                            font-size 12px
                            color #333      
                            display -webkit-box
                            -webkit-line-clamp 2
                            overflow hidden
                            text-overflow ellipsis
                            -webkit-box-orient vertical   
                            float left                                       
                        }
                        .reply_icon{
                            width 25px
                            height 25px
                            float left
                            // position relative
                            top -25px
                            left p2r(440)
                            span{
                                width 20px
                                height 20px
                                display block
                                background-image url('../commonimg/reply1.png')
                                background-size 20px 20px
                            }
                        }
                    }
                    
                    
                }
            }
        }
    }
}

.fade-enter-active{
  transition: opacity .5s;
}
.fade-leave-active{
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
