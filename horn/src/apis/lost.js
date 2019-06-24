import {BASEURL} from '@/utils/config'
import ajax from '@/utils/ajax'

/**
 *获取失物信息接口
 *
 * @param {*} data
 * @returns
 */
function getLostsInfo(data){
    return ajax(_setUrl('/losts'),data)
}

/**
 *返回失物索引页数接口
 *
 * @param {*} data
 */
function getPageIndexes(data){
    return ajax(_setUrl('/losts/pageIndexs'),data)
}

/**
 *用户发布失物接口
 *
 * @param {*} data
 * @returns
 */
function postReleaseLosts(data){
    return ajax(_setUrl('/losts'),data,'POST')
}

/**
 *用户删除失物接口
 *
 * @param {*} data
 * @returns
 */
function deleteLosts(data){
    return ajax(_setUrl('/losts'),data,'DELETE')
}

/**
 *获取失物界面二维码
 *
 * @param {*} data
 * @returns
 */
function getLostsQRCode(data){
    return ajax(_setUrl('/losts/codes'),data,'POST')
}


/**
 *生成接口地址辅助方法
 *
 * @param {*} api
 * @returns
 */
function _setUrl (api) {
    return BASEURL + api;
  }

export {
    getLostsInfo,
    getPageIndexes,
    postReleaseLosts,
    deleteLosts,
    getLostsQRCode
}