const WxApi = require('../../utils/api.js')
const Config = require('../../utils/config.js');
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //类别
    typeArray: [{
      "id": 0,
      "name": "全部"
    }, {
      "id": 1,
      "name": "上级政策"
    }, {
      "id": 2,
      "name": "本级政策"
    }],
    // 下拉数组
    array: [],
    // 下拉索引
    selectIndex: 0,
    //分类Id
    classifyId: undefined,
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
    policyList: [],
    scroll_height: 0,
    typeName: '全部',
    //下拉类型个索引
    selectType: 0,
    childId: undefined,
  },
  //改变分类
  bindPickerChange(e) {
    this.setData({
      selectIndex: e.detail.value,
      name: this.data.array[e.detail.value].name,
      classifyId: this.data.array[e.detail.value].id,
      pageNum: 1,
      pageCount: 0,
      amount: 0,
    })
    this.getPolicyList()
  },
  //改变政策类型
  changeType(e) {
    this.setData({
      selectType: e.detail.value,
      typeName: this.data.typeArray[e.detail.value].name,
      childId: this.data.typeArray[e.detail.value].id,
      pageNum: 1,
      pageCount: 0,
      amount: 0,
    })
    this.getPolicyList()
  },
  /**
   * 获取所有分类
   */
  getAllCategory() {
    var tempList = [{
      id: 0,
      name: "全部分类"
    }];
    WxApi.getAllTheme()
      .then(res => {
        this.setData({
          array: tempList.concat(res)
        })
        const themeArry = res
        for (let i = 0; i < themeArry.length; i++) {
          if (themeArry[i].id == this.data.classifyId) {
            this.setData({
              name: themeArry[i].name
            })
          }
        }
      })
  },
  /**
   * 获取政策列表
   */
  getPolicyList() {
    wx.showLoading({
      title: '数据正在加载中……',
    })
    let params = {
      keyWord: this.data.title,
      classifyId: this.data.classifyId === 0 ? '' : this.data.classifyId,
      pageNo: this.data.pageNum,
      pageSize: this.data.pageSize,
      childId: this.data.childId === 0 ? '' : this.data.childId
    };

    WxApi.getPolicyList(params)
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
      policyList: []
    })
    this.getPolicyList()
  },
  /**
   * 查看详情
   */
  toDetail(e) {
    wx.navigateTo({
      url: '/pages/newsDetail/newsDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      classifyId: options.themeId
    })
    this.getAllCategory()
    this.getPolicyList()
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    this.setData({
      scroll_height: windowHeight - 232
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