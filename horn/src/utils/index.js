function getUserInfo () {
  return new Promise ((resolve, reject) => {
    wx.getUserInfo ({
      success: res => resolve (res),
      fail: err => reject (err),
    });
  });
}
function getLocation () {
  return new Promise ((resolve, reject) => {
    wx.getLocation ({
      type: 'wgs84',
      success: res => resolve (res),
      fail: err => reject (err),
    });
  });
}
function scanCode () {
  return new Promise ((resolve, reject) => {
    wx.scanCode ({
      success: res => resolve (res),
      fail: err => reject (err),
    });
  });
}
/* 
@params{
  title:模态框标题
  content：模态框内容主体
}
*/
function showModal (title, content = '') {
  return new Promise ((resolve, reject) => {
    wx.showModal ({
      title,
      content,
      success: res => resolve (res),
      fail: err => reject (err),
    });
  });
}

function showToast (
  title = '提示',
  icon = 'none',
  mask = false,
  duration = 1500
) {
  return new Promise ((resolve, reject) => {
    wx.showToast ({
      title,
      icon,
      mask,
      duration,
      success: res => resolve (res),
      fail: err => reject (err),
    });
  });
}
/* 
@params{
  url:页面路由
  params:参数对象
}
*/
function jumpTo (url, params = {}) {
  wx.navigateTo ({
    url: `${url}${paramsChange (params)}`,
  });
}
/* 
@params{
  url:接口地址
  method:请求方式
  data:传输数据
  dataType：返回数据格式
}
*/
function request({url, method = 'GET', data = {}, dataType = 'json'}) {
  return new Promise ((resolve, reject) => {
    wx.request ({
      url: `${FILE_PATH}${url}`,
      method,
      data,
      dataType,
      success: res => resolve (res),
      fail: err => reject (err),
    });
  });
}

function paramsChange (params) {
  if (params === undefined) {
    return '';
  }
  let str = '?';
  Object.keys (params).forEach (item => {
    str += `${item}=${params[item]}&`;
  });
  str = str.slice (0, -1);
  return str;
}

/* 
  检查用户授权情况
*/
function checkScope () {
  return new Promise ((resolve, reject) => {
    wx.getSetting ({
      success: res => resolve (res),
      fail: err => reject (err),
    });
  });
}

function switchTab (path) {
  wx.switchTab ({
    url: path,
  });
}

function redirectTo (url, params = {}) {
  wx.redirectTo ({
    url: `${url}${paramsChange (params)}`,
  });
}

function preview (path) {
  wx.previewImage ({
    urls: path,
  });
}

function setClipboardData (data) {
  return new Promise ((resolve, reject) => {
    wx.setClipboardData ({
      data,
      success: res => resolve (res),
      fail: err => reject (err),
    });
  });
}

function chooseImage (count = 1) {
  return new Promise ((resolve, reject) => {
    wx.chooseImage ({
      count,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => resolve (res),
      fail: err => reject (err),
    });
  });
}

function setStorageSync (key, data) {
  wx.setStorageSync (key, data);
}

function getStorageSync (key) {
  return wx.getStorageSync (key);
}

function login () {
  return new Promise ((resolve, reject) => {
    wx.login ({
      success: res => resolve (res),
      fail: err => reject (err),
    });
  });
}

function showLoading (title = '请稍等') {
  wx.showLoading ({
    title,
  });
}

function hideLoading () {
  wx.hideLoading ();
}

function getImageInfo (src) {
  return new Promise ((resolve, reject) => {
    wx.getImageInfo ({
      src,
      success: res => resolve (res),
      fail: err => reject (err),
    });
  });
}

function canvasToTempFilePath (data) {
  return new Promise ((resolve, reject) => {
    wx.canvasToTempFilePath ({
      ...data,
      success: res => resolve (res),
      fail: err => reject (err),
    });
  });
}

function saveImageToPhotosAlbum (filePath) {
  return new Promise ((resolve, reject) => {
    wx.saveImageToPhotosAlbum ({
      filePath,
      success: res => resolve (res),
      fail: err => reject (err),
    });
  });
}

function downLoadFile(url){
    return new Promise((resolve,reject)=>{
        wx.downloadFile({
            url,
            success:res=>resolve(res),
            fail:err=>reject(err)
        })
    })
}

function getSystemInfo(){
    return new Promise((resolve,reject)=>{
        wx.getSystemInfo({
            success:res=>resolve(res),
            fail:err=>reject(err)
        })
    })
}

function navigatorBack(delta){
    return new Promise((resolve,reject)=>{
        wx.navigateBack({
            delta
        })
    })
}


export {
  getUserInfo,
  scanCode,
  showModal,
  showToast,
  getLocation,
  jumpTo,
  switchTab,
  request,
  checkScope,
  redirectTo,
  preview,
  setClipboardData,
  chooseImage,
  getStorageSync,
  setStorageSync,
  login,
  showLoading,
  hideLoading,
  getImageInfo,
  canvasToTempFilePath,
  saveImageToPhotosAlbum,
  downLoadFile,
  getSystemInfo,
  navigatorBack
};