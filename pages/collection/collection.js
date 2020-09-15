const WxApi = require('../../utils/api.js')
const Config = require('../../utils/config.js');
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //当前页数
    pageNum: 1,
    //每页条数
    pageSize: 10,
    //总页数
    pageCount: 0,
    //总条数
    amount: 0,
    //政策列表
    policyList: [],
    scroll_height: 0,
    obj: {}
  },


  /**
   * 获取政策列表
   */
  getEnshrineList() {
    wx.showLoading({
      title: '数据正在加载中……',
    })
    let params = {
      pageNo: this.data.pageNum,
      pageSize: this.data.pageSize
    };

    WxApi.enshrineList(params)
      .then(res => {
        wx.hideLoading({})
        var tempList = this.data.policyList;
        var tempPageIndex = this.data.pageNum;
        if (res.pageNum == 1) {
          //当pageIndex数据为1的时候，这是重置数据列表
          tempList = res.list;
          //重置页面索引
          tempPageIndex = 1 + 1;
        } else {
          //数据追加
          tempList = tempList.concat(res.list);
        }
        this.setData({
          policyList: tempList,
          pageCount: res.pages,
          pageNum: res.pageNum,
        })
      })
  },
  // 接近底部时触发
  nearBottom() {
    if (this.data.pageNum < this.data.pageCount) {
      //重置页面索引为下一页
      this.setData({
        pageNum: this.data.pageNum + 1,
      })
      this.getEnshrineList();
    }
  },
  //删除
  delEnshrine(e) {
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
          const params = {
            id: e.currentTarget.dataset.id
          }
          WxApi.delEnshrine(params)
            .then(res => {
              console.log(res)
              wx.showLoading({
                title: res.msg,
              })
              that.getEnshrineList();
            })
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 查看详情
   */
  toDetail(e) {
    if (e.currentTarget.dataset.type == 3) {
      wx.navigateTo({
        url: '/pages/slideshow/slideshow?id=' + e.currentTarget.dataset.id
      })
    }else {
      wx.navigateTo({
        url: '/pages/newsDetail/newsDetail?id=' + e.currentTarget.dataset.id,
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const hasOpenId = () => {
      if (App.globalData.openId) {
        this.getEnshrineList()
        clearInterval(timer);
      }
    }
    const timer = setInterval(hasOpenId, 50)
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    this.setData({
      scroll_height: windowHeight - 50
    })
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
    const hasOpenId = () => {
      if (App.globalData.openId) {
        this.getEnshrineList();
        clearInterval(timer);
      }
    }
    const timer = setInterval(hasOpenId, 50)
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

})