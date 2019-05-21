<template>
<div class='main-wrap'>
    <div class='info-quetion'>{{info.question}}?</div>
    <div class='info-answer'>
        <image src='/static/images/2fdda3cc7cd98d10ae46f020233fb80e7bec9015.png' class='icon' />
        <span>:{{info.show_answer}}</span>
    </div>
    <div class="info-time">{{info.time}}</div>
</div>
</template>

<script>
export default {
    props: ['info'],
    data() {
        return {

        }
    },
    methods: {
        
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
    background-color: white;

    >div {
        width: 100%;
        font-size: cr(12);
        text-align: left;
    }

    .info-quetion {
        font-weight: 600;
        margin-bottom: cr(10);
    }

    .info-answer {
        padding-left: cr(10);
        @include flex_row;
        align-items:flex-start;

        image {
            width: cr(40);
            height: cr(40);
        }
        >span{
            padding-top: cr(15);
            width: 80%;
        }
    }

    .info-time {
        text-align: right;
    }
}
</style>
