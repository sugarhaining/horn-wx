<template>
<div class='main-wrap bg-img'>
    <div class="panel-top">
        <panel-top :identity='1'></panel-top>
    </div>
    <div class="message-show">
        <div class="item" v-for="(item,index) in questionArr" :key='index'>
            <s-card :info='item'></s-card>
        </div>
    </div>
</div>
</template>

<script>
import panelTop from '@/components/panel-top.vue'
import sCard from '@/components/s-card.vue'
import {getAllQuestions,getPageAmounts} from '@/apis/manager'
import {showToast} from '@/utils/index'
export default {
    data() {
        return {
            identity: 0,
            pageIndex:1,
            questionArr: [],
            pagaindexes:0,//总的分页数
            dataFree:true
        }
    },
    methods:{
        async _initQuestions(){
            try{
                let res=await getAllQuestions({pageIndex:this.pageIndex++})
                this.questionArr=res.data
            }catch(e){
                showToast('获取信息失败')
            }
        },
        async _initPageAmounts(){
            try{
                let res=await getPageAmounts({amount:7})
                this.pagaindexes=res.data.indexNumber
            }catch(e){
                
            }
        },
        async _reachBottomInitQuestions(){
            if(this.pageIndex<=this.pagaindexes){
                try{
                    let res=await getAllQuestions({
                        pageIndex:this.pageIndex++
                    })
                    this.questionArr=this.questionArr.concat(res.data)
                }catch(e){

                }
            }else{
                showToast('没有更多数据了')
                this.dataFree=false;
            }
        }
    },
    components: {
        panelTop,sCard
    },
    onReachBottom(){
        if(this.dataFree){
            this._reachBottomInitQuestions()
        }
    },
    async onShow(){
        this.identity=this.$mp.query.position;
        this.pageIndex=1;
        this.dataFree=true;
        await this._initPageAmounts();
        await this._initQuestions();
    }
}
</script>

<style lang="scss" scoped>
.main-wrap {
    position: relative;
    .panel-top {
        width: 100%;
        background-color: transparent;
    }

    .message-show {
        width: 100%;
        padding: 0 cr(15);
        box-sizing: border-box;
        margin-top: cr(10);
        @include flex_column;
        .item{
            width: 100%;
            margin-bottom: cr(10);
        }
    }
}
</style>
