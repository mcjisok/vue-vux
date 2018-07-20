<template>
    <div class="searchResult">
        <div class="topbarbox"></div>

        <section class="search_input">
            <input type="search" :placeholder="searchPlaceholder" v-model="searchContent" v-on:search="searchPush">
        </section>
        <section class="nodata" v-if="hasResult">
            <img :src="nodataimg" width="100%" alt="">
        </section>
        <section class="resultList" v-else>
            <div class="resultListWarp">
                <ul v-if="currentTab === 0">
                    <li v-for="n in 13">
                        <div class="resultListCon">
                            <div class="left">
                                <img :src="nodataimg" width="100%" height="100%" alt="">
                            </div>
                            <div class="right">
                                <span>push标题push标题push标题push标题</span>
                                <p>push内容push内容push内容push内容push内容push内容push内容push内容</p>
                            </div>
                        </div>
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
            currentTab:this.$route.query.searchType,

            resultList:'',
            hasResult:false,

            // API
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
                console.log(res)
                if(res.data.code === 200){
                    _this.hasResult = false;
                    _this.resultList = res.data
                }
                else if(res.data.code === 400){
                    _this.hasResult = true;

                }
            }).catch(e=>{
                console.log(e)
            })
        },

        searchPush:function(){
            console.log('test')
        }
    },
    mounted:function(){
        this.getSearchResult();
    }
}
</script>

<style lang="stylus" scoped>
p2r(size){
    size/32 * 1rem
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
