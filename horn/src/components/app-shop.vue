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
            tabLists: [{
                    text: '成绩查询',
                    jump: 'default',
                    left:-15,
                    top:-338,
                    path:'https://www.xdxlb.com/xiaoyuan/jwapp/sys/cjcx/*default/index.do?amp_sec_version_=1&gid_=ZjJFZVNULzJqamdKSlgyYVcvZ2RXS09kaEVXRkxZVFBXUUphMmtaRnd0aWdIdDJWRFBYTDJrU2c1TlB4Y2JRb0tiSmQ5YnZOWVUzRzNsdEgzd2o3VEE9PQ&EMAP_LANG=zh&THEME=cherry#/cjcx'
                }, {
                    text: '空教室查询',
                    jump: 'default',
                    left:-107,
                    top:-120,
                    path:'https://www.xdxlb.com/xiaoyuan/jwapp/sys/kxjas/*default/index.do?amp_sec_version_=1&gid_=ZjJFZVNULzJqamdKSlgyYVcvZ2RXS09kaEVXRkxZVFBXUUphMmtaRnd0aWdIdDJWRFBYTDJrU2c1TlB4Y2JRb0tiSmQ5YnZOWVUzRzNsdEgzd2o3VEE9PQ&EMAP_LANG=zh&THEME=cherry#/kxjas'
                }, {
                    text: '后勤报修',
                    jump: 'default',
                    left:-293,
                    top:-120,
                    path:'https://www.xdxlb.com/houqin/index.php/Request/request?amp_sec_version_=1&gid_=elplVFdBRFRmdHB1c2hacTJMdHJibG01SHVvb2pidjBHMVBlKzZqRTVNUjlhbkhzSDgwQkVEdDNURVVOOGhYMXQ5ajBKN01ob2xnbUpQVnAvaTVCemc9PQ&EMAP_LANG=zh&THEME=cherry'
                }, {
                    text: '失物招领',
                    jump: 'lost',
                    left:-107,
                    top:-10,
                },
                {
                    text: '课表查询',
                    jump: 'default',
                    left:-390,
                    top:-230,
                    path:'https://www.xdxlb.com/xiaoyuan/jwapp/sys/wdkb/*default/index.do?amp_sec_version_=1&gid_=ZjJFZVNULzJqamdKSlgyYVcvZ2RXS09kaEVXRkxZVFBXUUphMmtaRnd0aWdIdDJWRFBYTDJrU2c1TlB4Y2JRb0tiSmQ5YnZOWVUzRzNsdEgzd2o3VEE9PQ&EMAP_LANG=zh&THEME=cherry#/xskcb'
                },
                {
                    text: '缴费',
                    jump: 'default',
                    left:-15,
                    top:-10,
                    path:'https://payment.xidian.edu.cn/NetWorkUI/slogin.html'
                }, {
                    text: '小喇叭管理员',
                    jump: 'login',
                    left:-107,
                    top:-446,
                }, {
                    text: '图书馆相关',
                    jump: 'default',
                    left:-15,
                    top:-447,
                    path:'http://202.117.124.133/?amp_sec_version_=1&gid_=RitQVFp5NkhGNEhtSERLRnA3bXF6UVpBSC9rS29yMEc1dnk4aEFNWXBsMEhaRmNkRE5kMjVCZ0kwVldGazRxOUE5aFJFOTVEV3E4YVpNa2VsbzJZbWc9PQ&EMAP_LANG=zh&THEME=cherry'
                },]
        }
    },
    methods: {
        jump(item) {
            if (item.jump === 'default') {
                /* jumpTo(`/pages/url/main`,{
                  path: item.path
                }) */
                showToast('该服务将尽快开通');
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
                background-image: url('http://m.qpic.cn/psb?/V14KNPy63FzKSJ/EgjG1qwmxAYBHu.cF4vTFlTUhb7B3zUF07JzpRJmaCU!/b/dDUBAAAAAAAA&bo=zgIlAwAAAAADB8g!&rf=viewer_4');
                background-size: cr(480) cr(555);
                background-repeat: no-repeat;
            }
        }
    }
}
</style>
