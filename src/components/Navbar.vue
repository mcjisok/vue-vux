<template>
    <div class="mcj_navbar">
        <ul>
            <li>
                <router-link to="/home/index">
                <img v-if="nowRouterPath=='/home/index'" src="../assets/icon/home1.svg" alt="">
                <img v-else src="../assets/icon/home.svg" alt="">
                </router-link>
            </li>
            <li>
                <router-link to="/home/group">
                <img v-if="nowRouterPath=='/home/group'" src="../assets/icon/find1.svg" alt="">
                <img v-else src="../assets/icon/find.svg" alt="">
                </router-link>
            </li>
            <li>
                <router-link to="/home/search">
                <img v-if="nowRouterPath=='/home/search'" src="../assets/icon/focus1.svg" alt="">
                <img src="../assets/icon/focus.svg" alt="">
                </router-link>
            </li>
            <li>
                <router-link to="/home/member">
                <transition name="fade">
                <img v-if="nowRouterPath=='/home/member'" src="../assets/icon/member1.svg" alt="">                
                <img v-else src="../assets/icon/member.svg" alt="">
                </transition>
                </router-link>
            </li>
            <!-- <li><router-link to="/shopping_cart"><img src="../assets/icon/1 (1).png" alt=""></router-link></li> -->
        </ul>
        <!-- <p>{{nowRouterPath}}</p> -->
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    computed:{
        nowRouterPath:function(){
            let path = this.$route.path
            return path;
        }
    }
}
</script>

<style lang="stylus" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

p2r(size){
    size/32 * 1rem
}

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    // -webkit-tap-highlight-color: transparent;
}
ul,ol{
    list-style: none;
}

.mcj_navbar{
    height: p2r(85);
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #fff;
    border-top: 1px solid #f3f4f6;
    ul{
        height: p2r(85);
        width: 100%;
        li{
            float: left;
            width: p2r(160);
            height: p2r(85);
            a{
                display: block;
                height: p2r(85);
                width: 100%;                
                img{
                    height: p2r(60);
                    // text-align: center;
                    margin-left: p2r(50);
                    margin-top: p2r(8);
                }
            }
        }
    }
}
</style>

