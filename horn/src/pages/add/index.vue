<template>
   <div class='main-wrap bg-img'>
     <div class="float-modal">
         <div class="item">
             <span>问题：</span>
             <div class="text-area">
                <s-textarea placeholder='请输入需要解答的问题...' @change='question_change'></s-textarea>
             </div>     
         </div>
         <div class="item">
             <span>回答：</span>
             <div class="text-area">
                <s-textarea placeholder='请输入回答...' @change="answer_change"></s-textarea>
             </div>  
         </div>
         <div class="btn-nav">
           <div class="btn" @click="add">
             <s-button value='添加' size='small'></s-button>
           </div>
           <div class="btn" @click="jump">
             <s-button value='返回' size='small'></s-button>
           </div>
         </div>
     </div>
   </div>
</template>

<script>
import sTextarea from '@/components/s-textarea.vue'
import sButton from '@/components/s-button.vue'
import {redirectTo,showToast} from '@/utils/index'
export default {
  data () {
    return {
      question_value:'',
      answer_value:''
    }
  },
components:{
    sTextarea,sButton
},
methods:{
  question_change(value){
    this.question_value=value;
  },
  answer_change(value){
    this.answer_value=value;
  },
  add(){
    if(this.question_value==='' || this.answer_value===''){
      showToast('问题或回答不能为空')
      return false;
    }
    showToast('恭喜，添加成功','success')
    //请求
  },
  jump(){
    redirectTo('/pages/manager/main')
  }
}
}

</script>
<style lang='scss' scoped>
  .item{
    width: 90%;
    margin-top: cr(20);
    @include flex_row;
    font-size: cr(12);
    align-items: flex-start;
    .text-area{
      width: cr(200) !important;
      height: cr(100) !important;
    }
  }
  .btn-nav{
    width: 80%;
    margin: cr(30) 0 cr(20);
    @include flex_row;
    justify-content: space-between;
  }
</style>