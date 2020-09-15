// pages/writeOpinion/writeOpinion.js
const WxApi = require('../../utils/api.js')
const Config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //意见征集关联id
    commentId: undefined,
    commentTitle: '',
    //名字
    name: undefined,
    //意见征集内容
    content: undefined,
    //联系方式
    contact: undefined,
    //是否操作
    operation:false,
    unit:'',
    reply:'',
    replyTime:'',
    status:0
  },
  //获取姓名
  getName({
    detail
  }) {
    this.setData({
      name: detail.value
    })
  },
  //获取联系方式
  getContact({
    detail
  }) {
    this.setData({
      contact: detail.value
    })
  },
  //获取内容
  getContent({
    detail
  }) {
    this.setData({
      content: detail.value
    })
  },
  //获取意见征集反馈信息
  getCommentFeedback(){
    let params={
      commentId:this.data.commentId,
    }
    WxApi.getFeedBack(params)
      .then(res => {
        if (res.existStatus >0 ){
            this.setData({
              name: res.name,
              //意见征集内容
              content: res.content,
              //联系方式
              contact: res.contact,
              unit: res.unit,
              replyTime: res.replyTime, 
              reply: res.reply,
              operation:true,
              status: res.status
            })
          }
      })
  },
  goBack() {
    wx.navigateBack()
  },
  //提交
  submit() {
    if (this.checkEmpty()) {
      let params = {
        name: this.data.name,
        content: this.data.content,
        contact: this.data.contact,
        commentId: this.data.commentId
      }
      WxApi.addCommentFeedback(params)
        .then(res => {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            mask: true,
            duration: 2000
          })
          if (res.code > 0){
            wx.navigateTo({
              url: '/pages/writeOpinion/writeOpinion?commentId=' + this.data.commentId + '&commentTitle=' +this.data.commentTitle,
            })
          }
        })
    }

  },
  //非空验证
  checkEmpty() {
    if (this.data.name == undefined || this.data.name == '') {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        mask: true,
        duration: 2000
      })
      return false
    }
    if (this.data.contact == undefined || this.data.contact == '') {
      wx.showToast({
        title: '联系方式不能为空',
        icon: 'none',
        mask: true,
        duration: 2000
      })
      return false
    }
    if(!this.checkContact()){
      wx.showToast({
        title: '联系方式不正确',
        icon: 'none',
        mask: true,
        duration: 2000
      })
      return false
    }
    if (this.data.content == undefined || this.data.content == '') {
      wx.showToast({
        title: '意见内容不能为空',
        icon: 'none',
        mask: true,
        duration: 2000
      })
      return false
    }
    return true
  },
  //检查联系方式
  checkContact() {
    var flag = false
    const str = this.data.contact;
    if (str.indexOf('@') > 0) {
      if ((/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(this.data.contact))) {
        flag = true
      }
    } else {

      if ((/^1[345789]\d{9}$/.test(this.data.contact))) {
        flag = true
      }
      if ((/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(this.data.contact))) {
        flag = true
      }
    }
    return flag;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      pages: {
        pagesLength: getCurrentPages().length,
      },
      commentId: options.commentId,
      commentTitle: options.commentTitle
    })
    this.getCommentFeedback()
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