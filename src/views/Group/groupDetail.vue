<template>
    <div class="groupDetail">
        <div class="topbarbox"></div>  
        
        <masker style="border-radius: 3px;" color="64,64,64" :opacity="opacity">
            <div class="m-img" :style="{backgroundImage: 'url(' +HOST+ detail.groupImg + ')'}"></div>            
        </masker>

        <pushlist 
            :pushlist="pushlist" 
            :loadingShow="loadingShow" 
            :loadmoreSW="loadmoreSW" 
            :hasMore="hasMore" 
            :pushListTitle="detail.groupName"
            @comment="renewComment"
            @loadMore="renewPush">
        </pushlist>

        <div class="navbarbox"></div>
        
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import PushList from '@/components/Home/PushList'
export default {
    
    data(){
        return{
            // 组件参数
            opacity:0.6,

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

            // id:
            groupID:this.$route.params.id,

            // 分组信息数据
            detail:[],

            // API
            HOST:this.HOST.host,
            getGroupDetailAPI:this.HOST.host+'/getGroupDetail',
            getGroupPushListAPI:this.HOST.host + '/getGroupPushList'
        }
    },
    components:{
        pushlist:PushList,
    },
    methods:{
        ...mapActions([
            'setGroupID'
        ]),
        getdata:function(){
            let _this = this
            this.$http.post(this.getGroupDetailAPI,{
                _id:_this.groupID
            })
            .then(res=>{
                console.log(res.data.pushList)
                _this.detail = res.data.groupDetail
            })
            .catch(e=>{

            })
        },
        setState:function(){
            this.$store.dispatch('setGroupID',{ID:this.groupID})
        },

        loadmore(){
            // this.lilength.push(1)
            // console.log(this.page)
            if(this.hasMore){
                this.page ++;            
                let _this = this;
                this.$http.post(this.getGroupPushListAPI,{
                    page:_this.page,
                    groupID:_this.groupID
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

    // 获取当前groupid，设置为全局状态groupid
    
    beforeMount:function(){
        this.getdata();
        this.setState();
    },
    mounted:function(){
        this.loadmore()
        
    }
}
</script>

<style lang="stylus" scoped>
.topbarbox{
    height: 46px;
}
.navbarbox{
    height: p2r(85);
}
</style>
