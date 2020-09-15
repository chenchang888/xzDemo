// pages/needKnow/needKnow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: `        对于公开权利人的申请，能够当场答复或者提供政府信息的，当场予以答复或者提供政府信息；不能当场答复或者提供政府信息的，自收到申请之日起20个工作日内根据下列不同情况进行处理：
    （一）属于依申请公开范围的，应当制作公开决定书，向公开权利人提供其所需要的政府信息；
    （二）属于不予公开范围的，应当制作政府信息不予公开决定书，告知公开权利人；
    （三）属于已主动公开的，应当告知公开权利人获取该政府信息的方式和途径；
    （四）属于主动公开范围但尚未主动公开的，应当及时向公开权利人提供其所需要政府信息；
    （五）申请公开的政府信息不存在的，应当书面告知公开权利人；
    （六）申请公开的内容不明确的，应当告知公开权利人更改完善、补充申请。
    （七）公开义务人应当建立政府信息公开审核制度，在向公开权利人提供政府信息前，应当依照《中华人民共和国保守国家秘密法》以及其他法律、法规和国家有关规定对拟公开的政府信息进行保密审查。对依申请公开的政府信息不能确定是否可以公开时，应当依照法律、法规和国家有关规定及时报有关主管部门或者保密工作部门确定。
    （八）因正当理由不能在规定的期限内作出答复或者提供政府信息的，经单位负责人同意，可以将答复或者提供政府信息的期限适当延长并书面告知申请人，延长期限不得超过20个工作日。公开义务人征求第三方意见所需时间不计算在本条第一款规定的期限内。`,
    time: 15,
    btn: true,
    flag: false
  },

  // 倒计时
  countDown() {
    var times = setInterval(() => {
      if (this.data.time == 1) {
        // 清除定时器
        clearInterval(times);
        this.setData({
          btn: false,
          time: '',
          flag: true
        })
      } else {
        this.data.time--
        this.setData({
          "time": this.data.time--
        })
      }
    }, 1000);
  },
  // 查看是否授权登录
  grantAuthorization() {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          // 未登录弹窗提示
          wx.showModal({
            title: '提示',
            content: '该服务需要登录，请您先前往登录',
            confirmText: '登录',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../person/person'
                })
              } else if (res.cancel) {
                wx.navigateTo({
                  url: '../home/home'
                })
              }
            }
          })
        }
        return;
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.countDown()
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
    this.grantAuthorization()
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