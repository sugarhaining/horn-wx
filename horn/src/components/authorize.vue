<template>
   <div class='main'>
     <div class="content">
         <img src="/static/images/2fdda3cc7cd98d10ae46f020233fb80e7bec9015.png">
         <span class="title">西电小喇叭</span>
         <button open-type='getUserInfo' @getuserinfo="bindInfo" >点击授权</button>
     </div>
   </div>
</template>

<script>
import {getUserInfo,showToast,setStorageSync} from '@/utils/index'
export default {
  data () {
    return {

    }
  },
    methods: {
        async bindInfo(){
            let res=await getUserInfo().catch(err=>{
                showToast('授权后才可以继续操作哦')
                throw new Error('anthorize fail')
            })
            let {nickName,avatarUrl}=res.userInfo;
            setStorageSync('userInfo',{
                nickName,
                avatarUrl
            })
            this.$emit('cancel')
        }
    }
}

</script>
<style lang='scss' scoped>
.main{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.6);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000  ;
    .content{
        width: 60%;
        top:50%;
        left: 50%;
        background-color: white;
        position: absolute;
        transform: translate(-50%,-50%);
        @include flex_column;
        >img{
            width: cr(50);
            height: cr(50);
        }
        .title{
            font-size: cr(14);
            font-weight: 600;
            margin-top: cr(20);
        }
        >button{
            font-size: cr(12);
            color: white;
            background-color: orangered;
            margin-top: cr(70);
            margin-bottom: cr(20);
            &:after{
                content:'';
                display: none;
            }
        }
    }
}
  
</style> 