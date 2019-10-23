<template>
<div class='main-wrap bg-img'>
    <div class="float-modal">
        <div class="text-area">
            <s-textarea placeholder='请提供失物的详细信息...' @change="detail" saveContent="true"></s-textarea>
        </div>
        <div class="choose-img">
          <div class="images" v-if="imgUrls.length!==0">
            <div class="image" v-for="(item,index) in imgUrls" :key="index">
              <img :src="item">
              <div class="close" @click="remove(index)"><img src="/static/icons/remove.png"></div>
            </div>
          </div>
          <div class="add-img" v-if="imgUrls.length===0" @click="chooseImage">
            <img src="/static/icons/add-image.png">
            <span>添加图片</span>
          </div>
        </div>
        <div class="tags">
          <label>分类：</label>
          <picker :range='tags' :value='tagsIndex' @change="updateTag" class="picker-wrap">
            <div class="picker">
                <span>{{tags[tagsIndex]}}</span>
                <img src="/static/icons/downpull.png">
            </div>
          </picker>
        </div>
        <div class="contact">
          <label>联系方式：</label>
          <picker :range='ways' :value='waysIndex' @change="updateContact" class="picker-wrap">
            <div class="picker">
                <span>{{ways[waysIndex]}}</span>
                <img src="/static/icons/downpull.png">
            </div>
          </picker>
          <input type="text" placeholder="您的联系号码" class="inpit" v-model="contact_way" v-if="showContactInput">
        </div>
        <div class="btn-nav">
          <div class="btn" @click="open">
            <s-button value='发布' size='small'></s-button>
          </div>
        </div>
    </div>
</div>
</template>

<script>
import sTextarea from '@/components/s-textarea.vue'
import sButton from '@/components/s-button.vue'
import { 
    redirectTo,
    showLoading,
    hideLoading,
    showToast,
    navigatorBack,
    getStorageSync,
    setStorageSync,
    login,
    jumpTo
} from '../../utils'
import {postReleaseLosts} from '@/apis/lost'
import qiNiuUpload from '@/apis/qiniu'
import { postLogin } from '@/apis/users';
export default {
    data() {
        return {
          imgUrls:[],
          tags:['证件','钱包/背包','耳机','钥匙','伞','衣服','书/笔记本','其他'],
          ways:['不填','QQ','微信','手机号'],
          contact_way:'',
          tagsIndex:0,
          waysIndex:0,
          currTag:'',
          detail_value:'',
          showContactInput:false
        }
    },
    watch:{
       waysIndex(newValue){
           if( +newValue === 0){
               this.showContactInput=false;
           }else{
               this.showContactInput=true;
           }
       } 
    },
    methods:{
        async _userLoginLine(userInfo) {
            const wxLoginRes = await login();
            const clientLoginRes = await postLogin({
                code: wxLoginRes.code,
                ...userInfo
            })

            if (userLoginRes.data.data) {
                setStorageSync('userId', userLoginRes.data.data);
            }
        },
      updateTag(e){
        this.tagsIndex=e.mp.detail.value
      },
      updateContact(e){
        this.waysIndex=e.mp.detail.value
      },
      async open(){
        if(this.detail_value===''){
          showToast('请输入失物描述信息');
          return false;
        }
        if(this.imgUrls.length===0){
          showToast('请提供失物有效图片')
          return false;
        }
        if (this.waysIndex !==0 && !(this.contact_way)) {
          showToast('请输入联系方式或选择不填');
          return false;
        }
        try{
            showLoading('发布中')
            let res=await qiNiuUpload(this.imgUrls[0]);
            let res1= await postReleaseLosts({
                description:this.detail_value,
                image:res.imageURL,
                tag:this.tags[this.tagsIndex],
                contact:this.waysIndex===0?'':this.ways[this.waysIndex],
                information:this.contact_way
            })
            hideLoading()
            showToast('发布成功')
            setTimeout(this._jumpLost,500)
        }catch(e){
            
        }
      },
      detail(value){
        this.detail_value=value;
      },
      chooseImage(){
        redirectTo('/pages/cutImage/main')
      },
      remove(index){
        this.imgUrls.splice(index,1)
      },
      _jumpLost(){
          navigatorBack(1)
      }
    },
    components: {
        sButton,
        sTextarea,
    },
    onLoad() {
        const userInfo = getStorageSync('userInfo');
        const userId = getStorageSync('userId');
        userId && (userInfo.userId = userId);
        if (!userInfo) {
            jumpTo('../authorize/main');
            return false;
        }

        this._userLoginLine(userInfo);
    },
    onShow(){
        if(this.$mp.query.src){
            this.imgUrls.push(this.$mp.query.src)
        }
    }
}
</script>

<style lang="scss" scoped>
.float-modal {
    font-size: cr(12);
    .text-area {
        width: 80%;
        height: cr(120);
        margin-top: cr(10);
    }
    .choose-img{
      height: cr(70);
      align-self: flex-start;
      border-radius: cr(6);
      border: 0.5px solid rgba(6, 73, 105, 1); 
      margin-top: cr(20);
      margin-left: cr(40);
      @include flex_row;
      justify-content: center;
      .images{
        height: 100%;
        @include flex_row;
        .image{
          width: cr(70);
          position: relative;
          >img{
            width:cr(60);
            height: cr(60);
            margin-left: cr(5);
          }
          .close{
            position: absolute;
            top: cr(-2.5);
            right: cr(2.5);
            width: cr(20);
            height: cr(20);
            z-index: 999;
            background-color: rgba(0,0,0,0.64);
            border-radius: 50%;
            img{
              width: cr(20);
              height: cr(20);
            }
          }
        }
      }
      .add-img{
        width: cr(70);
        height: 100%;
        @include flex_column;
        justify-content: space-around;
        img{
          width: cr(25);
          height: cr(25);
        }
        span{
          color: #CCCCCC;
        }
      }
    }
    .tags{
      width: 90%;
      margin-top: cr(20);
      @include flex_row;
      .picker{
        color: #CCCCCC;
      }
    }
    .contact{
      width: 90%;
      margin-top: cr(20);
      @include flex_row;
      .picker{
        color: #CCCCCC;
      }
      input{
        width: cr(100);
        margin-left: cr(20);
        border-bottom: 1px solid rgba(6, 73, 105, 1);
      }
    }
    .btn-nav{
      width: 80%;
      @include flex_row;
      justify-content: center;
      margin: cr(30) 0 cr(10);
    }
}
.picker-wrap{
    border: 1px solid #BBBBBB;
    border-radius: cr(4);
    margin-left: cr(2);
    padding: {
        left: cr(4);
        right: cr(4); 
        top: cr(2);
        bottom: cr(2); 
    }
    .picker{
        @include flex_row;
        >img{
            width: cr(10);
            height: cr(10);
            margin-left: cr(2);
        }
    }
}
</style>
