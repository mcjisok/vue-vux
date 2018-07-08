<template>    
    <div class="about">
        <div class="topbarbox"></div>
        <div class="logo">
            <img :src="logo" alt="" width="100%">
            <p>版本:v1.0</p>
        </div>
        <group>
        <cell title="官方微信" value="m101flymer"></cell>
        <cell title="官方网址" value="www.flymer.net"></cell>
        <cell title="客服QQ" value="353750533"></cell>
        <cell title="版权所有" value="Copyright 2018 by mcj"></cell>
        </group>

        <div class="navbarbox"></div>
    </div>
</template>

<script>
import lg from '@/assets/lg.png'
export default {    
    data(){
        return{
            logo:lg
        }
    }
}
</script>

<style lang="stylus" scoped>
p2r(size){
    size/32 * 1rem
}

.about{
    .logo{
        width p2r(300)
        margin p2r(200) auto p2r(100) auto
    }
    p{
        text-align center
        font-size 14px
        color #808080
    }
}
</style>
