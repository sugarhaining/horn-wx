<template>
<div class='main-wrap' @touchstart='initX' @touchmove='setLeft' @touchend='touchstop'>
    <div class='add-btn' v-show="currPageIndex===0" @click='jump'>
        <add-btn></add-btn>
    </div>
    <div class='fixed-top'>
        <div class='banner-left'>搜索</div>
        <div class='banner-right'>应用</div>
        <div class='float transition' :class='currPageIndex===0?"float-right":"float-left"'></div>
    </div>
    <div class='contain' :class='{"transition": isStopTouch}' :style='{left: isStopTouch ? offsetLeft: rangeXUnit}'>
        <div class='item'>
            <span>喇叭搜索</span>
            <div class="input">
                <s-input :broadcast='broadcastMsg' @update='search'></s-input>
            </div>
            <span class='prompt-info'>
                没搜到想要的信息?<br/>
                点击右下角留言，喇叭会从通知助手回复你
            </span>
            <span class='title-text'>最新问答</span>
            <div class='message-card' v-for="(info,index) in infos" :key='index' @click.stop='toggleExpand(info)'>
                <message-info :info='info' @showFloat='showCanvas'></message-info>
            </div>
        </div>
        <div class='item'>
            <app-shop></app-shop>
        </div>
    </div>
    <share-canvas v-if="ifShowCanvas" @cancel='hiddenCanvas' :info='currList' page='index' :repoId='currRepoid'></share-canvas>
</div>
</template>

<script>
import sInput from './s-input.vue'
import messageInfo from './message-info.vue'
import addBtn from './add-btn.vue'
import appShop from './app-shop.vue'
import shareCanvas from './share-canvas'
import {stampToDate} from '../utils/time'
import {showToast, showLoading,jumpTo,hideLoading} from '../utils/index'
import {getBrandAnswer,getSearchAnswer} from '@/apis/users'
export default {
    props:['autoSearch','searchId'],
    data() {
        return {
            infos: [],
            startX: 0, //触屏动作起点坐标
            startY: 0,
            rangeX: 0, //触屏距离净数字
            rangeY: 0,
            rangeXUnit: 0, //触屏距离带单位
            offsetLeft: this._unitChange(0), //滑动结束后contain容器距左边距的定位距离
            offsetLeftBanner: this._unitChange(0), //滑动结束后contain容器距左边距的定位距离
            currPageIndex: 0, //当前tab页索引
            pages: 2, //tab的数量
            isStopTouch: true, //滑屏是否结束
            broadcastMsg: [],
            pageIndex:0,
            ifShowCanvas:false,
            currList:null,
            autoSearchInfo:'',
            currRepoid:0
        }
    },
    components: {
        sInput,
        messageInfo,
        addBtn,
        appShop,
        shareCanvas
    },
    methods: {
        async search(value){
            showLoading('搜索中')
            let res=await getSearchAnswer({
                keyword:value
            })
            hideLoading()
            if(res.data.data.length===0){
                showToast('相关问答不存在')
            }else{
                this.infos=res.data.data;
                this._initInfos()
            }
        },
        showCanvas(value){
            this.currRepoid=value.id
            this.currList=value;
            this.ifShowCanvas=true;
        },
        hiddenCanvas(){
            this.ifShowCanvas=false;
        },
        initX(e) {
            this.startX = e.clientX;
            this.startY = e.clientY;
            this.isStopTouch = false; //去掉过渡样式
        },
        setLeft(e) {
            this.rangeY = e.clientY - this.startY;
            this.rangeX = e.clientX - this.startX;
            if (this.rangeY > 15 || this.rangeY < -15) {
                this.isStopTouch=true;
            }
            this.rangeXUnit = this._unitChange(this._divideUnit(this.offsetLeft) + this.rangeX);
        },
        toggleExpand(info){
            if(info.expand===false){
                info.show_answer=info.slice_answer;
                info.expand=true;
            }else{
                info.show_answer=info.answer;
                info.expand=false;
            }
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
        },
        jump(){
            jumpTo('/pages/release/main')
        },
        _initInfos(){//数据初始化
            this.infos.forEach(info => {
                this.$set(info,'show_answer','');
                this.$set(info,'slice_answer','');
                this.$set(info,'expand',false);
                info.time=stampToDate(info.createTime * 1000);
                info.show_question=info.question.length >= 35 ? info.question.slice(0,35) + '...' : info.question;
                info.slice_answer=info.answer.length >= 52 ? info.answer.slice(0,52) + '...' : info.answer;
                info.show_answer=info.slice_answer;
            })
        },
        async _getAnswers(){
                try{
                    let res=await getBrandAnswer({
                        pageNumber: this.pageIndex
                    });
                    this.infos=res.data.data.storehouses;
                    this._initInfos()
                }catch(e){
                    
                }
        },
    },
    async onShow(){
        this.pageIndex=0;
        await this._getAnswers()
    },
    async onLoad(options){
        await this._getAnswers()
    }
}
</script>

<style lang="scss" scoped>
.main-wrap {

    .fixed-top {
        width: 100%;
        height: cr(35);
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
    }

    .item {
        width: 50%;
        height: 100%;
        padding-top: cr(5);
        overflow-y: scroll;
        box-sizing: border-box;
        text-align: center;
        color: white;
        position: relative;
        @include flex_column;

        >span {
            font-size: $index_font_size;
            margin-bottom: cr(20);
        }

        .input{
            width: 100%;
            margin-bottom: cr(4);
        }

        .prompt-info {
            font-size: cr(12);
            text-align: left;
            line-height: cr(25);
            margin-bottom: cr(10);
        }

        .title-text {
            width: 90%;
            text-align: left;
            font-size: cr(12);
            color: #000;
            margin-bottom: cr(5);
        }

        .message-card {
            margin-top: cr(6);
            margin-bottom: cr(6);
            box-sizing: border-box;
            width: 90%;
            &:last-child {
              margin-bottom: cr(66);
            }
        }

    }
}

.float-left {
    left: 52%;
}

.float-right {
    right: 52%;
}

.transition {
    transition: all 0.14s
}
.add-btn {
    width: cr(50);
    height: cr(50);
    border-radius: 50%;
    z-index: 999;
    position: fixed;
    left: 600rpx;
    bottom: 100rpx;
}
</style>
