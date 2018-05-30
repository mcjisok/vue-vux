<template>
    <div class="drafts_con">
        <div class="topbarbox"></div>       
            <!-- <panel header="草稿箱(点击可编辑)" :list="list" type="1" ></panel>                  -->
            <ul>
                <li v-for="(items,index) in draftsList" :key="index">
                    <Drafts :content="items" @reloadDraftsList="getDraftsList"></Drafts>
                </li>
            </ul>
        <div class="navbarbox"></div>
    </div>
</template>

<script>
import Drafts from '@/components/Drafts'
export default {
    data(){
        return{

            userID:this.$store.state.nowLoginUserID,
            getDraftsListAPI:this.HOST.host + '/getDraftsList',
            list: [],
            draftsList:[],
        }
    },
    components:{
        Drafts
    },
    methods:{
        getDraftsList:function () {
            let _this = this;
            _this.$http.post(_this.getDraftsListAPI,{_id:_this.userID})
            .then((res)=>{
                console.log('草稿数据')
                console.log(res)
                _this.draftsList = res.data
                // console.log()
            })
            .catch((err)=>{

            })
        }
    },
    mounted:function () {
        this.getDraftsList();
    }
}
</script>

<style lang="stylus">
p2r(size){
    size/32 * 1rem
}
.drafts_con{
    ul{
        li{
            height 90px
            width 100%
            padding 15px
            border-bottom 1px solid #f3f4f6
        }
    }
}
</style>
