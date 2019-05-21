<template>
<div class='main-wrap bg-img'>
    <div class="title">小喇叭管理员</div>
    <div class="form">
        <div class="form-item">
            <img src="/static/icons/user.png">
            <input v-model="user_name" type="text" placeholder="请输入您的账号">
       </div>
            <div class="form-item">
                <img src="/static/icons/password.png">
                <input v-model="user_pass" type="text" placeholder="请输入您的密码">
       </div>
                <div class="sub-btn">
                    <s-button value='账号登陆' :font='font' :border='border' size='large'></s-button>
                </div>
            </div>
        </div>
</template>

<script>
import sButton from '@/components/s-button.vue'
import {getStorageSync,setStorageSync} from '@/utils/index'
export default {
    data() {
        return {
            user_name: '',
            user_pass: '', //数据缓存
            font: {
                size: 14,
                color: '#FDA164'
            },
            border: {
                width: '1',
                type: 'solid',
                color: '#FDA164'
            }
        }
    },
    components: {
        sButton
    }
}
</script>

<style lang="scss" scoped>
.main-wrap {
    font-size: $index_font_size;
    color: white;

    .title {
        margin-top: cr(100);
    }

    .form {
        width: 70%;
        margin-top: cr(120);
        @include flex_column;

        .form-item {
            width: 100%;
            height: cr(60);
            @include flex_row;

            >img {
                width: cr(30);
                height: cr(30);
            }

            >input {
                padding-left: cr(10);
                box-sizing: border-box;
                color: #BBBBBB;
                font-size: cr(12);
                border-bottom: 2px solid #FDA164;
                margin-left: cr(18);
            }
        }
    }

    .sub-btn {
        margin-top: cr(30);
    }
}
</style>
