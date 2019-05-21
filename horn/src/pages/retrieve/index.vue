<template>
   <div class='main-wrap bg-img'>
     <div class="float-modal">
        <img src="http://img95.699pic.com/photo/50029/4476.jpg_wh300.jpg" @click="preview('http://img95.699pic.com/photo/50029/4476.jpg_wh300.jpg')">
        <div class="content">{{info.content}}</div>
        <div class="contact">
            <div>联系方式:<span>{{info.lost_contact}}:{{info.lost_information}}</span></div>
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
            <div class="btn" @click="jump">
                <s-button value='返回' size='small'></s-button>
            </div>
        </div>
     </div>
   </div>
</template>

<script>
import {preview,redirectTo,setClipboardData,showModal} from '@/utils/index'
import sButton from '@/components/s-button.vue'
export default {
  data () {
    return {
        info:null
    }
  },
  methods:{
      preview(path){
          preview([path])
      },
      retrieve(){
        showModal('提示','确认删除失物？').then(res=>{
            console.log(res)
            if(res.confirm){
                //取回操作
            }else if(res.cancel){

            }
        })
      },
      jump(){
          redirectTo('/pages/lost/main')
      },
      copy(){
          setClipboardData(this.info.lost_information)
      }
  },
  components:{
      sButton
  },
    onLoad(){
        this.info=this.$mp.query;
    }
}

</script>
<style lang='scss' scoped>
  .float-modal{
    font-size: cr(12);
      >img{
          width: 86%;
          height: cr(140);
          border-radius: cr(6);
          margin-top: cr(-10);
      }
      .content{
          width: 94%;
          margin: cr(10);
      }
      .contact{
          width: 94%;
          margin-top: cr(10);
          @include flex_row;
          >div:first-child>span{
              margin-left: cr(5);
              color: #CCCCCC; 
          }
          .btn{
              margin-left: cr(15);
          }
      }
      .error-info{
          font-size: cr(14);
          color: red; 
          height: cr(80);
          line-height: cr(80);
      }
      .btn-nav{
          width: 94%;
          @include flex_row;
          justify-content: space-between;
          margin-bottom: cr(20);
      }
  }
</style>