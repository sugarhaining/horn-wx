<template>
<div class='main-wrap'>
    <span>喇叭应用</span>
    <nav class="tabs">
        <div class="tab-item" v-for="(item,index) in tabLists" :key="index" @click.stop='jump(item.jump)'>
            <div :style="{backgroundPosition:item.active_position}"></div>
            <span>{{item.text}}</span>
        </div>
    </nav>
</div>
</template>

<script>
import {
    jumpTo,
    showToast
} from '@/utils/index'
export default {
    data() {
        return {
            tabLists: [{
                    text: '小喇叭管理员',
                    jump: 'login',
                    left:-293,
                    top:-200,
                },
                {
                    text: '校车查询',
                    jump: 'default',
                    left:-16,
                    top:-410,
                },
                {
                    text: '喇叭广播',
                    jump: 'default',
                    left:-107,
                    top:-305,
                },
                {
                    text: '成绩查询',
                    jump: 'default',
                    left:-107,
                    top:7,
                },
                {
                    text: '电话查询',
                    jump: 'default',
                    left:-12,
                    top:7,
                },
                {
                    text: '学校地图',
                    jump: 'default',
                    left:-293,
                    top:7,
                },
                {
                    text: '失物招领',
                    jump: 'lost',
                    left:-293,
                    top:-98,
                },
                {
                    text: '一卡通办理',
                    jump: 'default',
                    left:-107,
                    top:-98,
                },
                {
                    text: '最新通知',
                    jump: 'default',
                    left:-293,
                    top:-410,
                },

            ]
        }
    },
    methods: {
        jump(path) {
            if (path === 'default') {
                showToast('功能未开放')
                return false;
            }
            jumpTo(`/pages/${path}/main`)
        },
        _bgStyle() {
            this.tabLists.forEach(list=>{
                this.$set(list,'active_position',list.left*2.34375+'rpx'+' '+list.top*2.34375+'rpx')
            })   
        }
    },
    onLoad(){
        this._bgStyle()
    }
}
</script>

<style lang="scss" scoped>
.main-wrap {
    @include flex_column;

    >span {
        font-size: cr(20);
        color: white;
    }

    .tabs {
        width: 80%;
        @include flex_row;
        flex-wrap: wrap;
        margin-top: cr(80);

        .tab-item {
            width: 33%;
            @include flex_column;
            font-size: cr(12);
            color: #000;
            margin-bottom: cr(15);

            >div {
                width: cr(75);
                height: cr(75);
                background-image: url('http://m.qpic.cn/psb?/V14KNPy63FzKSJ/qcW0Sg4schP5nEjJ0mh71kErWN*HXf5oE4HgJ1PulRo!/b/dLYAAAAAAAAA&bo=zgKsAwAAAAADB0E!&rf=viewer_4');
                // background-position: cr(-293) cr(-410);
                background-size: cr(480) cr(627);
                background-repeat: no-repeat;
            }
        }
    }
}
</style>
