import {BASEURL} from '@/utils/config'
import ajax from '@/utils/ajax';

/**
 *增加管理员
 *
 * @param {*} data
 */
function registe (data) {
  return ajax (_setUrl ('/managers'), data, 'POST');
}

/**
 *获取所有管理员信息
 *
 * @param {*} [data={}]
 * @returns
 */
function getManagersInfo (data) {
  return ajax (_setUrl ('/managers'), data);
}

/**
 *删除某个管理员信息
 *
 * @param {*} data
 * @returns
 */
function deleteManage (data) {
  return ajax (_setUrl ('/managers'), data, 'DELETE');
}

/**
 *管理员登录
 *
 * @param {*} data
 * @returns
 */
function managerLogin (data) {
  return ajax (_setUrl ('/managers/login'), data, 'POST');
}

/**
 *获取用户问题
 *
 * @param {*} data
 * @returns
 */
function getAllQuestions (data) {
  return ajax (_setUrl ('/managers/questions'),data);
}

/**
 *返回索引页数
 *
 * @param {*} data
 * @returns
 */
function getPageAmounts(data){
    return ajax(_setUrl('/managers/questions/pageIndexs'),data)
}

/**
 *回答用户问题接口
 *
 * @param {*} data
 * @returns
 */
function answerQuestions(data){
    return ajax(_setUrl('/managers/questions'),data,'POST')
}

/**
 *添加问题到问题库接口
 *
 * @param {*} data
 * @returns
 */
function addQuestions(data){
    return ajax(_setUrl('/managers/repositories'),data,'POST')
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
    registe,
    getManagersInfo, 
    deleteManage, 
    managerLogin,
    getAllQuestions,
    getPageAmounts,
    answerQuestions,
    addQuestions
}
