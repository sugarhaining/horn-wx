<template>
   <div class='full-model'>
     <div class="content">
         <p>{{text}}</p>
         <div class="btn" @click="cancel">
         <s-button value='返回' size='small'></s-button>
     </div>
     </div>
   </div>
</template>

<script>
import sButton from '@/components/s-button.vue'
export default {
    props:['text'],
  data () {
    return {

    }
  },
components:{
    sButton
},
methods:{
    cancel(){
        this.$emit('cancel')
    }
}
}

</script>
<style lang='scss' scoped>
  .content{
      width: cr(200);
      position: absolute;
      font-size: cr(14);
      top: 50%;
      left: 50%;
      transform: translate3d(-50%,-50%,0);
      background-color: white;
      padding: cr(15) cr(10);
      box-sizing: border-box;
      @include flex_column;
      .btn{
          margin-top: cr(20);
      }
  }
</style>