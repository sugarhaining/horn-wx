const qiniuUploader = require('../plugins/qiniu-wxapp-sdk/sdk/qiniuUploader');
import {UPTOKEN_URL} from '@/utils/config'

function _initQiniu(){
    console.log(UPTOKEN_URL)
    let options={
        region:'ECN',
        uptokenURL:UPTOKEN_URL,
        shouldUseQiniuFileName: false
    }
    qiniuUploader.init(options)
}

function qiNiuUpload(filePath){
    _initQiniu()
    return new Promise((resolve,reject)=>{
        qiniuUploader.upload(filePath,res=>{
            resolve(res)
        },err=>{
            reject(err)
        },null)
    })
}

export default qiNiuUpload