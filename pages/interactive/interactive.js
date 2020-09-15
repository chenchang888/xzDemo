// pages/interactive/interactive.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 首页
   */
  toHome() {
    wx.navigateTo({
      url: '/pages/home/home'
    })
  },
  /**
   * 政民互动
   */
  toInteractive() {
    this.onLoad()
  },
  //个人中心
  gotoPerson() {
    wx.navigateTo({
      url: '/pages/person/person'
    })
  },
  //依申请公开
  gotoMyReply() {
    wx.navigateTo({
      url: '/pages/replyKnow/replyKnow'
    })
  },
  //随手拍列表
  toPhotoList() {
    wx.navigateTo({
      url: '/pages/msgList/msgList?type=2',
    })
  },
  //填写意见
  editOpinion() {
    this.isNotAuthorization('/pages/leaveMessage/leaveMessage')
  },

  //拍照
  editPhoto() {
    this.isNotAuthorization('/pages/photograph/photograph')
  },
  //判断是否授权
  isNotAuthorization(url) {
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: url,
          })
          console.log("已授权=====")
        } else {
          wx.showToast({
            title: '登录后才能使用该功能，请先登录！',
            icon: 'none',
            duration: 2000
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '/pages/person/person',
            })
          }, 2000)
        }
      }
    })
  },
  //意见列表
  toOpinionList() {
    wx.navigateTo({
      url: '/pages/msgList/msgList?type=1',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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