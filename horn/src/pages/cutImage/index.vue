 <template>
  <div>
    <mpvue-cropper 
      ref="cropper"
      :option="cropperOpt"
      @ready="cropperReady"
      @beforeImageLoad="cropperBeforeImageLoad"
      @beforeLoad="cropperLoad"
      ></mpvue-cropper>
    <div 
      class="cropper-buttons" 
      :style="{ color:cropperOpt.boundStyle.color}">
    <div
      class="upload btn"
      @tap="uploadTap">
      选择裁剪图片
    </div>
    <div
      class="getCropperImage btn"
      :style="{ backgroundColor: cropperOpt.boundStyle.color }"
      @tap="getCropperImage">
      确认裁剪
    </div>
  </div>
  </div>
</template>

<script>
import MpvueCropper from 'mpvue-cropper'
import {redirectTo,showToast} from '@/utils/index'
import { showLoading,hideLoading } from '../../utils';

let wecropper

const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50

export default {
  data () {
    return {
        hasChooseImg:false,
      cropperOpt: {
        id: 'cropper',
        targetId: 'targetCropper',
        pixelRatio: device.pixelRatio,
        width,
        height,
        scale: 2.5,
        zoom: 8,
        cut: {
          x: (width - 250) / 2,
          y: (height - 250) / 2,
          width: 250,
          height: 250
        },
        boundStyle: {
          color: '#04b00f',
          mask: 'rgba(0,0,0,0.8)',
          lineWidth: 1
        }
      }
    }
  },

  components: {
    MpvueCropper
  },

  methods: {
    cropperReady (...args) {
    //   console.log('cropper ready!')
    },
    cropperBeforeImageLoad (...args) {
    },
    cropperLoad (...args) {
    },
    uploadTap () {
        let that=this;
        showLoading('读取相册中')
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: (res) => {
          const src = res.tempFilePaths[0]
          wecropper.pushOrigin(src)
          hideLoading()
        },
        fail:(err)=>{
            console.log(err)
            hideLoading()
        }
      })
    },
    getCropperImage () {
        showLoading('图片处理中')
      wecropper.getCropperImage({ original: true })
        .then((src) => {
            hideLoading()
            redirectTo('/pages/open/main',{
                src
            })
        })
        .catch(e => {
          console.error('获取图片失败')
          hideLoading()
        })
    }
  },
  onShow(){
      this.hasChooseImg=false;
  },
  mounted () {
    wecropper = this.$refs.cropper
  }
}
</script>

<style scoped lang='scss'>
.cropper-wrapper{
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: #e5e5e5;
}

.cropper-buttons{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: cr(50);
    padding: 0 20rpx;
    box-sizing: border-box;
    line-height: 50px;
}

.cropper-buttons .upload, .cropper-buttons .getCropperImage{
    text-align: center;
}

.cropper{
    position: absolute;
    top: 0;
    left: 0;
}

.cropper-buttons{
    background-color: rgba(0, 0, 0, 0.95);
}

.btn{
    height: 30px;
    line-height: 30px;
    padding: 0 24rpx;
    border-radius: 2px;
    color: #ffffff;
}
</style>