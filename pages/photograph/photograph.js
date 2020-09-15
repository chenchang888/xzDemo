// pages/photograph/photograph.js
const WxApi = require('../../utils/api.js')
const Config = require('../../utils/config.js');
const UPLOAD_URL = Config.domain
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 缓存的文件列表
    tempFilesList: [],
    //添加的数据
    name: '',
    title: '',
    contact: '',
    content: '',
    affixs: [],
    affix: {
      name: '',
      path: '',
      takeType: ''
    },
    isNotSubmit: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

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
    const tempFilePaths = this.data.tempFilesList
    if (tempFilePaths != '') {
      if (this.data.name != '' && this.data.title != '' && this.data.contact != '' && this.data.content != '') {
        var type = '';
        var th = this;
        var temp = []
        tempFilePaths.forEach(function(item, index) {
          if (item.type == 'video') {
            type = 2
          }
          if (item.type == 'image') {
            type = 1
          }
          wx.uploadFile({
            url: UPLOAD_URL + '/message/uploadImg',
            filePath: item.path,
            name: 'file',
            header: {
              'content-type': 'multipart/form-data'
            },
            formData: {
              type: type
            },
            success(res) {
              var data = JSON.parse(res.data)
              console.log(data)
              temp.push({
                name: item.name,
                path: data.imgUrl,
                takeType: data.takeType
              })
              if (index == tempFilePaths.length - 1) {
                th.setData({
                  affixs: temp
                })
                th.addTake();
              }
            },
            fail(err) {
              wx.showModal({
                cancelColor: 'red',
                content: '照片或视频上传失败，请重新上传！'
              })
            }
          })
        })
      } else {
        wx.showModal({
          cancelColor: 'red',
          content: "请将信息输入完整！"
        })
      }
    } else {
      wx.showModal({
        cancelColor: 'red',
        content: "请上传照片或视频！"
      })
    }
  },
  /**
   * 添加
   */
  addTake: function() {
    const params = {
      name: this.data.name,
      title: this.data.title,
      contact: this.data.contact,
      content: this.data.content,
      affixs: JSON.stringify(this.data.affixs)
    }
    if (!this.data.isNotSubmit) {
      WxApi.addTakePictures(params).then(res => {
        wx.navigateTo({
          url: '/pages/msgList/msgList?type=2',
        })
      })
    }
    this.setData({
      isNotSubmit: true
    })
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
  // 删除文件
  delFile(e) {
    this.data.tempFilesList.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      tempFilesList: this.data.tempFilesList
    })
  },

  // 选择媒体文件
  chooseMedia() {
    var that = this
    wx.chooseImage({
      sourceType: ['album', 'camera'],
      count: 10,
      success(res) {
        
        // tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFiles 
        if (that.data.tempFilesList.length) {
          tempFilePaths = [...tempFilePaths, ...that.data.tempFilesList]
        }
        tempFilePaths.forEach((item, index) => {
          item.name = '文件' + (index + 1)
        })
        that.setData({
          tempFilesList: tempFilePaths
        })
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