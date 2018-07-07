<template>
    <div class="mcj_register">
        <group label-width="4.5em" label-margin-right="2em" label-align="right">
            <!-- <h1>注册页</h1> -->
            <!-- <x-input title="昵称:" placeholder="请输入昵称" v-model="name"></x-input> -->
            <x-input title="登录账号" placeholder="请输入用户账号" v-model="username" :required="required"></x-input>
            <x-input title="登录密码" placeholder="请输入用户密码" type="password" v-model="userpwd" :required="required"></x-input>
        </group>

        <div class="mcj_login_btnwarp">
            <flexbox>
                <flexbox-item></flexbox-item>
                <flexbox-item><x-button type="primary" @click.native="register()">注册</x-button></flexbox-item>
                <flexbox-item></flexbox-item>
            </flexbox>
        </div>
        <!-- <div v-transfer-dom>
            <alert v-model="show" title="恭喜您"> 注册成功！</alert>
        </div> -->
    </div>   
</template>

<script>
export default {
    data(){
        return{
            name:'',
            username:'',
            userpwd:'',
            required:true,
            reg_url: this.HOST.host + '/api/register',
        }
    },
    methods:{
        register:function(){
            let _self = this;
            if(this.username !== '' && this.userpwd !== ''){
                this.$http.post(this.reg_url,{
                    // name:this.name,
                    username:this.username,
                    userpassword:this.userpwd
                })
                .then(res => {
                    // console.log(res)
                    if(res.data.code === 200){
                        this.$vux.alert.show({
                            title: '恭喜您注册成功！',
                            content: '确定(将前往登录页面)',
                            onShow () {
                            },
                            onHide () {
                                _self.$router.push('/login')
                            }
                        })
                    }
                    else if(res.data.code === 404){
                        this.$vux.toast.show({
                            text: '用户已存在！',
                            type:'warn'
                        })
                    }
                }), res => {  
                    console.log("获取信息失败");  
                    console.log(res);  
                }            
            }
            else{
                this.$vux.toast.show({
                    text: '请输入用户名或密码',
                    type:'cancel'
                })
            }
            
        }
    }
}
</script>

<style lang="stylus" scoped>
p2r(size){
    size/32 * 1rem
}

.mcj_register{
    padding-top:p2r(300);
    .mcj_login_btnwarp{
        margin-top: p2r(50);
    }
}

</style>
