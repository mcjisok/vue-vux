<template>
    <div class="group">
        <div class="topbarbox"></div>  
        <div class="_head">
            <p>我的分组</p>
        </div>

        <div style="margin: 10px;overflow: hidden;" v-for="(item,index) in list.slice(0,maxMyGroupLength)" :key="index">
            <masker style="border-radius: 3px;" color="64,64,64" :opacity="opacity">
                <div class="m-img" :style="{backgroundImage: 'url(' +HOST+ item.groupImg + ')'}"></div>
                <div slot="content" class="m-title">
                {{item.groupName}}
                <br/>
                <span class="m-time">{{item.meta.createAt | moment('YYYY年MM月DD日 HH:mm:ss')}}</span>
                </div>
            </masker>
        </div>

        <div class="loadMore"  v-if="groupHasMore">
            <!-- <hr class="hrLine" style="width:20%"/>  XXXXX  <hr class="hrLine" style="width:80%"/> -->
            <divider>
                <p style="font-size:14px" v-if="downAndUp" @click="groupLoadMore()">更多</x-icon></p>
                <p style="font-size:14px" v-else @click="grouphide()">收起来~</p>
            </divider>
        </div>

        <div class="_head">
            <p>热门分组</p>
        </div>

        <!-- <div style="margin: 10px;overflow: hidden;" v-for="(item,index) in list" :key="index">
            <masker style="border-radius: 3px;" color="64,64,64" :opacity="opacity">
                <div class="m-img" :style="{backgroundImage: 'url(' +HOST+ item.groupImg + ')'}"></div>
                <div slot="content" class="m-title">
                {{item.groupName}}
                <br/>
                <span class="m-time">{{item.meta.createAt| moment('YYYY年MM月DD日 HH:mm:ss')}}</span>
                </div>
            </masker>
        </div> -->
        <div class="navbarbox"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            opacity:0.6,
            list: [],

            // 我的分组最多显示多少个
            maxMyGroupLength:3,
            // 热门分组最多显示多少个
            maxHotGroupLength:3,

            // API
            HOST:this.HOST.host,
            getMyGroupAPI:this.HOST.host + '/getMyGroupList'
        }
    },
    methods:{
        getMyGroupList:function(){
            let _this = this
            let myID = this.$store.state.nowLoginUserID
            this.$http.post(this.getMyGroupAPI,{
                _id:myID,
                state:true
            })
            .then(res=>{
                console.log(res)
                this.list = res.data.data.groupList
                console.log(this.list)
            })
            .catch(e=>{
                console.log(e)
            })
        },

        groupLoadMore:function(){
            this.maxMyGroupLength = this.list.length
        },    
        grouphide:function(){
            this.maxMyGroupLength = 3
        }
            
    },
    computed:{
        groupHasMore:function(){
            if(this.list.length < this.maxMyGroupLength){
                return false
            }
            else{
                return true
            }
        },

        downAndUp:function(){
            if(this.list.length > this.maxMyGroupLength){
                return true
            }
            else{
                return false
            }
        }
        
    },
    mounted:function(){
        this.getMyGroupList()
    }
}
</script>

<style lang="stylus" scope>
p2r(size){
    size/32 * 1rem
}
.navbarbox{
    height: p2r(85);
}
.group{
    ._head{
        height p2r(60)
        padding 0 p2r(20)
        p{
            line-height p2r(60)
            border-bottom:1px solid #E5E5E5
            font-size 14px
        }
    }

    .loadMore{
        height 40px;
        width 100%;
        padding 0 p2r(20)
    }
}

.m-img {
  padding-bottom: 33%;
  display: block;
  position: relative;
  max-width: 100%;
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  border-radius: 2px;
}

.m-title {
  color: #fff;
  text-align: center;
  text-shadow: 0 0 2px rgba(0, 0, 0, .5);
  font-weight: 500;
  font-size: 16px;
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
}

.m-time {
  font-size: 12px;
  padding-top: 4px;
  border-top: 1px solid #f0f0f0;
  display: inline-block;
  margin-top: 5px;
}

// .vux-x-icon {
//   fill: #d8d8d8;
// }
</style>
