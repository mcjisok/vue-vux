<template>
    <div class="addgroup">
        <div class="topbarbox"></div>
        <group>
            <x-input :placeholder="input_placeholder" v-model="groupName" ></x-input>
            <x-textarea :max="100" name="description" :placeholder="textarea_placeholder" v-model="groupDescription" ></x-textarea>
            <popup-picker title="一级标签" :data="firstTagList" v-model="firstTag" @on-show="onShow" @on-hide="onHide" @on-change="onChange" placeholder="请选择"></popup-picker>
            <popup-picker popup-title="请选择" title="二级标签" :data="subTagList" v-model="subTag" @on-show="onShow" @on-hide="onHide" @on-change="onChangeSub" placeholder="请选择"></popup-picker>
            <!-- <x-switch title="是否存为草稿" v-model="isPush"></x-switch> -->
        </group>
        <group>
        <flexbox>
            <flexbox-item></flexbox-item>
            <flexbox-item></flexbox-item>            
            <flexbox-item><x-button type="primary" @click.native="savePush()" action-type="submit">提交审核</x-button></flexbox-item>
            <!-- <flexbox-item><x-button type="warn" @click.native="savePush()">草稿</x-button></flexbox-item> -->
        </flexbox>
        </group>
        <group>
            <cell title="点击上传封面图" @click.native.stop="openFile">        
                <input type="file" @change="fileChange" style="display: none" ref="file" multiple="multiple">
                <i class="fa fa-file"></i>
                <x-icon type="ios-plus-empty" size="30"></x-icon>
            </cell>
        </group>
        <group v-if="imgURL">
            <div class="preview">
                <span style="font-size:20px;">Loading</span>
                <!-- <spinner type="ios" size="40px"></spinner> -->
                <x-img :src="host + imgURL"  :offset="-20" container="#vux_view_box_body"></x-img>
                <a @click="del_pushimg" class="del_icon"><icon type="cancel" class="del_icon" ></icon></a>
            </div>
            <!-- <div style="clear:both"></div> -->
        </group>  
        <div class="navbarbox"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            input_placeholder:'请输入分组名称',
            textarea_placeholder:'请输入分组描述 尽量简短',
            imgURL: '',
            maxLength:1,//最大上传图片张数
            imgData: {  
                accept: 'image/gif, image/jpeg, image/png, image/jpg',  
            },
            isPush:false,
            isrequired:true,

            // popup数据绑定
            firstTag:[],
            subTag:[],

            // data
            groupName:'',
            groupDescription:'',

            tagList:[],
            firstTagList:[],
            subTagList:[],

            // api
            uploadGroupImgApi:this.HOST.host + '/uploadGroupImg',
            savaGroupApi:this.HOST.host + '/saveGroup',
            getTagList:this.HOST.host + '/getTagList',
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
        }
    },
    methods:{
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
            this.$http.post(this.uploadGroupImgApi,form,{
                headers:{'Content-Type':'multipart/form-data'} 
            })
            .then(res=>{
                // console.log(res)
                // _this.imgs.push(res.data)
                _this.imgURL = res.data
            })
            .catch(error =>{
                alert('图片上传出错！')
            })
                     
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
        del_pushimg:function () {
            // console.log(i)
            this.imgURL = ''
        },
        // 发布新的push动态
        savePush:function(){
            let _this = this
            this.$http.post(this.savaGroupApi,{
                groupName:this.groupName,
                groupDescription:this.groupDescription,
                groupImg:this.imgURL,
                // isDrafts:this.isPush,
                groupLeader:this.$store.state.nowLoginUserID,
                groupUserList:this.$store.state.nowLoginUserID,
                // pushID:this.pushID,
                groupTag:this.subTag
            })
            .then(res=>{
                console.log(res)
                if(res.data.code === 200){
                    _this.$vux.toast.show({
                        text: '发布成功',
                        type:'success',
                        onHide () {                            
                            _this.$router.push('/home/group')
                        }
                    })
                }
                else if(res.data.code === 404){
                    _this.$vux.toast.show({
                        text: '分组名已存在',
                        type:'warn',
                        onHide () {                            
                            // _this.$router.push('/home/group')
                        }
                    })
                }
                else{
                    _this.$vux.toast.show({
                        text: '提交失败，请稍后再试',
                        type:'warn',
                        onHide () {                            
                            // _this.$router.push('/home/group')
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
            // this.editPush()
        }
    }
}
</script>

<style lang="stylus">
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
