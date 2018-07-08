<template>
    <div class="search">
        <div class="topbarbox"></div>


        <section class="search_input">
            <input type="search" placeholder="请输入关键词" v-model="searchContent" onsearch="searchPush()">
        </section>

        <div class="navbarbox"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            searchContent:''
        }
    },
    methods:{
        searchPush:function(){
            
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
    height 30px
    margin 0 auto
    padding 0 p2r(20)
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
