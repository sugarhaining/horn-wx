<template>
<div class='main-wrap'>
    <div class='input-box'>
        <input type='text' :placeholder='broadcast[index]' class='input' maxlength='15' v-model="searchMsg" @focus='stopInterval' @blur='broadcastChange'>
        <button class='search-btn' @click='searchInfo'>搜索</button>
    </div>
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
            this.timer = setInterval(() => {
                if (this.index < this.broadcast.length - 1) {
                    this.index++;
                } else {
                    this.index = 0;
                }
                this.searchMsg = this.broadcast[this.index];
            }, 4000);
        },
        searchInfo() {
            this.$emit('update',this.searchMsg)
        },
        stopInterval() {
            this.searchMsg=''
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
        width: 94%;
        height: cr(35);
        @include flex_row;

        .input {
            width: 75%;
            font-size: cr(12);
            border-radius: cr(5) 0 0 cr(5);
            text-align: left;
            height: 100%;
            color: #888888;
            background-color: white;
            padding: 0 cr(5);
            box-sizing: border-box;
        }
        .search-btn {
            height: cr(35);
            width: 25%;
            font-size: cr(12);
            line-height: cr(35);
            border-radius: 0 cr(5) cr(5) 0;
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
}
</style>
