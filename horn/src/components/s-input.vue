<template>
<div class='main-wrap'>
    <div class='input-box'>
        <input type='text' :value='broadcast[index]' class='input' maxlength='15' v-model="searchMsg" @focus='stopInterval' @blur='broadcastChange'>
        <button class='search-btn' @click='searchInfo'>搜索</button>
   </div>
    </div>
</template>

<script>
import {showToast} from '../utils/index'
export default {
    props: ['broadcast'],
    data() {
        return {
            index: 0,
            searchMsg:this.broadcast[0],
            timer:null,//定时器实例
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
                that.searchMsg=that.broadcast[that.index];
            }, 4000);
        },
        searchInfo(){
            console.log(this.searchMsg);
            showToast('搜索中','loading');
        },
        stopInterval(){
            clearInterval(this.timer)
        }
    },
    computed: {

    },
    onLoad() {
        this.broadcastChange() //开启广播消息轮播
    }
}
</script>

<style lang="scss" scoped>
.main-wrap {
    width: 100%;
    padding: 0 cr(80);

    .input-box {
        width: 80%;
        margin: 0 auto;
        height: cr(35);
        position: relative;
        .input {
            font-size: cr(12);
            border: 1px solid rgba(187,187,187,1);
            border-radius: cr(5); 
            text-align: left;
            height: 100%;
            color: #888888;
            background-color: white;
            padding:0 cr(5);
            box-sizing: border-box;
        }
        .search-btn{
            position: absolute;
            right: 0;
            top: 0;
            height: 100%;
            width: cr(40);
            font-size: cr(12);
            line-height: cr(35);
            border-radius: 0;
            margin-top: cr(1);
            padding: 0;
            background-color: transparent;
            color: #000;
            z-index: 999; 
            &:after{
                content:'';
                display: none;
            }
            &:active{
                background-color: #CCCCCC;
            }
        }
    }

}
</style>
