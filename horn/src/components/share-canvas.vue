<template>
  <div class="contain">
    <img src="/static/icons/close.png" class='close-btn' @click="cancel">
    <canvas canvas-id="shareCanvas" class="canvas"></canvas>
    <button @click="save" class="save-btn" :disabled='ifDisabled'>保存到手机相册</button>
  </div>
 
</template>

<script>
const answerMaxLength=14;
const questionMaxLength=15;
const ctx = wx.createCanvasContext('shareCanvas')
const canvasWidth=250;
const canvasHeight=379; 
const questionBgImage='https://www.xdxlb.xyz/images/mmexport1559632826175.jpg';
const lostsBgImage='https://www.xdxlb.xyz/images/mmexport1559632821565.jpg';
import {getImageInfo,showToast,canvasToTempFilePath,saveImageToPhotosAlbum,showLoading,hideLoading,downLoadFile} from '@/utils/index'
export default {
    props:{
        info:{
            required:false
        },
        page:{
            type:String,
            required:true
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
        qrCodeUrl:'http://static.yxdown.com/pc/index/images/qrcode.png'
    }
  },
    methods: {
        async _drawRetrieve(){//失物招领绘制
            showLoading('生成图片中')
            let res=await Promise.all([
                downLoadFile(lostsBgImage),
                downLoadFile('http://prxyk9xwq.bkt.clouddn.com/tmp/wx2ca9e25aa9b4246a.o6zAJs3d1ga_bSFnpNWjScWB873I.4qOpNAF0kL0w69d42973a55d0d19a9b65e8660e88b4d.png'),
                downLoadFile(this.qrCodeUrl)
            ])
            ctx.drawImage(res[0].tempFilePath, 0, 0, canvasWidth, canvasHeight);
            ctx.drawImage(res[1].tempFilePath,50,90,150,150)
            ctx.setFontSize(14)
            for(let i=0;i<this.describerArr.length;i++){
                ctx.fillText(this.describerArr[i],45,240+(i+1)*20)
            }
            let footerStart=310
            ctx.drawImage(res[2].tempFilePath, 138, footerStart-16, 40, 40);
            ctx.draw(true)
            this.ifDisabled=false;
            hideLoading()
        },
        async _drawAnswer(){//问答页面绘制
            showLoading('生成图片中');
            let res=await Promise.all([
                downLoadFile(questionBgImage),
                downLoadFile(this.qrCodeUrl)
            ])
            ctx.drawImage(res[0].tempFilePath, 0, 0, canvasWidth, canvasHeight);
            ctx.setFontSize(14)   
            for(let i=0;i<this.questionArr.length;i++){
                ctx.fillText(this.questionArr[i], 20, 80+(i+1)*20)
            }
            ctx.setFontSize(12)  
            for(let i=0;i<this.answerArr.length;i++){
                ctx.fillText(this.answerArr[i], 50, 134+(i+1)*20)
            }
            let footerStart=310
            ctx.drawImage(res[1].tempFilePath, 138, footerStart-10, 40, 40);
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
          width: cr(250);
          height: cr(379);
          border: 1px solid #000;
          background-color: rgba(255,255,255,1);
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
          margin-top: cr(20);
          &:after{
              content:'';
              display: none;
          }
      }
  }
</style>