<template>
    <div class="group">
        <div class="topbarbox"></div>  
        <div class="_head">
            <p>我的分组</p>
        </div>

        <div style="margin: 10px;overflow: hidden;" v-for="item in list">
            <masker style="border-radius: 3px;" color="64,64,64" :opacity="opacity">
                <div class="m-img" :style="{backgroundImage: 'url(' + item.img + ')'}"></div>
                <div slot="content" class="m-title">
                {{item.title}}
                <br/>
                <span class="m-time">2016-03-18</span>
                </div>
            </masker>
        </div>

        <div class="_head">
            <p>热门分组</p>
        </div>

        <div style="margin: 10px;overflow: hidden;" v-for="item in list">
            <masker style="border-radius: 3px;" color="64,64,64" :opacity="opacity">
                <div class="m-img" :style="{backgroundImage: 'url(' + item.img + ')'}"></div>
                <div slot="content" class="m-title">
                {{item.title}}
                <br/>
                <span class="m-time">2016-03-18</span>
                </div>
            </masker>
        </div>
        <div class="navbarbox"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            opacity:0.6,
            list: [{
                title: '洗颜新潮流！人气洁面皂排行榜',
                img: 'http://pic.58pic.com/58pic/13/32/23/75H58PICKmx_1024.jpg'
            }, {
                title: '美容用品 & 日用品（上）',
                img: 'https://ss1.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=4ac31a85b5389b5027ffe652b534e5f1/a686c9177f3e6709b52f456437c79f3df8dc5579.jpg'
            }, {
                title: '远离车内毒气，日本车载空气净化器精选',
                img: 'http://pic.58pic.com/58pic/13/32/23/75H58PICKmx_1024.jpg'
            }]
        }
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


</style>
