const Config = require('../utils/config.js');
const API_BASE_URL = Config.domain;
const app = getApp();

const request = (url, method, params, pathId) => {
  let _path = pathId ? '/' + pathId : ''; //路径ID
  let _url = API_BASE_URL + url + _path;
  let openId = app.globalData.openId;
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      data: params,
      method: method,
      header: {
        OpenId: openId
      },
      success(res) {
        if (res.data.code === 1) {
          resolve(res.data.data)
        } else {
          wx.showToast({
            title: '服务器繁忙！',
            icon: 'none'
          })
        }
      },
      fail(err) {
        wx.showToast({
          title: '服务器不可用！',
          icon: 'none'
        })
        reject(err)
      },
      complete() {
        //成功、失败都会调用
      }
    })
  })
}

// finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => {
      throw reason
    })
  );
};

module.exports = {
  getIndexTheme: params => request('/index', 'GET', params), //获取四个专题 
  getIndexClassify: params => request(' ', 'GET', params), //获取排名前几的主题getIndexMatters 
  getIndexMatters: params => request('/getIndexMatters', 'GET', params), //获取排名前10政务服务事项
  getPolicyList: params => request('/policy/list', 'GET', params), //获取政策列表   
  getAllTheme: params => request('/policy/themeList', 'GET'), //获取获取所有主题
  getPolicyContent: params => request('/policy/policyDetail', 'GET', params), //获取某个政策详情
  setEvaluationStatus: params => request('/policy/setStatus', 'GET', params), //点赞
  setEvaluationContent: params => request('/policy/setContent', 'GET', params), //评价
  addEenshrine: params => request('/policy/addEnshrine', 'GET', params), //添加收藏
  getCommentList: params => request('/comment/list', 'GET', params), //获取意见征集列表
  getCommentContent: params => request('/comment/getCommentDetail', 'GET', params), //获取意见征集内容
  addCommentFeedback: params => request('/comment/addComment', 'GET', params), //获取意见征集内容
  getMessageOne: params => request('/message/content', 'GET', params), //获取单个留言详情
  getMessageList: params => request('/message/messageList', 'GET', params), //获取留言列表
  getTakePicturesList: params => request('/message/takePictureList', 'GET', params), //获取随手拍
  addMessage: params => request('/message/addMessage', 'GET', params), //添加留言
  addTakePictures: params => request('/message/addTakePictures', 'GET', params), //添加随手拍
  getFeedBack: params => request('/comment/getFeedBack', 'GET', params), //获取意见征集信息
  delEnshrine: params => request('/policy/delEnshrine', 'GET', params), //删除收藏
  enshrineList: params => request('/policy/enshrineList', 'GET', params), //获取收藏列表
  getIndexSlideshow: params => request('/getSlideshow', 'GET', params), //获取首页轮播图
  getSlideshowContent: params => request('/policy/slideshowDetail', 'GET', params), //获取某个轮播图详情
  getProjectList: params => request('/getProjectList', 'GET', params), //获取主题政策列表
  delMessage: params => request('/message/delMsg', 'GET', params), //删除单个留言
  delPictures: params => request('/message/delPictures', 'GET', params), //删除单个随手拍
  addReplyForm:params => request('/addPublic', 'GET', params), //添加依申请表单
  getPublicList:params => request('/getPublicList', 'GET', params), //我的依申请表单
}