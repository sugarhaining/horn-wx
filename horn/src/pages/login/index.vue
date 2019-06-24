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
                <input v-model="user_pass" type="password" placeholder="请输入您的密码">
        </div>
                <div class="sub-btn" @click="login">
                    <s-button value='账号登录' :font='font' :border='border' size='large'></s-button>
                </div>
            </div>
        </div>
</template>

<script>
import sButton from '@/components/s-button.vue'
import {
    getStorageSync,
    setStorageSync,
    showToast,
    jumpTo
} from '@/utils/index'
import {
    managerLogin
} from '@/apis/manager'
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
            },
            user_position: 0 //用户定位   1：超级管理员   2.普通管理员  
        }
    },
    components: {
        sButton
    },
    methods: {
        async login() {
            try {
                let res = await managerLogin({
                    manaPhone: this.user_name,
                    manaPass: this.user_pass
                })
                if (res.data.errcode === 20004) {
                    this.user_position = 1;
                    this._setStorage();
                    this._toManager();
                } else if (res.data.errcode === 20005) {
                    this._setStorage();
                    this._toManager();
                } else if (res.data.errcode === 20006) {
                    showToast('密码错误')
                } else {
                    showToast('账号不存在')
                }
            } catch (e) {
                showToast('未知错误，请稍后重试')
            }
        },
        _getStorage() {
            let result = getStorageSync('userAccount');
            if (result) {
                this.user_name = result.account;
                this.user_pass = result.password
            }
        },
        _setStorage() {
            setStorageSync('userAccount', {
                account: this.user_name,
                password: this.user_pass
            })
        },
        _toManager() {
            jumpTo('/pages/manager/main', {
                position: this.user_position
            })
        }
    },
    onLoad() {
        this._getStorage()
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
                width: cr(160);
            }
        }
    }

    .sub-btn {
        margin-top: cr(30);
    }
}
</style>
