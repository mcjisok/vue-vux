<template>
    <div class="search">
        <div class="topbarbox"></div>

        <div>
            <tab :active-color="color">
                <tab-item selected @on-item-click="onItemClick">标签</tab-item>
                <tab-item @on-item-click="onItemClick">分组</tab-item>
                <tab-item @on-item-click="onItemClick">用户</tab-item>
                <tab-item @on-item-click="onItemClick">动态</tab-item>
            </tab>
        </div>
        <section class="search_input">
            <input type="search" :placeholder="searchPlaceholder" v-model="searchContent" onsearch="searchPush()">
        </section>

        <div class="navbarbox"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            // tab样式
            color:'#66cccc',
            searchContent:'',

            currentTab:0
        }
    },
    computed:{
        searchPlaceholder:function(){
            switch (this.currentTab)
            {
                case 0:
                return '请输入标签名称'
                break;
                case 1:
                return '请输入分组名称'
                break;
                case 2:            
                return '请输入用户名称'
                break;
                case 3:
                return '请输入动态内容'
                break;
            }
        }
        
        
    },
    methods:{
        searchPush:function(){
            
        },
        onItemClick:function(e){
            this.currentTab = e
        }
    }
}
</script>

<style lang="stylus" scoped>
p2r(size){
    size/32 * 1rem
}

.search_input{
    width 100%
    margin 0 auto
    padding p2r(20)
    input[type=search] {
        -webkit-appearance: textfield;
    }
    input::-webkit-search-decoration,
    input::-webkit-search-cancel-button {
        display: none;
    }
    input{
        outline-color: invert ;  
        outline-style: none ;  
        outline-width: 0px ;  
        border:1px solid #ddd;
        text-shadow: none ;  
        -webkit-appearance: none ;  
        -webkit-user-select: text ;  
        outline-color: transparent ;  
        box-shadow: none;  
        width 100%
        height 28px
        border-radius 10px
        padding 0 15px
        transition: border linear 0.15s,box-shadow linear 0.15s,width .5s;
        -moz-transition:border linear 0.15s,box-shadow linear 0.15s,width .5s;
        -webkit-transition:border linear 0.15s,box-shadow linear 0.15s,width .5s;
    }
    input:focus{
        outline: 0;
        border: 1px solid #66cccc;
        box-shadow: 0px 0px 5px 0px #66cccc;
        // width 80%            
        
    }
}
</style>
