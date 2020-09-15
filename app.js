const Config = require('./utils/config.js');
const API_BASE_URL = Config.domain;

//app.js
App({
  onLaunch: function () {
    this.globalData.capsuleBtn = wx.getMenuButtonBoundingClientRect()

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        const url = API_BASE_URL + '/oauth';
        const params = {
          code: res.code
        };

        // 获取openId
        wx.request({
          url: url,
          data: params,
          method: 'GET',
          success: res => {
            // console.log(res);
            if (res.data.code === 1) {
              this.globalData.openId = res.data.data.OpenId;
              // console.log(this.globalData.openId);
            } else {
              wx.showToast({
                title: '获取用户失败！',
                icon: 'none'
              })
            }
          },
          fail: err => {
            wx.showToast({
              title: '服务器繁忙！',
              icon: 'none'
            })
          }
        })

      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    // 胶囊的信息
    capsuleBtn: null
  }
})