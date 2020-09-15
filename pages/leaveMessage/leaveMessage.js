// pages/photograph/photograph.js
const WxApi = require('../../utils/api.js')
const Config = require('../../utils/config.js');
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 下拉数组
    array: ['--请选择留言类型--', '咨询', '建议', '投诉', '举报', '其他'],
    // 下拉索引
    selectIndex: 0,
    name: '',
    contact: '',
    title: '',
    content: '',
    isNotSubmit:false
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /**
   * 选择留言类型
   */
  bindPickerChange(e) {
    if (e.detail.value > 0) {
      this.setData({
        selectIndex: e.detail.value
      })
    } else {
      wx.showModal({
        cancelColor: 'red',
        content: '请选择留言类型！'
      })
    }
  },
  /**
   * 添加联系方式
   */
  addContact: function(e) {
    var value = e.detail.value;
    if (value == "") {
      wx.showModal({
        cancelColor: 'red',
        content: "请输入联系方式！"
      })
    } else {
      if ((/^1[3456789]\d{9}$/.test(value)) || /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value) ||
        /^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$/.test(value)) {
        this.setData({
          contact: value
        })
      } else {

        wx.showModal({
          cancelColor: 'red',
          content: "联系方式格式不正确，请重新输入！"
        })
      }
    }
  },
  /**
   * 添加姓名
   */
  addName: function(e) {
    if (e.detail.value != "") {
      this.setData({
        name: e.detail.value
      })
    } else {
      wx.showModal({
        cancelColor: 'red',
        content: "请输入你的姓名！"
      })
    }
  },
  /**
   * 添加标题
   */
  addTitle: function(e) {
    if (e.detail.value != "") {
      if (e.detail.value.length > 30) {
        wx.showModal({
          cancelColor: 'red',
          content: '标题不能多余30个字符！'
        })
      } else {
        this.setData({
          title: e.detail.value
        })
      }
    } else {
      wx.showModal({
        cancelColor: 'red',
        content: "请输入标题！"
      })
    }
  },
  /**
   * 添加内容
   */
  addContent: function(e) {
    var value = e.detail.value;
    if (value != '') {
      if (value.length <= 1000) {

        this.setData({
          content: e.detail.value
        })
      } else {
        wx.showModal({
          cancelColor: 'red',
          content: '内容最多输入1000个字符'
        })
      }
    } else {
      wx.showModal({
        cancelColor: 'red',
        content: '请输入内容！'
      })
    }
  },
  // 点击提交按钮
  submitInfo() {
    const params = {
      name: this.data.name,
      contact: this.data.contact,
      title: this.data.title,
      content: this.data.content,
      type: this.data.selectIndex
    }
    if (params.name != '' && params.title != '' && params.contact != '' && params.content != '' && params.type != '') {
      if (!this.data.isNotSubmit){
        WxApi.addMessage(params).then(res => {
          console.log(res);
          wx.navigateTo({
            url: '/pages/msgList/msgList?type=1',
          })
        })
      }
      this.setData({
        isNotSubmit: true
      })

    } else {
      wx.showModal({
        cancelColor: 'red',
        content: "请将信息输入完整！"
      })
    }
  },
  /**
   * 点击取消按钮
   */
  back: function() {
    var pages = getCurrentPages();
    var beforePage = pages[pages.length - 2]; //前一页
    wx.navigateBack({
      success: function() {
        beforePage.onLoad(); // 执行前一个页面的onLoad方法
      }
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