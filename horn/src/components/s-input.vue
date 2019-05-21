<template>
<div class='main-wrap'>
    <div class='input-box'>
        <input type='text' :placeholder='broadcast[index]' class='input' maxlength='15' v-model="searchMsg" @focus='stopInterval' @blur='broadcastChange'>
    </div>
    <button class='search-btn' @click='searchInfo'>搜索</button>
</div>
</template>

<script>
import {
    showToast
} from '../utils/index'
export default {
    props: ['broadcast'],
    data() {
        return {
            index: 0,
            searchMsg: '',
            timer: null, //定时器实例
        }
    },
    methods: {
        broadcastChange() {
            let that = this;
            this.timer = setInterval(() => {
                if (that.index < that.broadcast.length - 1) {
                    that.index++;
                } else {
                    that.index = 0;
                }
                that.searchMsg = that.broadcast[that.index];
            }, 4000);
        },
        searchInfo() {
            console.log(this.searchMsg);
            showToast(this.searchMsg, 'loading');
        },
        stopInterval() {
            clearInterval(this.timer)
        }
    },
    onLoad() {
        this.broadcastChange() //开启广播消息轮播
    }
}
</script>

<style lang="scss" scoped>
.main-wrap {
    width: 100%;
    height: cr(35);
    padding: 0 cr(20) 0 cr(35);
    box-sizing: border-box;
    @include flex_row;
    justify-content: space-between;

    .input-box {
        width: 70%;
        height: cr(35);

        .input {
            font-size: cr(12);
            border: 1px solid rgba(187, 187, 187, 1);
            border-radius: cr(5);
            text-align: left;
            height: 100%;
            color: #888888;
            background-color: white;
            padding: 0 cr(5);
            box-sizing: border-box;
        }
    }

    .search-btn {
        height: cr(32);
        width: cr(60);
        font-size: cr(12);
        line-height: cr(35);
        border-radius: cr(5);
        margin-top: cr(1);
        padding: 0;
        background-color: white;
        color: #000;
        z-index: 999;

        &:after {
            content: '';
            display: none;
        }

        &:active {
            background-color: #CCCCCC;
        }
    }
}
</style>
