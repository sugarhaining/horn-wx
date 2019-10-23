<template>
<div class='main-wrap bg-img'>
    <tab-swiper :autoSearch="autoSearch" :searchId='searchId'></tab-swiper>
</div>
</template>

<script>
import tabSwiper from '../../components/tab-swiper.vue'
import {login,showLoading,hideLoading} from '@/utils/index'
import {postLogin} from '@/apis/users'
import { showToast, getStorageSync,setStorageSync, checkScope} from '../../utils';

export default {
    data() {
        return {
            ifAuthorize:true,
            pageNumber:1,
            searchId:0,
            isNoAutho: false,
        }
    },
    components: {
        tabSwiper
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
