<template>
    <div class="setting">
        <div class="topbarbox"></div>      
            <div class="userPhoto">
                <img :src="tx_url?tx_url:defaultTX" alt="" width="150" height="150">
            </div>     
            <group label-width="4.5em" label-margin-right="2.5em" label-align="left">
                <cell title="修改头像" @click.native.stop="openFile">        
                    <input type="file" @change="fileChange" style="display: none" ref="file" multiple="multiple">
                    <i class="fa fa-file"></i>
                    <x-icon type="ios-plus-empty" size="30"></x-icon>
                </cell>
                <x-input title="你的昵称:" placeholder="请输入昵称" v-model="name"></x-input>
                <popup-radio title="你的性别:" :options="sexGroup" v-model="sex"></popup-radio>  
                <x-textarea title="个性签名:" v-model="describe"></x-textarea>              
                <x-input title="手机号码:" placeholder="请输入手机号码" type="number" v-model="usermobile"></x-input>
                <x-input title="邮箱地址:" placeholder="请输入邮箱地址" type="email" is-type="email" v-model="usermail"></x-input>
                <x-address title="你的城市:" v-model="addressValue" :list="addressData"  placeholder="请选择地址" value-text-align="left"></x-address>
                <cell title="账号等级:" value="普通用户" ></cell>
            </group>
            <x-button type="primary" @click.native="saveMsg = !saveMsg">保存</x-button>
        <div class="navbarbox"></div>
        <!-- <div v-transfer-dom> -->
        <confirm v-model="saveMsg" title="是否保存" @on-confirm="saveUserInfo">
            <p style="text-align:center;">确定咩？</p>
        </confirm>
        <!-- </div> -->
    </div>
</template>

<script>
import { XAddress,ChinaAddressV4Data } from 'vux'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import defaultTX from '@/assets/defaulttx.svg'

export default {
    data(){
        return{
            imgData: {  
                accept: 'image/gif, image/jpeg, image/png, image/jpg',  
            },
            // userID:this.$state.nowLoginUserID,
            username:'',
            name:this.$store.state.userinfo.name,
            usermobile:this.$store.state.userinfo.usermobile,
            usermail:this.$store.state.userinfo.useremail,
            userInfoPhoto:this.$store.state.userinfo.userInfoPhoto,
            sex: this.$store.state.userinfo.sex,
            sexGroup: ['男','女'],
            describe:this.$store.state.userinfo.describe,//个性签名
            // tx_url:this.HOST.host + this.userInfoPhoto,
            required:true,

            // uploadAPI
            uploadUserInfoImgAPI:this.HOST.host + '/uploadUserInfoImg',
            saveUserInfoAPI:this.HOST.host + '/saveUserInfo',

            // 地址板块
            addressData: ChinaAddressV4Data,
            // title:'你的城市',
            addressValue:this.$store.state.userinfo.userAddress,

            // 是否提交保存资料
            saveMsg:false,

            //默认头像
            defaultTX:defaultTX

            
        }
    },
    components:{
        XAddress
    },
    computed:{
        tx_url:function(){
            if(this.userInfoPhoto === ''){
                return ''
            }
            else{
                return this.HOST.host + this.userInfoPhoto                
            }
        },

        
    },
    methods:{
        ...mapActions([
            'refreshUserinfo'
        ]),
        openFile(){
            this.$refs.file.click();
        },
        fileChange(event){
            let _this = this
            // console.log('1')
            // console.log(event)
            
            let reader =new FileReader();  
            let img1=event.target.files[0];  
            let type=img1.type;//文件的类型，判断是否是图片  
            let size=img1.size;//文件的大小，判断图片的大小 
            if(this.imgData.accept.indexOf(type) == -1){  
                alert('请选择我们支持的图片格式！');  
                return false;  
            };
            if(size>2097152){  
                alert('请选择2M以内的图片！');  
                return false;  
            }; 
            let url ='';
            let form = new FormData();
            form.append('file',img1,img1.name);  
            this.$http.post(this.uploadUserInfoImgAPI,form,{
                headers:{'Content-Type':'multipart/form-data'} 
            })
            .then(res=>{
                console.log(res)
                _this.userInfoPhoto = res.data
                // console.log(_this.userInfoPhoto )
                _this.$vux.toast.show({
                    text: '修改成功',
                    type:'text',
                    position:'middle'
                })
            })
            .catch(error =>{
                alert('图片上传出错！')
            })
                       
        },
        saveUserInfo(){
            // console.log(1)
            let _this = this
            let data = {
                _id:_this.$store.state.nowLoginUserID,
                user:{
                    name:_this.name,
                    usermobile:_this.usermobile,
                    useremail:_this.usermail,
                    userInfoPhoto:_this.userInfoPhoto,
                    userAddress:_this.addressValue,    
                    sex:_this.sex,  
                    describe:_this.describe
                }                          
            }
            _this.$http.post(_this.saveUserInfoAPI,data)
            .then(res=>{
                console.log(res)
                if(res.data.code === 200){
                    _this.$vux.toast.show({
                        text: '保存成功',
                        type:'success',
                        onHide () {
                            _this.$router.go(-1)
                            // console.log('1111111111111111111111111111111111111111111')
                            // console.log(res)
                            _this.$store.dispatch('refreshUserinfo',res.data)
                            
                        }
                    })
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
p2r(size){
    size/32 * 1rem
}

.setting{
    .userPhoto{
        padding-top p2r(30)
        img{
            margin 0 auto
            display block
            border 1px solid #f3f4f6
        }
    }
}

.topbarbox{
    height: 46px;
}
.navbarbox{
    height: p2r(85);
}
</style>
