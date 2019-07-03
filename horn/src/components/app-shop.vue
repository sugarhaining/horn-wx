<template>
<div class='main-wrap'>
    <span>喇叭应用</span>
    <nav class="tabs">
        <div class="tab-item" v-for="(item,index) in tabLists" :key="index" @click.stop='jump(item)'>
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
            tabLists: [
                {
                    text: '成绩查询',
                    jump: 'default',
                    left:-16,
                    top:-414,
                    path:'http://ehall.xidian.edu.cn/jwapp/sys/cjcx/*default/index.do?amp_sec_version_=1&gid_=bVpObk1BaTYvdDROV2NaODhyYVdGUytzcktHc01VTk1tSXFxSjVUN3pkVXI5TkJ3OGxRTlM4am9FVnNyQ0NDZmo5dG0zZmljdElWdmFZOUtDUmQzeUE9PQ&EMAP_LANG=zh&THEME=cherry#/cjcx'
                },
                {
                    text: '空教室查询',
                    jump: 'default',
                    left:-12,
                    top:7,
                    path:'http://ehall.xidian.edu.cn/jwapp/sys/kxjas/*default/index.do?amp_sec_version_=1&gid_=eUJkM0IyMFhxRWVTemFPOUtaSVErcHdOWld3TkJGMkZWMGpCRUQ5dHJZQkRxRGlVT0NjWnhmN24zNEVhTGliblN5Z0FrRFhwRlZFMFU1Vkx4UWs3T0E9PQ&EMAP_LANG=zh&THEME=cherry#/kxjas'
                },
                {
                    text: '后勤报修',
                    jump: 'default',
                    left:-293,
                    top:7,
                    path:'http://1000.xidian.edu.cn/index.php/Request/request?amp_sec_version_=1&gid_=WXpCRFUzckxQMkUwbWU5TTBBRzFHdkNBOHpOUk0xU1JLaG1JbTFXcjJRaUcxT0E5a3RIeXFSYkxlV1c0Zmxydm10c002QzNJRXB5RnpVNFFzdzlNQVE9PQ&EMAP_LANG=zh&THEME=cherry'
                },
                {
                    text: '失物招领',
                    jump: 'lost',
                    left:-107,
                    top:7,
                },
                {
                    text: '课表查询',
                    jump: 'default',
                    left:-107,
                    top:-98,
                    path:'http://ehall.xidian.edu.cn/jwapp/sys/wdkb/*default/index.do?amp_sec_version_=1&gid_=bVpObk1BaTYvdDROV2NaODhyYVdGUytzcktHc01VTk1tSXFxSjVUN3pkVXI5TkJ3OGxRTlM4am9FVnNyQ0NDZmo5dG0zZmljdElWdmFZOUtDUmQzeUE9PQ&EMAP_LANG=zh&THEME=cherry#/xskcb'
                },
                {
                    text: '缴费',
                    jump: 'default',
                    left:-293,
                    top:-414,
                    path:'https://payment.xidian.edu.cn/MNetWorkUI/showPublic'
                },
                {
                    text: '小喇叭管理员',
                    jump: 'login',
                    left:-293,
                    top:-202
                },
            ]
        }
    },
    methods: {
        jump(item) {
            if (item.jump === 'default') {
                jumpTo(`/pages/url/main`,{
                  path:item.path
                })
                return ;
            }
            jumpTo(`/pages/${item.jump}/main`)
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
                background-image: url('https://www.xdxlb.xyz/images/xdxlb20190614191512.jpg');
                background-size: cr(480) cr(627);
                background-repeat: no-repeat;
            }
        }
    }
}
</style>
