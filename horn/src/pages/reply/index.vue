<template>
<div class='main-wrap bg-img'>
    <div class="float-modal">
        <img src="https://img2.woyaogexing.com/2019/05/16/bad0de48b20c47d7bc32c2d3fef70afb!400x400.jpeg">
        <div class="name">{{info.userName}}</div>
        <div class="content">{{info.quesQuestion}}</div>
        <div class="text-area">
            <s-textarea placeholder='输入回答...' @change="answer"></s-textarea>
        </div>
        <div class="check-box">
            <label>添加到问题库</label>
            <div class="input" @click="toggleAdd">
                <img src="/static/icons/checked.png" v-if="ifAdd" >
            </div>
        </div>
        <div class="btn-nav">
            <div class="btn" @click="submit">
                <s-button value='回复' size='small'></s-button>
            </div>
        </div>
    </div>
</div>
</template>
 
<script>
import sTextarea from '@/components/s-textarea.vue'
import sButton from '@/components/s-button.vue'
import {
    showToast
} from '@/utils/index'
import {answerQuestions} from '@/apis/manager'
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
        toggleAdd(){
            this.ifAdd=!this.ifAdd;
        },
        async submit() {
            if (this.answer_value === '') {
                showToast('回答不能为空');
                return false;
            }
            try{
                let res=await answerQuestions({
                    isAdd:this.ifAdd?1:0,
                    quesId:this.info.quesId,
                    quesAnswer:this.answer_value
                })
                if(res.data.errcode!==0){
                    showToast('问题已失效');
                }else{
                    showToast('回答成功','success')
                }
            }catch(e){
                showToast('回复失败，稍后重试')
            }
        },
    },
    onShow() {
        this.info = this.$mp.query;
        this.answer_value='';
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
        height: cr(80);
        margin-top: cr(70);
    }

    .check-box {
        width: 80%;
        text-align: right;
        margin-top: cr(10);
        font-size: cr(10);
        @include flex_row;

        .input {
            width: cr(15) ;
            height: cr(15) ;
            margin-left: cr(10);
            border: 2px solid #CCCCCC;
            border-radius: cr(1);

            >img{
                width: cr(14);
                height: cr(14);
                margin-top: cr(0.5);
                margin-left: cr(0.5);
            }
        }
    }

    .btn-nav {
        width: 80%;
        @include flex_row;
        justify-content: center;
        margin: cr(20) 0 cr(10);
    }
}
</style>
