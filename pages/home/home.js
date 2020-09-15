// pages/home/home.js
const WxApi = require('../../utils/api.js')
const Config = require('../../utils/config.js');
const IMG_URL = Config.imgUrl;
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //首页轮播图
    slideshowList: [],
    //四个专题数组
    project: [],
    //个人政策
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
    //企业主题
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
        id: 24,
        name: '每月留言',
        icon: '../../img/14.png'
      },{
        id: 11,
        name: '市场监督',
        icon: '../../img/16.png'
      },
      // {
      //   id: 25,
      //   name: '网友看宣州',
      //   icon: '../../img/15.png'
      // },
      {
        id: 16,
        name: '食药安全',
        icon: '../../img/7.png'
      }
    ],
    imgs: [0, 1, 2],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const hasOpenId = () => {
      if (App.globalData.openId) {
        this.getIndexSlideshow();
        this.getIndexTheme();
        clearInterval(timer);
      }
    }
    const timer = setInterval(hasOpenId, 50)
  },
  /**
   * 获取轮播图
   */
  getIndexSlideshow() {
    WxApi.getIndexSlideshow()
      .then(res => {
        const scheme = res;
        for (var i = 0; i < scheme.length; ++i) {
          scheme[i].backImg = IMG_URL + scheme[i].backImg
        }
        this.setData({
          slideshowList: scheme
        })
      })
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
  //首页
  reflash() {
    this.onLoad();
  },
  //政策列表
  toPolicyList(e) {
    wx.navigateTo({
      url: '/pages/news/news?themeId=' + e.currentTarget.dataset.id + '&name=' + e.currentTarget.dataset.name
    })
  },
  /**
   * 政民互动
   */
  toInteractive() {
    wx.navigateTo({
      url: '/pages/interactive/interactive'
    })
  },
  // 依申请公开
  gotoMyReply() {
    wx.navigateTo({
      url: '/pages/replyKnow/replyKnow'
    })
  },
  //个人中心
  gotoPerson() {
    wx.navigateTo({
      url: '/pages/person/person'
    })
  },
  //随手拍列表
  toPhotoList() {
    wx.navigateTo({
      url: '/pages/msgList/msgList?type=2',
    })
  },
  //轮播图
  toslideshow(e) {
    wx.navigateTo({
      url: '/pages/slideshow/slideshow?id=' + e.currentTarget.dataset.id
    })
  },

  //专题
  toProject(e) {
    if (e.currentTarget.dataset.policyid == 0) {
      wx.navigateTo({
        url: '/pages/projectList/projectList?projectId=' + e.currentTarget.dataset.projectid
      })
    } else {
      wx.navigateTo({
        url: '/pages/newsDetail/newsDetail?id=' + e.currentTarget.dataset.policyid
      })
    }
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
        this.getIndexSlideshow();
        this.getIndexTheme();
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