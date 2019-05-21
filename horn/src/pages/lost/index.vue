<template>
<div class='main bg-img'>
    <div class="add-btn" @click="addLost">
        <add-btn></add-btn>
    </div>
    <info-detail v-if="infoShow" :text='currText' @cancel='hiddenInfo'></info-detail>
    <header class="header">喇叭失物招领</header>
    <div class="main">
        <div class="item" v-for="(list,index) in data" :key="index">
            <div class="tag">{{list.tag}}</div>
            <image mode='center' src="http://img95.699pic.com/photo/50029/4476.jpg_wh300.jpg" @click="preview('http://img95.699pic.com/photo/50029/4476.jpg_wh300.jpg')"></image>
            <div class="right">
                <div class="list-content" @click="showInfo(list.content)">{{list.content}}</div>
                <div class="btn" @click="jump(list)">
                    <s-button value='我是失主' :border='border' size='small' :font='font'></s-button>
                </div>
                <div class="time">
                    {{list.timeStamp}}
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
import {preview,jumpTo} from '@/utils/index'
export default {
    data() {
        return {
            infoShow:false,
            currText:'',
            data: [{
                    content: '在海棠门口见到的。已经放到1号楼楼管哪里惹在海棠门口见到的。已经放到1号楼楼管哪里惹在海棠门口见到的。已经放到1号楼楼管哪里惹',
                    timeStamp: '2019.4.29',
                    tag: '水杯',
                    lost_contact: "qq",
                    lost_information: "123456789",
                },
                {
                    content: '在海棠门口见到的。已经放到1号楼楼管哪里惹在海棠门口见到的。',
                    timeStamp: '2019.4.29',
                    tag: '水杯',
                    lost_contact: "qq",
                    lost_information: "123456789",
                },
            ],
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
        preview(path){
            preview([path])
        },
        showInfo(text){
            this.currText=text;
            this.infoShow=true;
        },
        hiddenInfo(){
            this.infoShow=false;
        },
        jump(list){
            jumpTo('/pages/retrieve/main',list)
        },
        addLost(){
            jumpTo('/pages/open/main')
        }
    }
}
</script>

<style lang="scss" scoped>
.main {
    width: 100%;
    padding-top: cr(10);
    box-sizing: border-box;
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
            height: cr(140);
            background-color: rgba(255,255,255,0.64);
            border-radius: cr(6);
            box-shadow: cr(1) cr(3) cr(30) cr(5) rgba(187,187,187,0.64);
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
                width: cr(150);
                height: cr(120);
                border-radius: cr(2);
            }
            .right{
                flex: 2;
                margin-left: cr(4);
                @include flex_column;
                .list-content{
                    padding: cr(10) 0 0 0;
                    box-sizing: border-box;
                    height: cr(80);
                    overflow: hidden;
                }
                .btn,.time{
                    margin-top: cr(5);
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
