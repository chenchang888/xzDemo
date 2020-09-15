// pages/msgList/msgList.js
const WxApi = require('../../utils/api.js')
const Config = require('../../utils/config.js');
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scroll_height: 0,
    //页面数据
    message: [{
      id: '',
      title: '',
      unit: '',
      status: ''
    }],
    //类型
    type: 2,
    //搜索
    name: '',
    //分页
    pageNum: 1,
    //提示信息
    msg: '',
    //每页条数
    pageSize: 20,
    //总页数
    pageCount: 0,
    //总条数
    amount: 0,
    title: '随手拍列表'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    this.setData({
      scroll_height: windowHeight - 200,
    })
    this.setData({
      type: options.type
    })
    console.log("type:" + options.type)
    if (this.data.type == 1) {
      this.setData({
        title: '留言列表'
      })
    }

    this.selectAll();
  },
  inputValue: function(e) {
    this.setData({
      name: e.detail.value
    })
    this.search();
  },
  /**
   * 点击搜索按钮
   */
  search: function() {
    this.selectAll()
  },
  /**
   * 获取页面数据
   */
  selectAll: function() {
    wx.showLoading({
      title: '数据正在加载中……',
    })
    const params = {
      name: this.data.name,
      pageNo: this.data.pageNum,
      pageSize: this.data.pageSize,
      type: this.data.type
    }
    var th = this;
    
    WxApi.getMessageList(params).then(res => {
      wx.hideLoading({})
      var tempList = this.data.message;
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
      th.setData({
        message: tempList,
        pageCount: res.pages,
        pageNum: res.pageNum,
      })
      console.log(res)
      if (res.nextPage == 0) {
        th.setData({
          msg: '已到最后一页'
        })
      }
    })
  },
  // 接近底部时触发
  nearBottom() {
    console.log(999999)
    if (this.data.pageNum < this.data.pageCount) {
      //重置页面索引为下一页
      this.setData({
        pageNum: this.data.pageNum + 1,
      })
      this.selectAll();
    }
  },
  /**
   * 点击跳到详情页
   */
  getById(e) {
    if (e.currentTarget.dataset.type == 1) {
      wx.navigateTo({
        url: '/pages/msgDetail/msgDetail?id=' + e.currentTarget.dataset.id
      })
    } else {
      wx.navigateTo({
        url: '/pages/photoDetail/photoDetail?id=' + e.currentTarget.dataset.id
      })
    }
  },

  addTakePicture: function() {
    this.setData({
      type: 2,
      title: '随手拍列表',
      pageCount: 0,
      pageNum: 0,
      pageNum: 1,
      message:[]
    })

    this.selectAll();
  },
  addMessage() {
    this.setData({
      type: 1,
      title: '留言列表',
      pageCount: 0,
      pageNum: 0,
      pageNum: 1,
      message: []
    })
    this.selectAll();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      pageNum: this.data.pageNum + 1
    })
    this.selectAll();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})