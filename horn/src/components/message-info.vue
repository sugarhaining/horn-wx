<template>
<div class='main-wrap'>
    <div class='info-quetion'>{{info.repoQuestion}}?</div>
    <div class='info-answer'>
        <image src='/static/images/2fdda3cc7cd98d10ae46f020233fb80e7bec9015.png' class='icon' />
        <span>:</span><span>{{info.repoAnswer}}</span>
    </div>
    <div class="footer-nav">
        <div class="info-time">{{info.repoDate}}</div>
        <div class="share-btn" @click="show">
            <s-button value='点击分享' size='small'></s-button>
        </div>  
    </div>
</div>
</template>

<script>
import sButton from './s-button'
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
    },
    onLoad(){

    }
}
</script>

<style lang="scss" scoped>
.main-wrap {
    width: 100%;
    @include flex_column;
    color: rgba(16, 16, 16, 1);
    border-radius: cr(6);
    box-shadow: cr(1) cr(3) cr(30) cr(1) rgba(187, 187, 187, 0.64);
    padding: cr(2) cr(5);
    box-sizing: border-box;
    background-color: rgba(255,2555,255,0.8);

    >div {
        width: 100%;
        font-size: cr(12);
        text-align: left;
    }

    .info-quetion {
        font-weight: 600;
        margin-bottom: cr(10);
        margin-left: cr(10);
        margin-top: cr(7); 
    }

    .info-answer {
        padding-left: cr(10);
        @include flex_row;
        align-items:flex-start;

        image {
            width: cr(30);
            height: cr(30);
        }
        >span{
            padding-top: cr(5);
        }
        >span:nth-of-type(2){
            padding-top: cr(5);
            width: 80%;
        }
    }
    .footer-nav{
        width: 80%;
        @include flex_row;
        justify-content: space-between; 
        margin-top: cr(6);
        margin-bottom: cr(8);
        .info-time {
            text-align: right;
        }
    }
}
</style>
