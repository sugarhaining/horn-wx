<template>
<div class="main-wrap bg-img">
    <div class="float-modal">
        <div class="textarea-item">
            <s-textarea placeholder="请输入你的问题" @change="change" maxlength=25></s-textarea>
        </div>
        <div class="horn-msg">
            <img src="/static/images/2fdda3cc7cd98d10ae46f020233fb80e7bec9015.png">
            <div class="msg">{{horn_msg}}</div>
        </div>
        <div class="horn-btn">
            <div class="btn-wrap" @click="sendMessage">
                <s-button value='留言' size='small'></s-button>
            </div>
            <div class="btn-wrap" @click="returnPage">
                <s-button value='返回' size='small'></s-button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import sTextarea from '../../components/s-textarea.vue'
import sButton from '@/components/s-button.vue'
import {
    redirectTo,
    showToast
} from '@/utils/index'
import {
    setInterval,
    setTimeout
} from 'timers';
export default {
    components: {
        sTextarea,sButton
    },

    data() {
        return {
            textAreaValue: '',
            horn_msg: '喇叭会尽快从通知助手处回复你哦！',
            timer: null
        }
    },
    methods: {
        change(value) {
            this.textAreaValue = value;
        },
        sendMessage() {
            //请求发送
            if(this.textAreaValue===''){
                showToast('留言内容不能为空哦');
                return false;
            }
            showToast('发布成功', 'success',true).then(res => {
                this.timer = setTimeout(this.returnPage, 2000)
            })
        },
        returnPage() {
            this.timer = null;
            redirectTo('/pages/index/main')
        }
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
            justify-content: space-between;
            margin: cr(60) 0 cr(20);
        }
    }
}
</style>
