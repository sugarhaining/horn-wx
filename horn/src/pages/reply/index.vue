<template>
<div class='main-wrap bg-img'>
    <div class="float-modal">
        <img :src="info.image">
        <div class="name">{{info.name}}</div>
        <div class="content">{{info.question}}</div>
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
    showToast,
    redirectTo
} from '@/utils/index'
import {answerQuestions} from '@/apis/manager'
import { navigatorBack } from '../../utils';
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
                    id:this.info.id,
                    answer:this.answer_value
                })
                if(res.data.code!==0){
                    showToast('问题已失效');
                } else if (res.data.code === 87014) {
                    showToast('请修正敏感词后重新回复');
                } else{
                    showToast('回答成功','success')
                    setTimeout(this._jumpManager,500)
                }
            }catch(e){
                showToast('回复失败，稍后重试')
            }
        },
        _jumpManager(){
            navigatorBack(1)
        }
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
