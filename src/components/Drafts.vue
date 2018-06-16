<template>
    <div>
        <a style="drafts">
            <div class="imgbox">
                <!-- <router-link :to="'/home/push/'+content._id"> -->
                    <img :src="content.pushImageList[0]?this.HOST.host+content.pushImageList[0]:default_img" alt="">
                <!-- </router-link>             -->
            </div>
            <div class="drafts_warp" @click="editPush()">
                <!-- <router-link :to="'/home/push/'+content._id">                 -->
                    <h4>{{content.pushTitle}}</h4>
                    <p>{{content.pushContent}}</p>
                <!-- </router-link> -->
            </div>
            <div class="drafts_del">
                <a href="javascript:;" @click="confirValue = !confirValue">
                    <img src="../assets/icon/del.png" width="30" alt="">
                </a>
            </div>
        </a>
        <confirm v-model="confirValue" title="是否删除" @on-confirm="del_drafts(content._id)">
            <p style="text-align:center;">确定咩？</p>
        </confirm>
    </div>
    
</template>

<script>
import { mapActions } from 'vuex'

export default {
    props:[
        'content'
    ],
    data(){
        return{
            confirValue:false,
            default_img:'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',

            delPushAPI:this.HOST.host + '/delPush'
        }
    },
    methods:{
        ...mapActions([
            'editPush'
        ]),
        editPush:function(){
            this.$store.dispatch('editPush',this.content)
            this.$router.push('/home/push/'+this.content._id)
        },
        del_drafts:function(id){
            let _this = this
            let pushID = id
            let userID = this.$store.state.nowLoginUserID

            this.$http.post(this.delPushAPI,{
                _id:pushID,
                userID:userID
            })
            .then(res=>{
                console.log('删除成功')
                _this.$vux.toast.show({
                    text: '删除成功',
                    type:'success',
                    onHide () {                            
                        // _this.$router.go(0)
                        _this.$emit('reloadDraftsList')
                    }
                })
            })
            .catch(e=>{
                console.log('删除失败')
            })

        }
    },
    mounted:function(){
        console.log(this.content)
    }
}
</script>

<style lang="stylus" scoped>
a{
    height 60px
    width 100%
    display block
    position relative
    .imgbox{
        // margin-right: ;
        width: 60px;
        height: 60px;
        line-height: 60px;
        float left
        // text-align: center;
        img{
            width: 100%;
            max-height: 100%;
            vertical-align: top;
        }
    }
    .drafts_warp{
        width 80%
        height 60px
        line-height 30px
        position relative
        padding-left 75px
        h4{
            color #000;
            font-weight 400
            font-size: 17px
            width auto
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            word-wrap normal
            word-wrap break-word
            word-break break-all
        }
        p{
            color: #999999;
            font-size: 13px;
            line-height: 1.2;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
        }
    }
    .drafts_del{
        width 18%
        position absolute
        top 0
        right 0
        a{
            // line-height 60px
            text-align center
            padding-top 15px
        }
        
    }
}
</style>
