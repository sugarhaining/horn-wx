<template>
  <div class="contain">
    <img src="/static/icons/close.png" class='close-btn' @click="cancel">
    <canvas canvas-id="shareCanvas" :style="{width: width + 'px', height: height+'px'}"></canvas>
    <button @click="save" class="save-btn" :disabled='ifDisabled'>保存到手机相册</button>
  </div>
 
</template>

<script>
const answerMaxLength=14;
const questionMaxLength=15;
const ctx = wx.createCanvasContext('shareCanvas')
const canvasWidth=250;
const canvasHeight=379; 
const questionBgImage=BASEURL+'/images/mmexport1559632826175.jpg';
const lostsBgImage=BASEURL+'/images/mmexport1559632821565.jpg';
import {canvasToTempFilePath,saveImageToPhotosAlbum,showLoading,hideLoading,getImageInfo} from '@/utils/index'
import {BASEURL,QINIU_BASE_URL} from '@/utils/config'
import {getIndexQRCode} from '@/apis/users'
import { getLostsQRCode} from '@/apis/lost'
export default {
    props:{
        info:{
            required:false
        },
        page:{
            type:String,
            required:true
        },
        repoId:{
            type:Number
        }
    },
  data () {
    return {
        questionArr:[],
        answerArr:[],
        describerArr:[],
        ifDisabled:true,
        showAnswer:'',
        showQuestion:'',
        showDescription:'',
        width: 0,
        height: 0,
    }
  },
    methods: {
        async _drawRetrieve(){//失物招领绘制
            showLoading('生成图片中')
            let res1=await getLostsQRCode({lostId:1})
            console.log(res1.data.imageUrl)
            let res=await Promise.all([
                getImageInfo(lostsBgImage),
                getImageInfo(QINIU_BASE_URL+this.info.lostImage),
                getImageInfo(res1.data.imageUrl)
            ])
            this.width=res[0].width/3;
            this.height=res[0].height/3;
            ctx.drawImage(res[0].path, 0, 0, this.width, this.height);
            ctx.drawImage(res[1].path,50,90,150,150)
            ctx.setFontSize(14)
            for(let i=0;i<this.describerArr.length;i++){
                ctx.fillText(this.describerArr[i],45,240+(i+1)*20)
            }
            let footerStart=310
            ctx.drawImage(res[2].path, 138, footerStart-16, 40, 40);
            ctx.draw(true)
            this.ifDisabled=false;
            hideLoading()
        },
        async _drawAnswer(){//问答页面绘制
            showLoading('生成图片中');
            let res1=await getIndexQRCode({repoId:this.repoId})
            let res=await Promise.all([
                getImageInfo(questionBgImage),
                getImageInfo(res1.data.imageUrl)
            ])
            this.width=res[0].width/3;
            this.height=res[0].height/3;
            ctx.drawImage(res[0].path, 0, 0, this.width, this.height);
            ctx.setFontSize(14)   
            for(let i=0;i<this.questionArr.length;i++){
                ctx.fillText(this.questionArr[i], 20, 80+(i+1)*20)
            }
            ctx.setFontSize(12)  
            for(let i=0;i<this.answerArr.length;i++){
                ctx.fillText(this.answerArr[i], 50, 134+(i+1)*20)
            }
            let footerStart=310
            ctx.drawImage(res[1].path, 138, footerStart-15, 40, 40);
            ctx.draw(true)
            this.ifDisabled=false;
            hideLoading()
        },
        cancel(){
            this.$emit('cancel')
        },
        _initInfo(){
            this.showAnswer=this.info.repoAnswer.length>49?this.info.repoAnswer.slice(0,49)+'...':this.info.repoAnswer
            this.showAnswer=`: ${this.showAnswer}`
            this.showQuestion=this.info.repoQuestion.length>25?this.info.repoQuestion.slice(0,25)+'...?':this.info.repoQuestion+'?'
            let questionRows=Math.ceil(this.showQuestion.length/questionMaxLength)
            let answerRows=Math.ceil(this.showAnswer.length/answerMaxLength)
            for (let i=0;i<questionRows;i++){
                this.questionArr.push(this.showQuestion.substr(questionMaxLength*i,questionMaxLength))
            }
            for (let i=0;i<answerRows;i++){
                this.answerArr.push(this.showAnswer.substr(answerMaxLength*i,answerMaxLength))
            }
        },
        _initLosts(){
            this.showDescription=this.info.lostDescription.length>19?this.info.lostDescription.substr(0,19)+'...':this.info.lostDescription
            let decriptionRows=Math.ceil(this.showDescription.length/11)
            for(let i=0;i<decriptionRows;i++){
                this.describerArr.push(this.showDescription.substr(11*i,11))
            }
        },  
        async save(){
            let res=await canvasToTempFilePath({
                canvasId:'shareCanvas'
            })
            await saveImageToPhotosAlbum(res.tempFilePath)
            showToast('保存成功','success')
        }
    },
    onLoad(){
        if(this.page==='index'){
            this._initInfo()
            this._drawAnswer()
        }else if(this.page==='retrieve'){
            this._initLosts()
            this._drawRetrieve()
        }
    },
    destroyed(){
        hideLoading()
    }
}
</script>
<style lang='scss' scoped>
  .contain{
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      padding-top: cr(60);
      box-sizing: border-box;
      z-index: 1200;
      background-color: rgba(0,0,0,0.8);
      @include flex_column;
      .canvas{ 
          background-color: white;
      }
      .close-btn{
          width: cr(25);
          height: cr(25);
          position: absolute;
          top: cr(20);
          right: cr(20);
          z-index: 1000;
      }
      .save-btn{
          height: cr(30);
          font-size: cr(14);
          line-height: cr(30);
          border: none;
          position: fixed;
          bottom: cr(40);
          left: 50%;
          transform: translateX(-50%);
          &:after{
              content:'';
              display: none;
          }
      }
  }
</style>