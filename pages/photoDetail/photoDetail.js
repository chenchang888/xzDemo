// pages/photoDetail/photoDetail.js
const WxApi = require('../../utils/api.js')
const Config = require('../../utils/config.js');
const IMG_URL = Config.imgUrl;
const App = getApp()
Page({

   /**
    * 页面的初始数据
    */
   data: {
      //页面数据
      takePictures: '',
      id: '',
      status: '',
      IMG_URL,
      //是否显示删除
      showStatus: true
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      this.setData({
         id: options.id
      })
      console.log(this.data.id)
      this.getOne();
   },

   /**
    * 获取页面数据
    */
   getOne: function () {
      const params = {
         id: this.data.id,
         type: 2
      }
      WxApi.getMessageOne(params).then(res => {
         if (res.status == 0) {

            this.setData({
               takePictures: res,
               status: '未回复'
            })
         } else {
            this.setData({
               takePictures: res,
               status: '已回复',
               showStatus: false
            })
         }
      })
   },

   /**
    * 删除留言
    */
   delPhoto() {
      const params = {
         id: this.data.id,
      }
      wx.showModal({
         title: '提示',
         content: '确定要删除吗？',
         success: function (sm) {
            if (sm.confirm) {
               WxApi.delPictures(params)
                  .then(res => {
                     wx.showToast({
                        title: res.msg,
                        icon: 'none',
                        duration: 2000
                     })
                     if (res.code==1) {
                        setTimeout(function () {
                           wx.navigateTo({
                              url: '/pages/msgList/msgList?type=2',
                           })
                        }, 2000)
                     }
                  })
            } else if (sm.cancel) {
               console.log('用户点击取消')
            }
         }
      })
   },

   /**
    * 删除随手拍
    */
   delTakePic(params) {

   },
   /**
    * 生命周期函数--监听页面初次渲染完成
    */
   onReady: function () {

   },

   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function () {

   },

   /**
    * 生命周期函数--监听页面隐藏
    */
   onHide: function () {

   },

   /**
    * 生命周期函数--监听页面卸载
    */
   onUnload: function () {

   },

   /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
   onPullDownRefresh: function () {

   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function () {

   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function () {

   }
})