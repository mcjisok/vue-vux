<template>
    <div class="searchResult">
        <div class="topbarbox"></div>

        <section class="search_input">
            <input type="search" :placeholder="searchPlaceholder" v-model="searchContent" v-on:search="searchPush">
        </section>
        <section class="nodata" v-if="nodata">
            <img :src="nodataimg" width="100%" alt="">
        </section>
        <section class="resultList" v-else>
            <div class="resultListWarp">
                <!-- 显示根据标签搜索push的结果pushlist -->
                <ul v-if="currentTab === 0">
                    <li v-if="resultList.pushlist" v-for="(n,index) in resultList.pushlist" :key="index">
                        <router-link :to="'/home/pushdetail/'+n._id" style="color:#000">
                            <div class="resultListCon">
                                <div class="left">
                                    <img :src="n.pushImageList[0]?HOST + n.pushImageList[0]:nodataimg" width="100%" height="100%" alt="">
                                </div>
                                <div class="right">
                                    <span>{{n.pushTitle}}</span>
                                    <p>{{n.pushContent}}</p>
                                </div>
                            </div>
                        </router-link>
                    </li>
                </ul>
                <!-- 显示根据分组名称搜索的分组信息 -->
                <ul v-if="currentTab === 1">
                    <li v-if="resultList.grouplist" v-for="(n,index) in resultList.grouplist" :key="index">
                        <router-link :to="'/home/groupdetail/' + n._id" style="color:#000">
                            <div class="resultListCon">
                                <div class="left">
                                    <img :src="HOST + n.groupImg" width="100%" height="100%" alt="">
                                </div>
                                <div class="right">
                                    <span>分组名称：{{n.groupName}}</span>
                                    <p>分组描述：{{n.groupDescription}}</p>
                                </div>
                            </div>
                        </router-link>
                    </li>
                </ul>
                <!-- 显示根据用户名称搜索到的用户信息 -->
                <ul v-if="currentTab === 2">
                    <li v-if="resultList.userlist" v-for="(n,index) in resultList.userlist" :key="index">
                        <div class="resultListCon">
                            <div class="left">
                                <img :src="n.userInfoPhoto?HOST + n.userInfoPhoto:nodataimg" width="100%" height="100%" alt="">
                            </div>
                            <div class="right">
                                <span>用户名称：{{n.name}}</span>
                                <p>性别：未知</p>
                            </div>
                        </div>
                    </li>
                </ul>
                <!-- 显示根据关键词搜索到的pushlist列表 -->
                <ul v-if="currentTab === 3">
                    <li v-if="resultList.pushlist" v-for="(n,index) in resultList.pushlist" :key="index">
                        <router-link :to="'/home/pushdetail/'+n._id" style="color:#000">
                            <div class="resultListCon">
                                <div class="left">
                                    <img :src="n.pushImageList[0]?HOST + n.pushImageList[0]:nodataimg" width="100%" height="100%" alt="">
                                </div>
                                <div class="right">
                                    <span>{{n.pushTitle}}</span>
                                    <p>{{n.pushContent}}</p>
                                </div>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </section>
        <div class="navbarbox"></div>        
    </div>
</template>

<script>
import nodataimg from '@/assets/nodata.png'
export default {
    data(){
        return{
            searchType:this.$route.query.searchType,
            searchContent:this.$route.query.searchContent,
            currentTab:Number(this.$route.query.searchType),//....我也不知道为什么这里加了个number就处理了一个不知名bug

            resultList:'',
            nodata:false,

            // API
            HOST:this.HOST.host,
            getSearchResultAPI:this.HOST.host + '/getSearchResult',
            getHotSearchListAPI:this.HOST.host + '/getHotSearchList',

            // 其他
            nodataimg:nodataimg

        }
    },
    computed:{
        searchPlaceholder:function(){
            switch (this.currentTab)
            {
                case 0:
                return '请输入标签名称'
                break;
                case 1:
                return '请输入分组名称'
                break;
                case 2:            
                return '请输入用户名称'
                break;
                case 3:
                return '请输入动态内容'
                break;
            }
        }
    },
    methods:{
        getSearchResult:function(){
            console.log(this.searchType,this.searchContent)
            let _this = this;
            this.$http.get(this.getSearchResultAPI,{
                params:{
                    searchType:_this.searchType,
                    searchContent:_this.searchContent
                }                
            }).then(res=>{
                console.log(res,res.data.msg)
                if(res.data.code === 200){
                    
                    _this.nodata = false;
                    _this.resultList = res.data
                }
                else if(res.data.code === 400){
                    _this.nodata = true;

                }
            }).catch(e=>{
                console.log(e)
            })
        },

        searchPush:function(){
            console.log('test')
        }
    },
    beforeCreate:function(){
        console.log('装载之前！！')
    },
    mounted:function(){
        this.getSearchResult();
        console.log('页面开始装载！！！')
    }
}
</script>

<style lang="stylus" scoped>
p2r(size){
    size/32 * 1rem
}
a{
    text-decoration none;
}

.search_input{
    width 100%
    margin 0 auto
    padding p2r(20)
    input[type=search] {
        -webkit-appearance: textfield;
    }
    input::-webkit-search-decoration,
    input::-webkit-search-cancel-button {
        display: none;
    }
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
}

.nodata{
    position: absolute;
    top: 50%;
    left: 50%;
    height: 30%;
    width: 50%;
    margin: -15% 0 0 -25%;
}

.resultList{
    .resultListWarp{
        color #ccc
        padding p2r(20)
        border-top 1px solid #f3f4f6
        .resultListCon{
            width 100%
            height p2r(150)
            background-color #f3f4f6
            margin-bottom p2r(20)
            border-radius p2r(20)
            padding-top p2r(15)
            padding-left p2r(15)

            .left{
                width p2r(120)
                height p2r(120)
                border 1px soild #ccc
                float left
            }
            .right{
                width p2r(450)
                height p2r(120)
                float left
                padding-left p2r(20)
                span{
                    font-size 14px
                    display -webkit-box
                    -webkit-line-clamp 1
                    overflow hidden
                    text-overflow ellipsis
                    -webkit-box-orient vertical    
                    margin-bottom p2r(25)
                }
                p{
                    font-size 14px
                    display -webkit-box
                    -webkit-line-clamp 2
                    overflow hidden
                    text-overflow ellipsis
                    -webkit-box-orient vertical    
                    line-height 16px 
                }
            }
        }
    }
}
</style>
