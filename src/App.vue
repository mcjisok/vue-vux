<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus">
// @function p2r($size){
//     @return ($size/32)*1rem
// }
*{
  margin: 0;
  padding: 0;
  box-sizing:border-box;
  -moz-box-sizing:border-box; /* Firefox */
  -webkit-box-sizing:border-box; /* Safari */
}
a{
  text-decoration: none;
}
@media screen and (min-width: 320px) {
    html {
      font-size: 16px;
    };
}
@media screen and (min-width: 360px) {
    html {
      font-size: 18px;
    };
}
@media screen and (min-width: 375px) {
    html {
      font-size: 18.75px;
    };
}
@media screen and (min-width: 412px) {
    html {
      font-size: 20.6px;
    };
}
@media screen and (min-width: 414px) {
    html {
      font-size: 20.7px;
    };
}


/* 页面公共样式 基于vux组件修改的样式 */

.topbarbox{
    height: 46px;
}
.navbarbox{
    height: p2r(85);
}

</style>
