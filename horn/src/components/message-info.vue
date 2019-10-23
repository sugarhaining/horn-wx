<template>
<div class='main-wrap'>
    <div class='info-quetion'>
        <div>{{info.show_question}}?</div>
        <img src="/static/icons/share.png" @click="show">    
    </div>
    <div class='info-answer'>
        <image src='/static/images/2fdda3cc7cd98d10ae46f020233fb80e7bec9015.png' class='icon' />
        <span>:</span><span>{{info.show_answer}}</span>
    </div>
    <div class="footer-nav">
        {{info.time}}
    </div>
</div>
</template>

<script>
import sButton from './s-button'
import {stampToDate} from '../utils/time'
export default {
    props: ['info'],
    data() {
        return {
          
        }
    },
    methods: {
        show(){
            this.$emit('showFloat',this.info)
        }
    },
    components:{
        sButton
    }
}
</script>

<style lang="scss" scoped>
.main-wrap {
    width: 100%;
    @include flex_column;
    color: rgba(16, 16, 16, 1);
    border-radius: cr(6);
    box-shadow: cr(1) cr(1) cr(10) cr(1) rgba(187, 187, 187, 0.64);
    padding: cr(2) cr(5);
    box-sizing: border-box;
    background-color: rgba(255,2555,255,0.8);

    >div {
        width: 100%;
        font-size: cr(12);
        text-align: left;
    }

    .info-quetion {
        width: 98%; 
        font-weight: 800;
        margin-bottom: cr(4 );
        margin-left: cr(10);
        margin-top: cr(7); 
        padding: {
            right: cr(8);
        }
        box-sizing: border-box;
        @include flex_row;
        justify-content: space-between;
        >img{
            width: cr(12);
            height: cr(12);
            min-width: cr(12);
        }
    }

    .info-answer {
        padding-left: cr(10);
        @include flex_row;
        align-items:flex-start;

        image {
            width: cr(25);
            height: cr(25);
        }
        >span{
            padding-top: cr(5);
        }
        >span:nth-of-type(2){
            padding-top: cr(5);
            width: 80%;
            word-break: break-all;
        }
    }
    .footer-nav{
        width: 94%;
        margin-top: cr(6);
        margin-bottom: cr(2);
        text-align: right;
    }
}
</style>
