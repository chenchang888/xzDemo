const WxApi = require('../../utils/api.js')
const Config = require('../../utils/config.js');
const IMG_URL = Config.imgUrl;
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 主题和服务标识
    themeService: 'theme',
    //四个专题数组
    project: [],
    //服务事项
    matters: [{
        id: 20,
        title: '义务教育',
        icon: '../../img/1.png'
      },
      {
        id: 10,
        title: '低保五保',
        icon: '../../img/8.png'
      },
      {
        id: 8,
        title: '工伤失业',
        icon: '../../img/9.png'
      },
      {
        id: 17,
        title: '文化活动',
        icon: '../../img/13.png'
      },
      {
        id: 2,
        title: '社会救助',
        icon: '../../img/11.png'
      },
      {
        id: 4,
        title: '残疾人',
        icon: '../../img/12.png'
      },
      {
        id: 12,
        title: '拆迁安置',
        icon: '../../img/6.png'
      }
    ],
    //主题
    theme: [{
        id: 14,
        name: '就业创业',
        icon: '../../img/1.png'
      },
      {
        id: 15,
        name: '民生工程',
        icon: '../../img/2.png'
      },
      {
        id: 13,
        name: '电子商务',
        icon: '../../img/3.png'
      },
      {
        id: 21,
        name: '政府常务会议',
        icon: '../../img/4.png'
      },
      {
        id: 22,
        name: '政府开放日',
        icon: '../../img/5.png'
      },
      {
        id: 12,
        name: '拆迁安置',
        icon: '../../img/6.png'
      },
      {
        id: 16,
        name: '食药安全',
        icon: '../../img/7.png'
      }
    ],
    //主题是是否显示
    themeShow: false,
    //在线咨询是否显示
    _showMask: false,
    isClickedLike: false
  },
  //点击在线咨询
  showMask() {
    this.setData({
      _showMask: true
    })
  },
  //关闭在线咨询
  closeMask() {
    this.setData({
      _showMask: false
    })
  },
  getThemeService({
    currentTarget
  }) {
    this.setData({
      themeService: currentTarget.dataset.flag,
      themeShow: !this.data.themeShow
    })
  },
  //意见征集
  toOption() {
    wx.navigateTo({
      url: '/pages/opinion/opinion',
    })
  },
  //留言
  toLeave() {
    wx.navigateTo({
      url: '/pages/leaveMessage/leaveMessage',
    })
  },
  //拍照取证 
  toPhoto() {
    wx.navigateTo({
      url: '/pages/photograph/photograph',
    })
  },
  toPhotoList() {
    wx.navigateTo({
      url: '/pages/msgList/msgList?type=1',
    })
  },
  //首页
  reflash() {
    this.onLoad()
  },
  //依申请公开
  gotoPublic() {
    this.gotoOutuRL('http://www.xuanzhou.gov.cn/OpennessRequest/showList/869/4/page_1.html')
  },
  //个人中心
  gotoPerson() {
    wx.navigateTo({
      url: '/pages/person/person'
    })
  },
  //政务服务
  toOutUrl(e) {
    this.gotoOutuRL(e.currentTarget.dataset.url)
  },
  //政策列表
  toPolicyList(e) {
    wx.navigateTo({
      url: '/pages/news/news?themeId=' + e.currentTarget.dataset.id + '&name=' + e.currentTarget.dataset.name
    })
  },
  //跳转第三方链接
  gotoOutuRL(Url) {
    wx.navigateTo({
      url: '/pages/out/out?url=' + Url,
    })
  },
  // 前往详情
  toDetail(e) {
    console.log(JSON.stringify(e))
    wx.navigateTo({
      url: '/pages/newsDetail/newsDetail?id=' + e.currentTarget.dataset.id
    })
  },

  call() {
    wx.makePhoneCall({
      phoneNumber: '0563-3023029' //仅为示例，并非真实的电话号码
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const hasOpenId = () => {
      if (App.globalData.openId) {
        this.getIndexTheme();
        //this.getIndexMatters();
        //this.getIndexClassify();
        clearInterval(timer);
      }
    }
    const timer = setInterval(hasOpenId, 50)
  },

  /**
   * 获取四专题
   */
  getIndexTheme() {
    WxApi.getIndexTheme()
      .then(res => {
        const scheme = res;
        for (var i = 0; i < scheme.length; ++i) {
          scheme[i].iconPath = IMG_URL + scheme[i].iconPath
        }
        this.setData({
          project: scheme
        })
      })

  },
  /**
   * 获取主题
   */
  getIndexClassify() {
    wx.showLoading({
      title: '数据正在加载中……',
    })
    this.setData({
      theme: []
    })
    WxApi.getIndexClassify()
      .then(res => {
        wx.hideLoading({})
        const scheme = res;
        for (var i = 0; i < scheme.length; ++i) {
          scheme[i].icon = IMG_URL + scheme[i].icon
        }
        this.setData({
          theme: scheme
        })
      })
  },
  /**
   * 获取服务事项
   */
  getIndexMatters() {
    wx.showLoading({
      title: '数据正在加载中……',
    })
    WxApi.getIndexMatters()
      .then(res => {
        wx.hideLoading({})
        const scheme = res;
        for (var i = 0; i < scheme.length; ++i) {
          scheme[i].icon = IMG_URL + scheme[i].icon
        }
        this.setData({
          matters: scheme
        })
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const hasOpenId = () => {
      if (App.globalData.openId) {
        this.getIndexTheme();
        //this.getIndexClassify();
        //this.getIndexMatters();
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})