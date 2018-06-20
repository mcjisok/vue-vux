<template>
    <div class="pushPage">
        <div class="topbarbox"></div>  
        <group>
            <x-input :placeholder="input_placeholder" v-model="pushTitle" ></x-input>
            <x-textarea :max="200" name="description" :placeholder="textarea_placeholder" v-model="pushContent" ></x-textarea>
            <popup-picker title="一级标签" :data="firstTagList" v-model="firstTag" @on-show="onShow" @on-hide="onHide" @on-change="onChange" placeholder="请选择"></popup-picker>
            <popup-picker popup-title="请选择" title="二级标签" :data="subTagList" v-model="subTag" @on-show="onShow" @on-hide="onHide" @on-change="onChangeSub" placeholder="请选择"></popup-picker>
            <cell v-if="groupInfo.length !== 0" title="分组" :value="groupInfo.groupName" ></cell>
            <x-switch title="是否存为草稿" v-model="isPush"></x-switch>
        </group>
        <group>
        <flexbox>
            <flexbox-item></flexbox-item>
            <flexbox-item></flexbox-item>            
            <flexbox-item><x-button type="primary" @click.native="savePush()" action-type="submit">发布</x-button></flexbox-item>
            <!-- <flexbox-item><x-button type="warn" @click.native="savePush()">草稿</x-button></flexbox-item> -->
        </flexbox>
        </group>
        <group>
            <cell title="点击上传图片(最多九张)" @click.native.stop="openFile">        
                <input type="file" @change="fileChange" style="display: none" ref="file" multiple="multiple">
                <i class="fa fa-file"></i>
                <x-icon type="ios-plus-empty" size="30"></x-icon>
            </cell>
        </group>
        <group>
            <div class="preview" v-for="(i,index) in imgs" :key="i">
                <span style="font-size:20px;">Loading</span>
                <!-- <spinner type="ios" size="40px"></spinner> -->
                <x-img :src="host + i"  @on-success="success" @on-error="error" class="ximg-demo" error-class="ximg-error" :offset="-20" container="#vux_view_box_body"></x-img>
                <a @click="del_pushimg(index)" class="del_icon"><icon type="cancel" class="del_icon" ></icon></a>
            </div>
            <div style="clear:both"></div>
        </group>
        
        <div class="navbarbox"></div>
    </div>
</template>

<script>
// 引入lodash工具库
// let _array = require('lodash/array');
export default {
    data(){
        return{
            input_placeholder:'请输入标题',
            textarea_placeholder:'请输入要发表的内容',
            imgs: [],
            maxLength:9,//最大上传图片张数
            imgData: {  
                accept: 'image/gif, image/jpeg, image/png, image/jpg',  
            },
            isPush:false,
            isrequired:true,

            // popup数据绑定
            firstTag:[],
            subTag:[],

            // data
            pushTitle:'',
            pushContent:'',

            tagList:[],
            firstTagList:[],
            subTagList:[],

            groupID:this.$store.state.groupID.ID !== ''?this.$store.state.groupID.ID:null,
            groupInfo:[],

            // api
            uploadPushImgApi:this.HOST.host + '/uploadPushImg',
            savaPushApi:this.HOST.host + '/savePush',
            getTagList:this.HOST.host + '/getTagList',
            getGroupInfoApi:this.HOST.host + '/getGroupDerail',
            host:this.HOST.host,      
            
        }
    },
    computed:{
        pushID:function(){
            if(this.$route.params.id){
                return this.$route.params.id
            }
            else{
                return ''
            }
        },
        
        
    },
    methods:{
        // 判断分组ID是否在全局状态存在，如果存在则获取诗句
        getGroupInfo(){
            let _this = this;
            if(this.groupID !== ''){
                _this.$http.post(this.getGroupInfoApi,{
                    _id:_this.groupID
                })
                .then(res=>{
                    console.log('测试是',res)
                    _this.groupInfo = res.data.groupDetail
                })
                .catch(e=>{
                    console.log(e)
                })
            }
        },
        openFile(){
            this.$refs.file.click();
        },
        fileChange(event){
            let _this = this
            // console.log('1')
            // console.log(event)
            if(this.imgs.length < this.maxLength){
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
                this.$http.post(this.uploadPushImgApi,form,{
                    headers:{'Content-Type':'multipart/form-data'} 
                })
                .then(res=>{
                    // console.log(res)
                    _this.imgs.push(res.data)
                })
                .catch(error =>{
                    alert('图片上传出错！')
                })
            }
            else{
                _this.$vux.toast.show({
                    text: '最多只能上传9张照片',
                    type:'text'
                })
            }            
        },
        success (src, ele) {
            console.log('success load', src)
            const span = ele.parentNode.querySelector('span')
            ele.parentNode.removeChild(span)
        },
        error (src, ele, msg) {
            console.log('error load', msg, src)
            const span = ele.parentNode.querySelector('span')
            span.innerText = 'load error'
        },
        del_pushimg:function (i) {
            console.log(i)
            this.imgs.splice(i,1)
        },
        // 发布新的push动态
        savePush:function(){
            let _this = this
            console.log('分组ID为！！！！！！！！！！！！！！',this.groupID)
            this.$http.post(this.savaPushApi,{
                pushTitle:this.pushTitle,
                pushContent:this.pushContent,
                pushImageList:this.imgs,
                isDrafts:this.isPush,
                userID:this.$store.state.nowLoginUserID,
                pushID:this.pushID,
                tagID:this.subTag,
                groupID:this.groupID,
                meta:{}
            })
            .then(res=>{
                console.log(res)
                if(res.data.code === 200){
                    _this.$vux.toast.show({
                        text: '发布成功',
                        type:'success',
                        onHide () {                            
                            // _this.$router.push('/home/index')
                            _this.$router.go(-1)
                        }
                    })
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        // 修改草稿内容 草稿内存暂存到state.drafts中
        editPush:function(){
            let _this = this;
            this.pushTitle = this.$store.state.drafts.pushTitle,
            this.pushContent = this.$store.state.drafts.pushContent,
            this.imgs = this.$store.state.drafts.pushImageList,
            this.isPush = this.$store.state.drafts.isDrafts
            
        },

        // popup picker方法
        onChange (val) {
            // console.log('val change', val)
            let strVal = val[0].toString()
            let index = this.firstTagList[0].indexOf(strVal)
            // console.log('当前选择的位置为',strVal,index)

            let sub = this.tagList[index].subTagList
            console.log(sub)
            let subTag = []
            sub.forEach(function(e){
                subTag.push(e.tagName)
            })
            // 获取二级标签列表
            this.subTagList = [subTag]

            // 重置二级标签选择的值
            this.subTag = []

        },
        onChangeSub(val){
            console.log('二级标签为：',val)
        },
        onShow () {
            // console.log('on show')
        },
        onHide (type) {
            // console.log('on hide', type)
        }
    },
    beforeMount:function(){
        let _this = this
        this.$http.get(this.getTagList)
        .then(res=>{
            let a =res.data.data

            // 将所有tag数据赋值给tagList 重要！
            _this.tagList = res.data.data

            let firstTag = []
            console.log(res.data.data)
            // _this.tagList = res.data.data
            a.forEach(function(e){  
                console.log(e)
                firstTag.push(e.tagName)
            })
            _this.firstTagList.push(firstTag)
            console.log(firstTag)
        })
        .catch(e=>{
            console.log(e)
        })
    },
    mounted:function(){
        if(this.pushID !== ''){
            console.log('修改草稿中')
            this.editPush()
        }
        else{
            this.getGroupInfo()
        }
    }
}
</script>

<style lang="stylus">
p2r(size){
    size/32 * 1rem
}
.navbarbox{
    height: p2r(85);
}

.preview
    width 33%
    height p2r(200)
    background #f9f9f6
    float left
    position relative

.ximg-demo {
  width: 80%;
  height: auto;
  margin-left 10%;
  margin-top p2r(10)
}
.ximg-error {
  background-color: yellow;
}
.ximg-error:after {
  content: '加载失败';
  color: red;
}

.del_icon{
    position absolute
    // top -10px
    bottom p2r(10)
    right 0
}
</style>
