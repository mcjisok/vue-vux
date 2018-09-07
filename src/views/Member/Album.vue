<template>
    <div class="album">
        <div class="topbarbox"></div> 
        <div class="photo_list">
            <div class="img" v-for="(n,i) in imgList" :key="i">
                <!-- <img :src="host + n.path" alt="" width="100%"> -->
                <span style="font-size:20px;">...</span>
                <x-img :src="host + n.path" :webp-src="`${host + n.path}?type=webp`" @on-success="success" @on-error="error" class="ximg-demo" error-class="ximg-error" :offset="-100" container="#vux_view_box_body"></x-img>
            </div>
        </div>   
    </div>
</template>

<script>
import img from '@/assets/1.jpg'
export default {
    data(){
        return{
            host:this.HOST.host,
            defaultimg:img,
            imgList:[],

            //api
            getPhotoListInWebAPI:this.HOST.host + '/getPhotoListInWeb'
        }
    },

    methods:{
        geiPhotoList:function(){
            this.$http.post(this.getPhotoListInWebAPI,{
                userid:this.$store.state.userinfo._id
            })
            .then(res=>{
                console.log(res)
                this.imgList = res.data.list

            })
            .catch(e=>{
                console.log(e)
            })
        },

        success (src, ele) {
            console.log('success load', src)
            const span = ele.parentNode.querySelector('span')
            ele.parentNode.removeChild(span)
        },
        error (src, ele, msg) {
            console.log('error load', msg, src)
            const span = ele.parentNode.querySelector('span')
            span.innerText = 'load error'
        }
    },

    mounted:function(){
        this.geiPhotoList()
    }

}
</script>

<style lang="stylus" scoped>
p2r(size){
    size/32 * 1rem
}

.album{
    .photo_list{
        display: grid;
        grid-template-columns: p2r(639/3) p2r(639/3) p2r(639/3);         
        grid-template-rows: p2r(639/3);

        div{
            border:1px solid #f3f4f6;

        }
    }
}
</style>
