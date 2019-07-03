<template>
   <div class='main-wrap'>
     <web-view :src="src"></web-view>
   </div>
</template>

<script>
export default {
  data () {
    return {
      src:''
    }
  },
  onShow(){
    this.src=this.$mp.query.path
  }
}

</script>
<style lang='scss' scoped>
  
</style>