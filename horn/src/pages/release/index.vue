<template>
<div class="main-wrap bg-img">
    <authorize @cancel='hidden' v-if="!ifAuthorize"></authorize>
    <div class="float-modal">
        <div class="textarea-item">
            <s-textarea placeholder="请输入你的问题(上限80字)" @change="change" maxlength=80></s-textarea>
        </div>
        <div class="horn-msg">
            <img src="/static/images/2fdda3cc7cd98d10ae46f020233fb80e7bec9015.png">
            <div class="msg">喇叭会尽快回复你，回复内容会出现在微信主界面里哦！</div>
        </div>
        <form class="horn-btn" @submit='sendMessage' report-submit='true' >
            <div class="btn-wrap">
                <button form-type="submit">留言</button>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import sTextarea from '../../components/s-textarea.vue'
import sButton from '@/components/s-button.vue'
import authorize from '../../components/authorize'
import {
    showToast,
    checkScope,
    getStorageSync,
    showLoading,
    hideLoading,
    navigatorBack
} from '@/utils/index'
import {
    setInterval,
    setTimeout
} from 'timers';
import {postQuestion} from '@/apis/users'
import { jumpTo } from '../../utils';
export default {
    components: {
        sTextarea,sButton,authorize
    },
    data() {
        return {
            textAreaValue: '',
            timer: null,
            ifAuthorize:true
        }
    },
    methods: {
        async _checkscope(){
            showLoading('检查授权中')
            try{
                let res=await checkScope();
                hideLoading()
                if(!res.authSetting['scope.userInfo']){
                    this.ifAuthorize=false;
                }
            }catch(e){
                hideLoading()
            }
        },
        change(value) {
            this.textAreaValue = value;
        },
        async sendMessage(e) {
            if(this.textAreaValue===''){
                showToast('留言内容不能为空哦');
                return false;
            }
            try{
                this._initUser();//再次确认用户数据
                let res=await postQuestion({
                    quesQuestion:this.textAreaValue,
                    userName:this.userInfo.nickName,
                    userImage:this.userInfo.avatarUrl,
                    sessionId:this.sessionid,
                    formId:e.target.formId
                })
                if(res.data.errcode===0){
                    showToast('发布成功', 'success')
                    setTimeout(this._jumpIndex,500)
                }else if(res.data.errcode===20009){
                    showToast('已有人问过此问题')
                }else{
                    showToast('发布失败')
                }
            }catch(e){

            }
        },
        _jumpIndex(){
            navigatorBack(1)
        },
        _initUser(){
            this.sessionid=getStorageSync('sessionId') || '';
            this.userInfo=getStorageSync('userInfo')
        },
        returnPage() {
            this.timer = null;  
        }, 
        hidden(){
            this.ifAuthorize=true;
        }
    },
    onLoad(){
        this._checkscope()//用户授权检查
    }
}
</script>

<style lang="scss" scoped>
.main-wrap {
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
    @include flex_column;

    .float-modal {
        .textarea-item {
            width: 86%;
            height: cr(120);
            margin-top: cr(25);
        }

        .horn-msg {
            width: 90%;
            @include flex_row;
            align-items: flex-start;
            margin-top: cr(35);

            >img {
                width: cr(40);
                height: cr(40);
            }

            .msg {
                width: cr(160);
                height: cr(80);
                padding: cr(4) cr(6);
                margin-left: cr(10);
                border: 1px solid rgba(187, 187, 187, 1);
                border-radius: cr(4);
                color: rgba(16, 16, 16, 1);
                font-size: cr(12);
                position: relative;

                &::after {
                    content: '';
                    position: absolute;
                    border-left: cr(10) solid transparent;
                    border-right: cr(10) solid rgba(187, 187, 187, 1);
                    border-bottom: cr(10) solid transparent;
                    border-top: cr(10) solid transparent;
                    left: cr(-20);
                    top: cr(6);
                }
            }
        }

        .horn-btn {
            width: 70%;
            @include flex_row;
            justify-content: center;
            margin: cr(60) 0 cr(20);
            button{
                width: cr(60);
                height: cr(25);
                color: #064969;
                border: 1px solid rgba(6, 73, 105, 1);
                border-radius: cr(4);
                line-height: cr(25);
                font-size: cr(12);
                padding: 0 cr(5);
                &:after{
                    content:'';
                    display:none;
                }
            }
        }
    }
}
</style>
