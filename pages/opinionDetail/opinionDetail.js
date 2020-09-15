const WxApi = require('../../utils/api.js')
const WxParse = require('../../wxParse/wxParse.js');
const Config = require('../../utils/config.js');
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: undefined,
    //标题
    title: '',
    //來源
    unit: '',
    //发布时间
    time: '',
    //是否收藏 0 未收藏 1 收藏
    enshrineStatus: 0,
    showCollect: false,
  },
  
  // 点击收藏
  clickCollect() {
    this.data.collectStatus === '收藏' ? this.setData({
      collectStatus: ''
    }) : this.setData({
      collectStatus: '收藏'
    })
    if (this.data.collectStatus == '收藏') {
      this.addEenshrine(1);
    } else {
      this.addEenshrine(0);
    }
  },
  //添加收藏
  addEenshrine(delFlag) {
    const params = {
      policyId: this.data.id,
      delFlag: delFlag,
      type: 2
    }
    WxApi.addEenshrine(params)
      .then(res => {
        if (delFlag == 0) {
          this.setData({
            showCollect: true
          })
        } else {
          this.setData({
            showCollect: false
          })
        }
      })
  },
  //设置意见
  setComment(){
    wx.navigateTo({
      url: '/pages/writeOpinion/writeOpinion?commentId=' + this.data.id+'&commentTitle='+this.data.title,
    })
  },
  //获取数据
  getData() {
    wx.showLoading({
      title: '数据正在加载中……',
    })
    let params = {
      id: this.data.id
    };
    WxApi.getCommentContent(params)
      .then(res => {
        console.log(JSON.stringify(res))
        wx.hideLoading({})
        this.setData({
          title: res.title,
          unit: res.unit,
          time: res.time,
          enshrineStatus: res.enshrineStatus,
        })
        //设置收藏状态
        if (res.enshrineStatus > 0) {
          this.setData({
            showCollect: true
          })
        }

        let article = res.content.replace(/<o:p>/g, '').replace(/pt/g, '*2rpx').replace("&lt;</span>", '&lt;&nbsp;</span>');

        WxParse.wxParse('article', 'html', article, this, 5);
      })
  },
  //设置关注、收藏
  setStatus(enshrineStatus) {
    this.data.enshrineStatus === 1 ? this.setData({
      collectStatus: ''
    }) : this.setData({
      collectStatus: '收藏'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      pages: {
        pagesLength: getCurrentPages().length,
      },
      id: options.id
    })
    this.getData();
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