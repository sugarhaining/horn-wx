import {BASEURL} from '@/utils/config'
import ajax from '@/utils/ajax';

/**
 *检验用户登陆态
 *
 * @param {*} data
 */
function checkLoginTimeout(data){
    return ajax(_setUrl('/users/login'),data)
}

/**
 *返回索引页数
 *
 * @param {*} data
 */
function getRepositoriesIndexes(data){
    return ajax(_setUrl('/users/repositories/pageIndexs'),data)
}

/**
 *获取最新问答
 *
 * @param {*} data
 * @returns
 */
function getBrandAnswer(data){
    return ajax(_setUrl('/users/repositories'),data)
}


/**
 *获取小程序码
 *
 * @param {*} data
 * @returns
 */
function getIndexQRCode(data){
    return ajax(_setUrl('/users/codes'),data,'POST')
}


/**
 *用户搜索问答接口
 *
 * @param {*} data
 * @returns
 */
function getSearchAnswer(data){
    return ajax(_setUrl('/users/repositories/search'),data)
}

/**
 *用户发布问题接口
 *
 * @param {*} data
 * @returns
 */
function postQuestion(data){
    return ajax(_setUrl('/users/questions'),data,'POST')
}

/**
 *用户登录接口
 *
 * @param {*} data
 * @returns
 */
function postLogin(data){
    return ajax(_setUrl('/users/login'),data,'POST')
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
    checkLoginTimeout,
    getRepositoriesIndexes,
    getBrandAnswer,
    getSearchAnswer,
    postQuestion,
    postLogin,
    getIndexQRCode
}