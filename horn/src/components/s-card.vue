<template>
<div class='main' @click="jump">
    <div class="left">
        <img :src="info.image">
    </div>
    <div class="right">
        <div class="top">
            <div class="name">{{info.name}}</div>
            <div class="time">{{info.time}}</div>
        </div>
        <div class="bottom">{{info.show_question}}</div>
    </div>
</div>
</template>

<script>
import {jumpTo} from '@/utils/index'
import {stampToDate} from '@/utils/time'
export default {
    props: ['info'],
    data() {
        return {

        }
    },
    methods:{
        jump(){
            jumpTo('/pages/reply/main',this.info)
        } 
    }
}
</script>

<style lang="scss" scoped>
.main {
    width: 100%;
    height: cr(70);
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: cr(6);
    box-shadow: cr(1) cr(1) cr(10) cr(1) rgba(187, 187, 187, 1);
    @include flex_row;
    padding: cr(6) cr(6) cr(2);
    box-sizing: border-box;

    .left {
        width: cr(40);
        height: cr(40);
        @include flex-column;
        position: relative;

        >img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }

    .right {
        margin-left: cr(10);
        padding-bottom: cr(5);
        box-sizing: border-box;
        height: 100%;
        flex: 2;
        @include flex_column;
        justify-content: space-between;
        line-height: cr(20);

        .top,
        .bottom {
            width: 100%;
            height: cr(20);
        }

        .top {
            @include flex_row;
            justify-content: space-between;

            .name {
                font-size: cr(14);
                width: cr(120);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .time {
                font-size: cr(12);
                color: #076E9E;
            }
        }

        .bottom {
            width: cr(210);
            font-size: cr(12);
            color: #076E9E;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: cr(4);
        }
    }
}
</style>
