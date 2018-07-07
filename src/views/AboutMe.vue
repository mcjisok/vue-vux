<template>    
    <div class="about">
        <div class="topbarbox"></div>
        <div class="logo">
            <img :src="logo" alt="" width="100%">
            <p>版本:v1.0</p>
        </div>
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
        margin-left auto 
        margin-right auto
        margin-top p2r(200)
    }
    p{
        text-align center
        font-size 14px
        color #808080
    }
}
</style>
