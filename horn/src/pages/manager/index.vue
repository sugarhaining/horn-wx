<template>
<div class='main-wrap'>
  <div class="for-bg-img bg-img"></div>
  <div class="panel-top">
      <panel-top :identity='identity'></panel-top>
  </div>
  <div class="empty-error-info" v-if="questionArr.length === 0">空空如也&nbsp;>_></div>
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
import {showToast,showLoading,hideLoading} from '@/utils/index'
import {stampToDate} from '@/utils/time'
export default {
    data() {
        return {
            identity: 0,
            pageIndex:0,
            questionArr: [],
            pagaindexes:0,//总的分页数
            dataFree:true
        }
    },
    methods:{
        async _initQuestions(){
            try{
                showLoading('数据获取中')
                let res=await getAllQuestions({pageNumber:this.pageIndex++})
                this.questionArr=res.data.data.questions
                this.pagaindexes=res.data.data.totalPage
                this._initTimeInfos();
            }catch(e){
                showToast('获取信息失败')
                hideLoading()
            }
            hideLoading()
        },
        _initTimeInfos(){
            this.questionArr.forEach(item=>{
                this.$set(item, 'time', '');
                this.$set(item, 'show_question', '');
                item.time = stampToDate(item.createTime * 1000);
                item.show_question = item.question;
                item.question.length > 20 && (item.show_question = item.question.slice(0,20) + '...');
            })
        },
        async _reachBottomInitQuestions(){
            if(this.pageIndex <= this.pagaindexes){
                try{
                    let res=await getAllQuestions({
                        pageNumber:this.pageIndex++
                    })
                    this.questionArr=this.questionArr.concat(res.data.data.questions)
                }catch(e){

                }
            }else{
                showToast('没有更多数据了')
                this.dataFree=false;
            }
            this._initTimeInfos()
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
        this.pageIndex=0;
        this.dataFree=true;
        await this._initQuestions();
    }
}
</script>

<style lang="scss" scoped>
.for-bg-img{
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
}
.main-wrap {
    position: relative;
    height: auto;
    min-height: cr(400);
    .empty-error-info{
        width: 100%;
        text-align: center;
        font-size: cr(12);
        color: white; 
        margin-top: cr(20);
    }
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
