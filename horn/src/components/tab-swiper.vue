<template>
<div class='main-wrap' @touchstart='initX' @touchmove='setLeft' @touchend='touchstop'>
    <div class='fixed-top'>
        <div class='banner-left'>搜索</div>
        <div class='banner-right'>应用</div>
        <div class='float transition' :class='currPageIndex===0?"float-right":"float-left"'></div>
    </div>
    <div class='contain' :class='{"transition":isStopTouch}' :style='{left:isStopTouch?offsetLeft:rangeXUnit}'>
        <div class='item'>
            <span>喇叭搜索</span>
            <s-input :broadcast='broadcastMsg'></s-input>
        </div>
        <div class='item'>
            <span>喇叭应用</span>
        </div>
    </div>
</div>
</template>

<script>
import sInput from './s-input.vue'
export default {
    data() {
        return {
            startX: 0, //触屏动作起点坐标
            rangeX: 0, //触屏距离净数字
            rangeXUnit: 0, //触屏距离带单位
            offsetLeft: this._unitChange(0), //滑动结束后contain容器距左边距的定位距离
            offsetLeftBanner: this._unitChange(0), //滑动结束后contain容器距左边距的定位距离
            currPageIndex: 0, //当前tab页索引
            pages: 2, //tab的数量
            isStopTouch: true, //滑屏是否结束
            broadcastMsg:['五一放假','想喇叭了吗','期末考试','校车安排','空教室预约']
        }
    },
    components: {
      sInput  
    },
    methods: {
        initX(e) {
            this.startX = e.clientX;
            this.isStopTouch = false; //去掉过渡样式
        },
        setLeft(e) {
            this.rangeX = e.clientX - this.startX;
            this.rangeXUnit = this._unitChange(this._divideUnit(this.offsetLeft) + this.rangeX);
        },
        touchstop() {
            this.isStopTouch = true; //添加过渡样式
            if (this.currPageIndex === 0) {
                if (this.rangeX > 10) {
                    this.offsetLeft = this._unitChange(0);
                } else if (this.rangeX <= -50) {
                    this.offsetLeft = this._unitChange(-(++this.currPageIndex) * 750);
                }
            } else if (this.currPageIndex === (this.pages - 1)) {
                if (this.rangeX <= 0) {
                    this.offsetLeft = this._unitChange(-this.currPageIndex * 750);
                } else if (this.rangeX >= 50) {
                    this.offsetLeft = this._unitChange(-(--this.currPageIndex) * 750);
                }
            } else {
                if (this.rangeX <= -50) {
                    this.offsetLeft = this._unitChange(-(++this.currPageIndex) * 750);
                } else if (this.rangeX > 50) {
                    this.offsetLeft = this._unitChange(-(--this.currPageIndex) * 750);
                }
            }
            this.rangeX = 0;
            this.rangeXUnit = this.offsetLeft;
        },
        _unitChange(value) { //单位转换  15-->15rpx
            return value + 'rpx';
        },
        _divideUnit(value) { //去除单位   15rpx-->15
            let index = value.indexOf('rpx');
            return +(value.slice(0, index));
        }
    }
}
</script>

<style lang="scss" scoped>
.main-wrap {
    .fixed-top {
        width: 100%;
        height: cr(35);
        background-color: orange;
        position: fixed;
        top: 0;
        left: 0;
        @include flex_row;
        justify-content: center;
        color: white;
        font-size: cr(12);

        .banner-left,
        .banner-right {
            padding: 0 cr(5);
            box-sizing: border-box;
        }

        .banner-left {
            text-align: right;
        }

        .banner-right {
            text-align: left;
        }

        .float {
            position: absolute;
            bottom: 0;
            width: 6%;
            height: 4px;
            border-radius: cr(5);
            background-color: white;
        }
    }

    .contain {
        position: absolute;
        width: 200%;
        height: 90%;
        top: 10%;
        left: cr(0);
        display: flex;
        align-items: center;
        text-align: center;
        background-color: orange;
    }
    .item{
        width: 50%;
        height: 100%;
        padding-top: cr(5);
        box-sizing: border-box; 
        text-align: center;
        color: white;
        @include flex_column;
        >span{
            font-size: cr(18);
            margin-bottom: cr(25);
        }
    }
}

.float-left{
    left:52%;
}
.float-right{
    right:52%;
}

.transition {
    transition: all 0.5s
}
</style>
