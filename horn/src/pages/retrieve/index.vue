<template>
   <div class='main-wrap bg-img'>
     <div class="float-modal">
         <div class="title">
             <img :src="QINIU_BASE_URL+info.image">
             {{info.description}}
         </div>
        <div class="contact" v-if='info.information'>
            <div>联系&nbsp;{{info.contact}}:<span>{{info.information}}</span></div>
            <div class="btn" @click.stop="copy">
                <s-button value='复制' size='small'></s-button>
            </div>
        </div>
        <div class="error-info">
            取回后记得来删除失物哦！
        </div>
        <div class="btn-nav">
            <div class="btn" @click="retrieve">
                <s-button value='已取回,删除失物' size='large'></s-button>
            </div>
            <div class="share-btn" @click="showCanvas">
                <s-button value='分享' size='small'></s-button>
            </div>
        </div>
     </div>
     <share-canvas v-if="ifCanvasShow" @cancel='hiddenCanvas' page='retrieve' :info='info'></share-canvas>
   </div>
</template>

<script>
import {preview,setClipboardData,showModal,getStorageSync} from '@/utils/index'
import sButton from '@/components/s-button.vue'
import shareCanvas from '@/components/share-canvas'
import {deleteLosts} from '@/apis/lost'
import { showToast ,redirectTo,navigatorBack} from '../../utils'
import {QINIU_BASE_URL} from '../../utils/config'
export default {
  data () { 
    return {
        info:null,
        userId:'',
        ifCanvasShow:false,
        QINIU_BASE_URL
    }
  },
  methods:{
      hiddenCanvas(){
          this.ifCanvasShow=false;
      },
      showCanvas(){
          this.ifCanvasShow=true;
      },
      retrieve(){
        showModal('提示','确认删除失物？').then(async res=>{
            if(res.confirm){
                let res=await deleteLosts({
                    id:this.info.id,
                    userId:this.userId
                })
                if(res.data.code === 20008){
                    showToast('一天最多删除两次失物哦')
                }else{
                    showToast('删除成功','success')
                    setTimeout(this._jumpLost,500)
                }
            }
        })
      },
      copy(){
          setClipboardData(this.info.information);
      },
      _getLocaluserId(){
          this.userId=getStorageSync('userId') || 'free userId'
      },
      _jumpLost(){
          navigatorBack(1)
      }
  },
  components:{
      sButton,shareCanvas
  },
    onShow(){
        this._getLocaluserId()
        this.info=this.$mp.query;
    }
}

</script>
<style lang='scss' scoped>
  .float-modal{
    font-size: cr(12);
    padding: cr(10);
    box-sizing: border-box;
    margin-bottom: cr(40);
    .title{
        width: 94%;
        padding: cr(10);
        box-sizing: border-box;
        word-break: break-all;
        >img{
          width: cr(120);
          height: cr(120);
          border-radius: cr(4);
          margin: {
              right: cr(15);
              bottom: cr(5); 
          }
          float: left;
      }
    }
      .contact{
          width: 94%;
          margin-top: cr(20);
          @include flex_row;
          justify-content: space-between;
          >div:first-child>span{
              margin-left: cr(5);
              color: #CCCCCC; 
          }
          .btn{
              margin-left: cr(15);
          }
      }
      .error-info{
          font-size: cr(12);
          color: red; 
          height: cr(160);
          line-height: cr(160);
          width: 94%;
      }
      .btn-nav{
          width: 94%;
          @include flex_row;
          justify-content: space-around;
          margin-bottom: cr(20);
      }
  }
</style>