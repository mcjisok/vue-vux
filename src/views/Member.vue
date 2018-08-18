<template>
    <div class="member">
        <div class="topbarbox"></div>            
        <div class="member_warp">
            <blur :blur-amount=40 :url="this.HOST.host + url" :height="blur_height">
                <p class="center"><img :src="this.HOST.host + url"></p>
                <!-- <p class="member_name">用户名称</p> -->
            </blur>
            <group>
                <cell is-link >
                    <span slot="title" style="color:green;"><span style="vertical-align:middle;">消息</span><badge text="1"></badge></span>
                    <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/icon/msg.png">                    
                </cell>
                <cell title="我的动态" is-link>
                    <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/icon/tag.png">
                </cell>
                <cell title="我的相册" is-link>
                    <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/icon/photo.png">
                </cell>
                <cell is-link link="/home/drafts">
                    <span slot="title"><span style="vertical-align:middle;">草稿箱</span> <badge text="1"></badge></span>                    
                    <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/icon/tag.png">
                </cell>
                <cell title="编辑资料" is-link link="/home/setting">
                    <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/icon/setting.png">
                </cell>
                <cell title="关于我们" is-link link="/home/about">
                    <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/icon/about.png">
                </cell>
            </group>
        </div>
        <div class="navbarbox"></div>
    </div>
</template>

<script>
import { Blur } from 'vux'
import { Badge } from 'vux'
export default {
    data(){
        return{
            blur_height:150,
            url: this.$store.state.userinfo.userInfoPhoto,
            title:'用户中心',
        }
    },
    components: {
        Blur,
        Badge
    }
}
</script>

<style lang="stylus" scoped>
.member_warp{
    .center {
        text-align: center;
        padding-top: 20px;
        color: #fff;
        font-size: 18px;
        img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 4px solid #ececec;
        }
    }
    
}
</style>
