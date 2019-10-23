<template>
   <div class='main-wrap full-model'>
     <div class="form">
        <div>添加管理员的账号:</div>
        <div>
            <input type="text" v-model="account_value" placeholder="仅支持手机号作为账号" @input="format_account">
        </div>
        <div class="error-info" v-if='account.format'>请输入正确的手机号码作为账号！</div>
        <div class="error-info" v-if='account.require'>账号不能为空！</div>
        <div>密码:</div>
        <div>
            <input type="password" v-model="password_value" placeholder="请输入密码" maxlength="20" @input="format_common">
        </div>
        <div class="error-info" v-if='password.require'>密码不能为空!</div>
        <div>备注:</div>
        <div>
            <input type="text" v-model="remark_value" placeholder="请输入备注" maxlength="13" @input="format_common">
        </div>
        <div class="error-info" v-if='remark.require'>备注不能为空!</div>
        <div class="btn-nav">
            <div @click="submit">
                <s-button value="确定" size='small'></s-button>
            </div>
            <div @click="hidden">
                <s-button value="返回" size='small'></s-button>
            </div>
        </div>
     </div>
   </div>
</template>

<script>
import sButton from './s-button.vue'
import {showToast} from '@/utils/index'
import {registe} from '@/apis/manager'
export default {
  data () {
    return {
        account_value:'',
        password_value:'',
        remark_value:'',
        format:/^1[3-9](\d{9})$/,
        startFormat:false,//开始实时格式监测
        account:{
            format:false,
            require:false,
        },
        password:{
            require:false,
        },
        remark:{
            require:false
        }
    }
  },
components:{
    sButton
},
methods:{
    hidden(){
        this.$emit('hidden')
    },
    updateData(id){
        this.$emit('update',{
            phone:this.account_value,
            remark:this.remark_value,
            id
        })
    },
    format_account(){
        this.account.require=false;
        this.account.format=false;
        if(this.account_value===''){
            this.account.require=true;
            return false;
        }else{
            this.account.require=false;
        }
        if(this.startFormat){   
            if(!this.format.test(this.account_value)){
                this.account.format=true;
            }
        }
    },
    format_common(){
        this.password.require=false;
        this.remark.require=false;
        if(this.startFormat){
            if(this.password_value===''){
                this.password.require=true;
            }
            if(this.remark_value===''){
                this.remark.require=true;
            }
        }
    },
    async submit(){
        this.startFormat=true;
        if(true){
            if(this.account_value===''){
                this.account.require=true;
            }
            if(this.password_value===''){
                this.password.require=true;
            }
            if(this.remark_value===''){
                this.remark.require=true;
            }
            if(this.account.require || this.password.require || this.remark.require){
                return false;
            }
        }
        if(!this.format.test(this.account_value)){
            this.account.format=true;
            return false;
        }
        try{
            let res=await registe({
                phone:this.account_value,
                password:this.password_value,
                remark:this.remark_value
            })
            if(res.data.code===0){
                showToast('成功','success');
                this.hidden()
                this.updateData(res.data.manaId)
            }else if(res.data.code===20003){
                showToast('账号已存在')
            }
        }catch(e){
            showToast('添加失败，请稍后重试')
        }
    }
}
}

</script>
<style lang='scss' scoped>
  .form{
      width: 80%;
      @include flex_column;
      background-color: white;
      border-radius: cr(4);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%,-50%,0);
      font-size: cr(12);
      text-align: left;
      padding: cr(20) cr(10);
      >div{
          width:100%;
          height: cr(30);
          input{
              width: 80%;
              border-bottom: 1px solid rgba(6, 73, 105, 1);
          }
      }
      .error-info{
          color: red;
      }
      .btn-nav{
          width: 80%;
          margin-top: cr(20); 
          @include flex_row;
          justify-content: space-between;
      }
  }
</style>