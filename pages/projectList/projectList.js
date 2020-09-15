const WxApi = require('../../utils/api.js')
const Config = require('../../utils/config.js');
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 下拉数组
    array: [],
    // 下拉索引
    selectIndex: 0,
    //分类Id
    projectId: undefined,
    //标题
    title: '',
    //当前页数
    pageNum: 1,
    //每页条数
    pageSize: 10,
    //总页数
    pageCount: 0,
    //总条数
    amount: 0,
    name: '全部分类',
    //政策列表
    policyList:[],
    scroll_height: 0
  },

  /**
   * 获取政策列表
   */
  getPolicyList(){
    wx.showLoading({
      title: '数据正在加载中……',
    })
    let params = {
      projectId: this.data.projectId === 0 ? '' : this.data.projectId,
      pageNo: this.data.pageNum,
      pageSize: this.data.pageSize
    };

    WxApi.getProjectList(params)
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
      this.getPolicyList();
    }
  },
  /**
   * 查看详情
   */
  toDetail(e){
    // console.log(e);
    wx.navigateTo({
      url: '/pages/newsDetail/newsDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      projectId: options.projectId
    })
    this.getPolicyList()
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    this.setData({
      scroll_height: windowHeight -100
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