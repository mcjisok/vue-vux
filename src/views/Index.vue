<template>
    <div class="indexPage">
        <div class="topbarbox"></div>            
        <swiper :list="demo01_list" v-model="demo01_index" :loop="isloop" :auto="isauto"></swiper>
        <!-- <panel header="我的圈子" :footer="footer" :list="list" :type="type" ></panel> -->
        <pushlist></pushlist>
        <div class="navbarbox"></div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import PushList from '@/components/Home/PushList'

const baseList = [{
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
  title: '送你一朵fua'
}, {
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
  title: '送你一辆车'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/5.jpg', // 404
  title: '送你一次旅行',
  fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
}]
export default {
    data(){
        return{
            pageTitle:'首页',
            demo01_list: baseList,
            demo01_index:0,
            isloop:true,
            isauto:true,
            type:'4',
            list: [{
                src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                title: '标题二',
                desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
                url: {
                path: '/component/radio',
                replace: false
                },
                meta: {
                source: '来源信息',
                date: '时间',
                other: '其他信息'
                }
            }, {
                src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                title: '标题二',
                desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
                url: {
                path: '/component/radio',
                replace: false
                },
                meta: {
                source: '来源信息',
                date: '时间',
                other: '其他信息'
                }
            }, {
                src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                title: '标题二',
                desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
                url: {
                path: '/component/radio',
                replace: false
                },
                meta: {
                source: '来源信息',
                date: '时间',
                other: '其他信息'
                }
            },{
                src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                title: '标题二',
                desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
                url: {
                path: '/component/radio',
                replace: false
                },
                meta: {
                source: '来源信息',
                date: '时间',
                other: '其他信息'
                }
            }],
            footer: {
                title: 'more',
                url: 'http://vux.li'
            },
        }
    },
    components:{
        pushlist:PushList
    },
    methods:{
        onImgError (item, $event) {
            console.log(item, $event)
        },
        show:function(){
            console.log(this.a)
        }
    },
    computed:mapState({
        a:state => state.nowLoginUsername
    }),
    mounted:function () {
        // this.show();
    }
}
</script>

<style lang="stylus" scoped>
p2r(size){
    size/32 * 1rem
}
.navbarbox{
    height: p2r(85);
}
</style>
