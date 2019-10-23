<template>
   <div class='main'>
    <img src="/static/images/2fdda3cc7cd98d10ae46f020233fb80e7bec9015.png">
    <span class="title">西电小喇叭</span>
    <button open-type='getUserInfo' @getuserinfo="initUserInfo" v-if='isAuthorizeOk'>点击授权</button>
   </div>
</template>

<script>
import {
    getUserInfo, 
    showToast,
    setStorageSync,
    getStorageSync,
    showLoading,
    checkScope,
    redirectTo,
    login,
    hideLoading,
    navigatorBack
  } from '@/utils/index'
import {
  postLogin
} from '../apis/users'
export default {
  data () {
    return {
      isAuthorizeOk: false,
      userId: '',
      userInfo: undefined,
      prevRoutePath: ''
    }
  },
    methods: {
      async _initCheckBack() {
        showLoading('检查授权中', true);
        const checkRes = await checkScope();
        hideLoading();

        if(!checkRes.authSetting['scope.userInfo']) {
          showToast('请点击授权');
          this.isAuthorizeOk = true;
          return false;
        }

        this.initUserInfo();

      },
      async userLogin() {
        showLoading('登陆中');

        this._initParams();

        const loginRes = await login();
        const userLoginRes = await postLogin({
            code: loginRes.code,
            ...this.userInfo,
        })

        hideLoading();

        if (userLoginRes.data.data) {
          setStorageSync('userId', userLoginRes.data.data);
        }

        this.jumpToIndex();
      },
      jumpToIndex() {
        navigatorBack(1);
      },
      async initUserInfo() {
        const userInfoRes = await getUserInfo();
        setStorageSync('userInfo', {
          name: userInfoRes.userInfo.nickName,
          image: userInfoRes.userInfo.avatarUrl,
        })
        this.userLogin();
      },
      _initParams() {
        this.userId = getStorageSync('userId');
        this.userInfo = getStorageSync('userInfo');
        this.userId && (this.userInfo.userId = this.userId);
      }
    },
    onLoad() {
        this._initCheckBack();
    }
}

</script>
<style lang='scss' scoped>
.main{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    @include flex_column;
        >img{
            width: cr(50);
            height: cr(50);
            margin-top: cr(60);
        }
        .title{
            font-size: cr(14);
            font-weight: 600;
            margin-top: cr(20);
        }
        >button{
          width: cr(120);
            font-size: cr(12);
            color: white;
            background-color: orangered;
            position: absolute;
            bottom: cr(50);
            left: 50%;
            transform: translateX(-50%);
            &:after{
                content:'';
                display: none;
            }
        }
    }
  
</style> 