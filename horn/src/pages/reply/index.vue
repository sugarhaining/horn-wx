<template>
<div class='main-wrap bg-img'>
    <div class="float-modal">
        <img src="https://img2.woyaogexing.com/2019/05/16/bad0de48b20c47d7bc32c2d3fef70afb!400x400.jpeg">
        <div class="name">{{info.ques_name}}</div>
        <div class="content">{{info.ques_question}}</div>
        <div class="text-area">
            <s-textarea placeholder='输入回答...' @change="answer"></s-textarea>
        </div>
        <div class="check-box">
            <label>添加到问题库</label>
            <switch checked @change="switchChange" class="input" />
        </div>
        <div class="btn-nav">
            <div class="btn" @click="submit">
                <s-button value='回复' size='small'></s-button>
            </div>
            <div class="btn" @click="jump">
                <s-button value='返回' size='small'></s-button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import sTextarea from '@/components/s-textarea.vue'
import sButton from '@/components/s-button.vue'
import {
    jumpTo,
    showToast
} from '@/utils/index'
export default {
    data() {
        return {
            info: null,
            answer_value: '',
            ifAdd: true
        }
    },
    components: {
        sTextarea,
        sButton
    },
    methods: {
        answer(value) {
            this.answer_value = value
        },
        switchChange(e) {
            this.ifAdd = e.mp.detail.value;
        },
        submit() {
            if (this.answer_value === '') {
                showToast('回答不能为空');
                return false;
            }
            showToast('回复成功', 'success');
        },
        jump() {
            jumpTo('/pages/manager/main')
        }
    },
    onLoad() {
        this.info = this.$mp.query;
    }
}
</script>

<style lang="scss" scoped>
.float-modal {
    >img {
        width: cr(70);
        height: cr(70);
        margin-top: cr(-20);
        border-radius: 50%;
    }

    .name {
        margin-top: cr(10);
    }

    .content {
        width: 90%;
        margin-top: cr(20);
        color: #076E9E;
        font-size: cr(12);
    }

    .text-area {
        width: 80%;
        height: cr(140);
        margin-top: cr(10);
    }

    .check-box {
        width: 80%;
        text-align: left;
        margin-top: cr(10);
        font-size: cr(10);

        .input {
            margin-left: cr(10);
        }
    }

    .btn-nav {
        width: 80%;
        @include flex_row;
        justify-content: space-between;
        margin: cr(20) 0 cr(10);
    }
}
</style>
