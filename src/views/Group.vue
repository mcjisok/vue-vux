<template>
    <div class="addNewGroup">
        <div class="topbarbox"></div>    
            <group label-width="4.5em" label-margin-right="2.5em" label-align="left">
                <!-- <cell title="修改头像" @click.native.stop="openFile">        
                    <input type="file" @change="fileChange" style="display: none" ref="file" multiple="multiple">
                    <i class="fa fa-file"></i>
                    <x-icon type="ios-plus-empty" size="30"></x-icon>
                </cell> -->
                <x-input title="组的名称:" placeholder="请输入名称" v-model="name"></x-input>
                <x-input title="组长:" placeholder="请输入手机号码" type="number" v-model="usermobile"></x-input>
                <x-input title="组的描述:" placeholder="请输入邮描述" type="email" is-type="email" v-model="usermail"></x-input>
                <!-- <x-address title="你的城市:" v-model="addressValue" :list="addressData"  placeholder="请选择地址" value-text-align="left"></x-address> -->
                <cell title="组长:" value="普通用户" ></cell>
            </group>

        <div class="navbarbox"></div>
                
    </div>
</template>

<script>
export default {
    data(){
        return{
            groupName:'',
            groupLeader:'',
            groupDescription:'',


        }
    }
}
</script>

<style lang="stylus">

</style>
