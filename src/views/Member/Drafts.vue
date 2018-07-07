<template>
    <div class="drafts_con">
        <div class="topbarbox"></div>       
            <!-- <panel header="草稿箱(点击可编辑)" :list="list" type="1" ></panel>                  -->
            <ul v-if="draftsList.length > 0">
                <li v-for="(items,index) in draftsList" :key="index">
                    <Drafts :content="items" @reloadDraftsList="getDraftsList"></Drafts>
                </li>
            </ul>
            <div v-else class="nodata">
                <img :src="nodataimg" width="100%"/>
            </div>
        <div class="navbarbox"></div>
    </div>
</template>

<script>
import Drafts from '@/components/Drafts'
import nodataimg from '@/assets/nodata.png'
export default {
    data(){
        return{

            userID:this.$store.state.nowLoginUserID,
            getDraftsListAPI:this.HOST.host + '/getDraftsList',
            list: [],
            draftsList:[],

            nodataimg:nodataimg
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
                // console.log(res)
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

.nodata{
    position: absolute;
    top: 50%;
    left: 50%;
    height: 30%;
    width: 50%;
    margin: -15% 0 0 -25%;
}
</style>
