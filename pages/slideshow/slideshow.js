const WxApi = require('../../utils/api.js')
const WxParse = require('../../wxParse/wxParse.js');
const Config = require('../../utils/config.js');
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //是否显示评价弹框
    _showMsg: false,
    id: undefined,
    //标题
    title: '',
    //评价内容
    evaluation: '',
    //來源
    source: '',
    //发布时间
    time: '',
    //是否可以操作
    operation: true,
    //是否收藏 0 未收藏 1 收藏
    enshrineStatus: 0,
    // 是否是点赞
    isClickedLike: false,
    //点赞数
    num: 0,
    //是否显示评论
    showComments: false,
    showCollect: false,
    //评价集合
    evaluationList:[]
  },
  /**
   * 评价
   */
  showMsg() {
    this.setData({
      _showMsg: true
    })
  },
  /**
   * 关闭评价
   */
  closeMsg() {
    console.log(this.data.operation)
    if (!this.data.operation) {
      this.setData({
        _showMsg: false,
      })
    } else {
      this.setData({
        evaluation: '',
        _showMsg: false,
      })
    }
  },
  //点赞
  clickLike() {
    let status = 0
    if (!this.data.isClickedLike) {
      status = 1
    }
    const params = {
      articleId: this.data.id,
      status: status,
      type: 3
    }

    WxApi.setEvaluationStatus(params)
      .then(res => {

        this.setData({
          isClickedLike: !this.data.isClickedLike
        })
        if (this.data.isClickedLike) {
          this.setData({
            num: this.data.num + 1
          })
        } else {
          if (this.data.num > 0) {
            this.setData({
              num: this.data.num - 1
            })
          }
        }
      })

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
      type: 3
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
  // 获取输入的值
  getInputContent({
    detail
  }) {
    this.setData({
      evaluation: detail.value
    })
  },
  //提交评价
  setEvaluation() {
    if (this.data.evaluation == '' || this.data.evaluation.length==0){
      wx.showToast({
        title: '评价内容不能为空',
        icon: 'none',
        mask: true,
        duration: 2000
      }) 
    }else{
      const params = {
        articleId: this.data.id,
        content: this.data.evaluation,
        type: 3
      }

      WxApi.setEvaluationContent(params)
        .then(res => {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            mask: true,
            duration: 2000
          })
          this.setData({
            _showMsg: false,
            operation: false
          })
        })
    }
  },
  //获取数据
  getData() {
    wx.showLoading({
      title: '数据正在加载中……',
    })
    let params = {
      id: this.data.id
    };
    WxApi.getSlideshowContent(params)
      .then(res => {
        wx.hideLoading({})
        this.setData({
          releaseDept: res.releaseDept,
          evaluation: res.evaluation,
          title: res.title,
          source: res.source,
          time: res.time,
          num: res.num,
          attentionStatus: res.attentionStatus,
          enshrineStatus: res.enshrineStatus,
          evaluationList: res.evaluationList
        })
        //设置是否评论
        if (res.checkStatus > 0) {
          if (res.evaluation != '' && res.evaluation != undefined) {
            this.setData({
              showComments: true
            })
          }
        }
        //设置是否可以提交
        if (this.data.evaluation != '') {
          this.setData({
            operation: false
          })
        }

        //设置收藏状态
        if (res.enshrineStatus > 0) {
          this.setData({
            showCollect: true
          })
        }
        //设置点赞效果
        if (res.status > 0) {
          this.setData({
            isClickedLike: true
          })
        }
        //设置状态
        this.setStatus(this.data.attentionStatus);

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