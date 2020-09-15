const WxApi = require('../../utils/api.js')
const Config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    // 回复信息
    list: [],
    //当前页
    pageNum: 1,
    //分页大小
    pageSize: 10,
    // 总页数
    pages: 0,
    //总条数
    total: 0,
  },
  // 查看是否授权登录
  grantAuthorization() {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          // 未登录弹窗提示
          wx.showModal({
            title: '提示',
            content: '该服务需要登录，请您先前往登录',
            confirmText: '登录',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../person/person'
                })
              } else if (res.cancel) {
                wx.navigateTo({
                  url: '../person/person'
                })
              }
            }
          })
        }
        return;
      }
    })
  },
  async getPublicList() {
    const params = {
      pageNo: this.data.pageNum,
      pageSize: this.data.pageSize
    }
    const res = await WxApi.getPublicList(params)
    // 初次为第一页数据，后续下拉触底在原数组追加新加载的新一页数组
    const arrList = this.data.list.push.apply(this.data.list, res.list)
    this.setData({
      list: this.data.list,
      total: res.total,
      pages: res.pages
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPublicList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
    // 判断当前页是否小于总页数，小于则加载下一页，反之return
    if (this.data.pageNum >= this.data.pages) {
      wx.showToast({
        title: '已全部加载完成',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.showLoading({
      title: '加载中',
    })
    const _this = this
    setTimeout(function () {
      wx.hideLoading()
      _this.setData({
        pageNum: _this.data.pageNum + 1
      })
      _this.getPublicList()
    }, 1000)
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
    this.grantAuthorization()
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})