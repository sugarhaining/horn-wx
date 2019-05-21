<template>
   <div class='main'>
       <span>用户留言</span>
       <div class="nav" v-if="identity===0">
           <img src="/static/icons/manager.png" @click="jump">
           <img src="/static/icons/add.png" @click="add">
       </div>
   </div>
</template>

<script>
import {jumpTo} from '@/utils/index'
export default {
    props:['identity'],
  data () {
    return {

    }
  },
    methods:{
        jump(){
            jumpTo('/pages/account/main')
        },
        add(){
            jumpTo('/pages/add/main')
        }
    }
}

</script>
<style lang='scss' scoped>
  .main{
      width: 100%;
      height: cr(40);
      @include flex_row;
      justify-content: space-between;
      padding: 0 cr(15);
      color: white;
      font-size: $index_font_size;
      box-sizing: border-box;
      .nav{
          @include flex_row;
          >img{
              width: cr(25);
              height: cr(25);
              &:first-child{
                  margin-right: cr(15);
              }
          }
      }
  }
</style>