<template>
<div class='main-wrap bg-img'>
    <tab-swiper :autoSearch="autoSearch" :searchId='searchId'></tab-swiper>
</div>
</template>

<script>
import tabSwiper from '../../components/tab-swiper.vue'
import {login,showLoading,hideLoading} from '@/utils/index'
import {checkLoginTimeout,postLogin} from '@/apis/users'
import { showToast, getStorageSync,setStorageSync } from '../../utils';

export default {
    data() {
        return {
            ifAuthorize:true,
            pageNumber:1,
             autoSearch:false,
            searchId:0
        }
    },
    components: {
        tabSwiper
    },
    methods:{
        async _checkLogin(){
            try{
                let res=await checkLoginTimeout({
                    sessionId:this.sessionId
                })
                if(res.data.errcode===20001){
                    this._login()
                }
            }catch(e){
                
            }
        },
        async _login(){
            showLoading('登陆中')
            login().then(res=>{
                return postLogin({
                    code:res.code
                })
            }).then(res=>{
                setStorageSync('sessionId',res.data.sessionId)
                hideLoading()
            }).catch(err=>{
                hideLoading()
            })
        },
        _initSessionId(){
            this.sessionId=getStorageSync('sessionId') || 'test sessionId'
        }
    },
    onLoad(options){
        this._initSessionId()
        this._checkLogin()
        // const scene = decodeURIComponent(query.scene)
    }
}
</script>

<style lang="scss" scoped>
.main-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    .btn{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0; 
        border: none;
        border-radius: 0;
        background-color: transparent;
        z-index:1000000;
        &:after{
            content:'';
            display: none;
        }
    }
}
</style>
