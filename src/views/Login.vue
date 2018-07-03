<template>
    <div class="mcj_login">
        <div class="lg">
            <img src="../assets/lg.png" alt="" width="100%">
        </div>
        <group label-width="4.5em" label-margin-right="2em" label-align="right">
            <!-- <h1>登录页</h1> -->
            <x-input title="登录账号" placeholder="请输入用户账号" v-model="username" :required="required"></x-input>
            <x-input title="登录密码" placeholder="请输入用户密码" type="password" v-model="userpwd" :required="required"></x-input>
        </group>

        <div class="mcj_login_btnwarp">
            <flexbox>
                <flexbox-item></flexbox-item>
                <flexbox-item><x-button type="primary" @click.native="login">登录</x-button></flexbox-item>
                <flexbox-item><x-button link="/register" type="warn">注册</x-button></flexbox-item>
                <flexbox-item></flexbox-item>
            </flexbox>
        </div>
    </div>   
    
</template>

<script>
import { mapActions } from 'vuex'
import Storge from '../assets/commonjs/SetLocalStorge'
import { userInfo } from 'os';
export default {
    data(){
        return{
            username:'',
            userpwd:'',
            required:true,
            login_url:this.HOST.host + '/login'
        }
    },
    methods:{
        ...mapActions([
            'changeLogin'
        ]),
        test:function(){
            // console.log('1')
            this.$http.get(''+this.HOST.host+'/ajaxtest')
                .then(response => {  
                    console.log("获取信息成功");  
                    console.log(response);  
                }, response => {  
                    console.log("获取信息失败");  
                    console.log(response);  
            })  
        },
        login:function(){
            // console.log('点击登录按钮有反应')
            let _self = this;
            this.$http.post(''+this.HOST.host+'/login',{
                username:this.username,
                userpassword:this.userpwd
            })
            .then(res=>{
                let status = res.data.code;
                let msg = res.data.msg;
                console.log(1111111111111111111111111)
                switch (status) {
                    case 1:
                        _self.$vux.toast.show({
                            text: msg,
                            type:'warn'
                        })
                        break;
                    case 2:
                        _self.$vux.toast.show({
                            text: '登录成功',
                            type:'success',
                            onHide () {
                                console.log('登录成功之后改变state.loginuserid'+res.data)
                                // _self.changeLogin()
                                console.log(res.data)
                                Storge.set('userInfo',res.data.userinfo)        //设置本地客户端localstorge
                                _self.$store.dispatch('changeLogin',res.data)   //设置vuex全局状态
                                _self.$router.push('/home')                     //路由跳转至首页
                            }
                        })
                        break;
                    case 3:
                        _self.$vux.toast.show({
                            text: msg,
                            type:'warn'
                        })
                        break;
                }
            })
            .catch(err=>{
                console.log(21)
            })
        }
    },
    mounted:function () {
        this.test();
    }
}
</script>

<style lang="stylus" scoped>
// @function p2r($size){   
//     @return ($size/32)*1rem
// };
p2r(size){
    size/32 * 1rem
}

.mcj_login{
    padding-top: p2r(300);

    .lg{
        width p2r(300)
        margin 0 auto
    }
    .mcj_login_btnwarp{
        margin-top: p2r(50);
    }
}

</style>
