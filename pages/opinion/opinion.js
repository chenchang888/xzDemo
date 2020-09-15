const WxApi = require('../../utils/api.js')
const Config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //标题
    title: '',
    pageNum: 1,
    //每页条数
    pageSize: 10,
    //总页数
    pageCount: 0,
    //总条数
    amount: 0,
    //意见征集列表
    commentList: [],
    scroll_height: 0
  },
  /**
   * 获取意见征集列表
   */
  getCommentList() {
    wx.showLoading({
      title: '数据正在加载中……',
    })
    let params = {
      title: this.data.title,
      pageNo: this.data.pageNum,
      pageSize: this.data.pageSize
    };

    WxApi.getCommentList(params)
      .then(res => {
        wx.hideLoading({})
        var tempList = this.data.commentList;
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
          commentList: tempList,
          pageCount: res.pages,
          pageNum: res.pageNum,
        })
      })
  },
  // 接近底部时触发
  nearBottom() {
    console.log(88888)
    if (this.data.pageNum < this.data.pageCount) {
      //重置页面索引为下一页
      this.setData({
        pageNum: this.data.pageNum + 1,
      })
      this.getCommentList();
    }
  },
  // 获取输入的值
  getInputContent({
    detail
  }) {
    this.setData({
      title: detail.value
    })
  },
  //查询
  search() {
    this.setData({
      pageNum: 1,
      commentList: []
    })
    this.getCommentList()
  },
  //详情
  toDetail(e){
    wx.navigateTo({
      url: '/pages/opinionDetail/opinionDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCommentList()
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    console.log("windowHeight:" + windowHeight)
    this.setData({
      scroll_height: windowHeight
    })
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