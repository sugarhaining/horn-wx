<template>
<div class='main-wrap'>
    <div class="bg bg-img"></div>
    <div class="add-btn" @click="addLost">
        <add-btn></add-btn>
    </div>
    <info-detail v-if="infoShow" :text='currText' @cancel='hiddenInfo'></info-detail>
    <header class="header">失物招领</header>
    <div class="main">
        <div class="item" v-for="(list,index) in data" :key="index">
            <div class="tag">{{list.lostTag}}</div>
            <image :src="QINIU_BASE_URL+list.lostImage"></image>
            <div class="right">
                <div class="list-content">{{list.showLostDescription}}</div>
                <div class="btn" @click="jump(list)">
                    <s-button value='我是失主' :border='border' size='small' :font='font'></s-button>
                </div>
                <div class="time">
                    {{list.trulyLostDate}}
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import sButton from '@/components/s-button.vue'
import infoDetail from '@/components/info-detail.vue'
import addBtn from '@/components/add-btn.vue'
import {jumpTo,showToast} from '@/utils/index'
import {getPageIndexes,getLostsInfo} from '@/apis/lost'
import {stampToDate} from '@/utils/time'
import {QINIU_BASE_URL} from '@/utils/config'
import { showLoading, hideLoading } from '../../utils';
export default {
    data() {
        return {
            infoShow:false,
            data: [],
            pageIndexes:0,//总分页数
            pageIndex:1,
            dataFree:true,
            QINIU_BASE_URL,
            border: {
                width: '1',
                type: 'solid',
                color: '#67C23A'
            },
            font: {
                size: 12,
                color: '#67C23A',
            }
        }
    },
    components: {
        sButton,infoDetail,addBtn
    },
    methods:{
        jump(list){
            jumpTo('/pages/retrieve/main',list)
        },
        addLost(){
            jumpTo('/pages/open/main')
        },
        async _getPageIndexes(){
            try{
                let res=await getPageIndexes({amount:7})
                this.pageIndexes=res.data.indexNumber
            }catch(e){

            }
        },
        async _getLosts(){
                try{
                    showLoading('数据获取中')
                    let res=await getLostsInfo({pageIndex:this.pageIndex++});
                    this.data=res.data;
                    this._initInfoContent()
                }catch(e){
                    hideLoading()
                }
                hideLoading()
        },
        _initInfoContent(){
            this.data.forEach(item=>{
                let res=item.lostDescription.length>20?item.lostDescription.slice(0,20)+'...':item.lostDescription;
                this.$set(item,'showLostDescription',res)
                item.trulyLostDate=stampToDate(item.lostDate)
            })
        },
        async _getBottomLosts(){
            if(this.pageIndex<=this.pageIndexes){
                let res=await getLostsInfo({pageIndex:this.pageIndex++});
                this.data=this.data.concat(res.data)
                this._initInfoContent()
            }else{
                showToast('没有更多数据了')
                this.dataFree=false;
            }
        }
    },
    onReachBottom(){
        if(this.dataFree){
            this._getBottomLosts()
        }
    },
    async onShow(){
        this.pageIndex=1;
        this.dataFree=true;
        await this._getPageIndexes();
        await this._getLosts()
    }
}
</script>

<style lang="scss" scoped>
.main-wrap {
    height: auto;
    padding-top: cr(10);
    box-sizing: border-box;
    .bg{
        width: 100%;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
    }
    .add-btn{
        position: fixed;
        bottom: cr(30);
        right: cr(30);
        z-index: 999;
    }
    .header {
        color: white;
        font-size: $index_font_size;
        text-align:center;
    }

    .main {
        width: 90%;
        margin: cr(20) auto;
        @include flex_column;

        .item {
            width: 100%;
            height: cr(160);
            background-color: rgba(255,255,255,0.64);
            border-radius: cr(6);
            box-shadow: cr(1) cr(1) cr(10) cr(3) rgba(187,187,187,0.64);
            padding:0 cr(10);
            @include flex_row;
            font-size: cr(12);
            margin-bottom: cr(30); 
            &:last-child{
                margin-bottom: cr(10);
            }
            position: relative;
            .tag{
                height: cr(20);
                line-height: cr(20);
                color: white;
                padding: cr(2) cr(5);
                box-sizing: border-box;
                font-size: cr(12);
                position: absolute;
                top: cr(-20);
                left: cr(40);
                border-radius: cr(4) cr(4) 0 0;
                background-color: red;
            }
            >image{
                width: cr(140);
                height: cr(140);
                border-radius: cr(2);
            }
            .right{
                flex: 2;
                margin-left: cr(10);
                @include flex_column;
                .list-content{
                    padding: cr(20) cr(10);
                    box-sizing: border-box;
                    height: cr(80);
                    overflow: hidden;
                }
                .btn{
                    margin-left: cr(30);
                }
                .btn,.time{
                    margin-top: cr(10);
                    align-self: flex-start;
                }
                .time{
                    align-self: flex-end;
                }
            }
        }
    }
}
</style>
