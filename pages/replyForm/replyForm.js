const WxApi = require('../../utils/api.js')
const Config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    // 个人表单和企业表单选中状态
    select: true,
    // 表单是否选择了下一步
    nextFlag: true,
    // 类型
    type: 0,

    personalImg: [],
    enterpriseImg: [],
    affixPathImg: [],
    // 个人表单数据
    personalFormData: {
      // 姓名/名称、企业/单位
      name: '',
      // 申请类型 0 个人 1 企业
      type: 0,
      // 工作单位
      unit: '',
      // 证件名称
      cardType: '身份证',
      // 证件号码
      cardCode: '',
      // 邮箱
      email: '',
      // 号码
      phone: '',
      // 邮政编码
      postCode: '',
      // 地址
      address: '',
      // 传真
      fax: '',
      // 身份证照片
      cardPath: []
    },

    // 企业表单
    enterpriseFormData: {
      // 企业/单位
      name: '',
      // 法人代表
      lawPerson: '',
      // 申请类型 0 个人 1 企业
      type: 1,
      // 联系人姓名
      contactName: '',
      // 联系人号码
      phone: '',
      // 组织机构代码
      unitCode: '',
      // 邮政编码
      postCode: '',
      // 地址
      address: '',
      // 传真
      fax: '',
      // 营业执照等有效证件
      businessPath: []
    },

    // 依申请内容
    affixContent: {
      // 附件
      affixPath: [],
      // 信息内容
      content: '',
      // 信息用途
      purpose: '',
      // 载体形式
      carrierForm: [],
      // 信息方式
      msgType: []
    },

    // 所需载体形式
    carrierForms: [
      {
        name: "纸面",
        current: false
      },
      {
        name: "电子邮件",
        current: false
      },
      {
        name: "磁盘",
        current: false
      },
      {
        name: "光盘",
        current: false
      }],
    // 获取信息的方式
    infoMethods: [
      {
        name: "邮寄",
        checked: false
      },
      {
        name: "电子邮件",
        checked: false
      },
      {
        name: "快递",
        checked: false
      },
      {
        name: "传真",
        checked: false
      },
      {
        name: "自行领取",
        checked: false
      }
    ],
    // 证件名称选择 
    cards: ['身份证', '驾驶证', '士兵证', '护照', '其他'],
    cardIndex: 0,
    // 个人验证规则
    rules: [
      {
        name: 'name',
        rules: { required: true, message: '请输入您的姓名' },
      },
      {
        name: 'cardCode',
        rules: { required: true, message: '请输入您的证件号码' }
      },
      {
        name: 'phone',
        rules: [{ required: true, message: '请输入您的联系电话' }, { mobile: true, message: '手机号码格式不对' }]
      },
      {
        name: 'address',
        rules: { required: true, message: '请输入您的邮寄地址' },
      }
    ],
    // 企业验证规则
    rule: [
      {
        name: 'name',
        rules: { required: true, message: '请输入企业名称' },
      },
      {
        name: 'lawPerson',
        rules: { required: true, message: '请输入法人代表' },
      },
      {
        name: 'contactName',
        rules: { required: true, message: '请输入联系人姓名' },
      },
      {
        name: 'phone',
        rules: [{ required: true, message: '请输入您的联系电话' }, { mobile: true, message: '手机号码格式不对' }]
      },
      {
        name: 'address',
        rules: { required: true, message: '请输入邮寄地址' },
      }
    ]
  },
  // 点击个人切换
  handlePersonal() {
    this.setData({
      'select': true,
      'type': 0
    })
  },
  // 点击企业切换
  handleCompany() {
    this.setData({
      'select': false,
      'type': 1
    })
  },
  bindPickerChange(e) {
  },
  // 姓名/企业名称
  formNameChange(e) {
    const res = e.detail.value.trim()
    if (this.data.type === 0) {
      this.setData({
        "personalFormData.name": res
      })
    } else {
      this.setData({
        "enterpriseFormData.name": res
      })
    }
  },
  // 法人代表
  formLawChange(e) {
    const res = e.detail.value.trim()
    this.setData({
      "enterpriseFormData.lawPerson": res
    })
  },
  // 联系人姓名
  formPersonChange(e) {
    const res = e.detail.value.trim()
    this.setData({
      "enterpriseFormData.contactName": res
    })
  },
  // 组织机构代码
  formOrgChange(e) {
    const res = e.detail.value.trim()
    this.setData({
      "enterpriseFormData.unitCode": res
    })
  },
  // 工作单位
  formCompanyChange(e) {
    const res = e.detail.value.trim()
    this.setData({
      "personalFormData.unit": res
    })
  },
  // 证件名称
  bindCardChange(e) {
    const i = Number(e.detail.value)
    this.setData({
      cardIndex: e.detail.value,
      'personalFormData.cardType': this.data.cards[i]
    })
  },
  // 证件号码
  formIdNumberChange(e) {
    const res = e.detail.value.trim()
    this.setData({
      "personalFormData.cardCode": res
    })
  },
  // 邮箱
  formEmailChange(e) {
    const res = e.detail.value.trim()
    if (this.data.type === 0) {
      this.setData({
        "personalFormData.email": res
      })
    } else {
      this.setData({
        "enterpriseFormData.email": res
      })
    }
  },
  // 联系电话
  formPhoneChange(e) {
    const res = e.detail.value.trim()
    if (this.data.type === 0) {
      this.setData({
        "personalFormData.phone": res
      })
    } else {
      this.setData({
        "enterpriseFormData.phone": res
      })
    }
  },
  // 邮政编码
  formPostalChange(e) {
    const res = e.detail.value.trim()
    if (this.data.type === 0) {
      this.setData({
        "personalFormData.postCode": res
      })
    } else {
      this.setData({
        "enterpriseFormData.postCode": res
      })
    }
  },
  // 邮寄地址
  formAddressChange(e) {
    const res = e.detail.value.trim()
    if (this.data.type === 0) {
      this.setData({
        "personalFormData.address": res
      })
    } else {
      this.setData({
        "enterpriseFormData.address": res
      })
    }
  },
  // 传真
  formFaxChange(e) {
    const res = e.detail.value.trim()
    if (this.data.type === 0) {
      this.setData({
        "personalFormData.fax": res
      })
    } else {
      this.setData({
        "enterpriseFormData.fax": res
      })
    }
  },

  // 添加身份证照片
  chooseCardImg() {
    var _that = this
    const imgNum = 2 - _that.data.personalImg.length
    wx.chooseImage({
      count: imgNum,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        for (let i = 0; i < tempFilePaths.length; i++) {
          const element = tempFilePaths[i];
          wx.uploadFile({
            url: Config.domain + '/uploadPublic',
            filePath: tempFilePaths[i],
            name: 'file',
            success(res) {
              const data = JSON.parse(res.data)
              // 追加到需要提交的图片数组中
              const dataImgPath = _that.data.personalFormData.cardPath.concat(data.imgUrl)
              // 拼接路径
              const urls = Config.imgUrl + '/' + data.imgUrl
              // 追加到显示到页面的图片数组中
              const dataPath = _that.data.personalImg.concat(urls)
              _that.setData({
                'personalFormData.cardPath': dataImgPath,
                'personalImg': dataPath,
              })
            }
          })
        }
      }
    })
  },
  // 删除身份证图片
  deleteCardImg(e) {
    const { index } = e.target.dataset
    const urls = this.data.personalImg
    urls.splice(index, 1)
    const paths = this.data.personalFormData.cardPath
    paths.splice(index, 1)
    this.setData({
      'personalImg': urls,
      'personalFormData.cardPath': paths,
    })
  },
  // 营业执照等有效证件
  chooseBusinessImg(num,) {
    var _that = this
    const imgNum = 9 - _that.data.enterpriseImg.length
    wx.chooseImage({
      count: imgNum,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        for (let i = 0; i < tempFilePaths.length; i++) {
          const element = tempFilePaths[i];
          wx.uploadFile({
            url: Config.domain + '/uploadPublic',
            filePath: tempFilePaths[i],
            name: 'file',
            success(res) {
              const data = JSON.parse(res.data)
              const dataImgPath = _that.data.enterpriseFormData.businessPath.concat(data.imgUrl)
              const urls = Config.imgUrl + '/' + data.imgUrl
              const dataPath = _that.data.enterpriseImg.concat(urls)
              _that.setData({
                'enterpriseFormData.businessPath': dataImgPath,
                'enterpriseImg': dataPath,
              })
            }
          })
        }
      }
    })
  },
  // 删除营业执照等有效证件
  deleteBusinessImg(e) {
    const { index } = e.target.dataset
    const urls = this.data.enterpriseImg
    urls.splice(index, 1)
    const paths = this.data.enterpriseFormData.businessPath
    paths.splice(index, 1)
    this.setData({
      'enterpriseImg': urls,
      'enterpriseFormData.businessPath': paths
    })
  },

  // 下一步，进行表单验证
  next_btn() {
    // validate接收回调函数，valid表示是否效验通过，errors为失败的字段列表
    this.selectComponent('#form').validate((valid, errors) => {
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
        }
      } else {
        // 首先判断该表单是个人还是企业
        if (this.data.type === 0) {
          // 个人是否上传身份证效验
          if (this.data.personalImg.length != 2) {
            wx.showToast({
              title: '请上传您的身份证照片(正反面共两张)！',
              icon: 'none',
              duration: 3000
            })
          } else {
            this.setData({
              nextFlag: false
            })
          }
        } else {
          // 企业上传营业执照等有效证件认证
          if (this.data.enterpriseImg.length === 0) {
            wx.showToast({
              title: '请上传营业执照等有效证件！',
              icon: 'none',
              duration: 3000
            })
          } else {
            this.setData({
              nextFlag: false
            })
          }
        }
      }
    })
  },
  // 信息内容
  formTextContent(e) {
    const { value } = e.detail
    if (value === '') {
      wx.showToast({
        title: '信息内容不能为空！',
        icon: 'none',
        duration: 2000
      })
    }
    this.setData({
      "affixContent.content": value.trim()
    })
  },
  // 信息用途
  formInfoUse(e) {
    const { value } = e.detail
    if (value === '') {
      wx.showToast({
        title: '信息用途不能为空！',
        icon: 'none',
        duration: 2000
      })
    }
    this.setData({
      "affixContent.purpose": value.trim()
    })
  },

  // 所需要的信息载体形式
  handleCarrierForm(e) {
    const { index } = e.currentTarget.dataset
    const carry = this.data.affixContent.carrierForm
    // 利用findIndex查找表单中的carrierForm是否含有所点击的选项，如果没有返回-1，则添加该选项，反之删除该选项
    const i = carry.findIndex(item => item === this.data.carrierForms[index].name)
    if (i === -1) {
      carry.push(this.data.carrierForms[index].name)
    } else {
      carry.splice(i, 1)
    }
    this.setData({
      'affixContent.carrierForm': carry
    })
    // 点击修改状态，取反
    this.data.carrierForms[index].current = !this.data.carrierForms[index].current
    this.setData({
      'carrierForms': this.data.carrierForms,
    })
  },
  // 所需要的获取信息的方式
  handleAccessMethod(e) {
    const { index } = e.currentTarget.dataset
    const msgTypes = this.data.affixContent.msgType
    // 与所需要的信息载体形式同理
    const i = msgTypes.findIndex(item => item === this.data.infoMethods[index].name)
    if (i === -1) {
      msgTypes.push(this.data.infoMethods[index].name)
    } else {
      msgTypes.splice(i, 1)
    }
    this.setData({
      'affixContent.msgType': msgTypes
    })
    // 点击状态取反
    this.data.infoMethods[index].checked = !this.data.infoMethods[index].checked
    this.setData({
      'infoMethods': this.data.infoMethods
    })
  },

  // 上传附件
  chooseEnclosureImg() {
    var _that = this
    const imgNum = 9 - _that.data.affixPathImg.length
    wx.chooseImage({
      count: imgNum,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        for (let i = 0; i < tempFilePaths.length; i++) {
          const element = tempFilePaths[i];
          wx.uploadFile({
            url: Config.domain + '/uploadPublic',
            filePath: tempFilePaths[i],
            name: 'file',
            success(res) {
              const data = JSON.parse(res.data)
              const dataImgPath = _that.data.affixContent.affixPath.concat(data.imgUrl)
              const urls = Config.imgUrl + '/' + data.imgUrl
              const dataPath = _that.data.affixPathImg.concat(urls)
              _that.setData({
                'affixContent.affixPath': dataImgPath,
                'affixPathImg': dataPath
              })
            }
          })
        }
      }
    })
  },
  // 删除附件图片
  deleteEnclosureImg(e) {
    const { index } = e.target.dataset
    const urls = this.data.affixPathImg
    urls.splice(index, 1)
    const paths = this.data.affixContent.affixPath
    paths.splice(index, 1)
    this.setData({
      'affixPathImg': urls,
      'affixContent.affixPath': paths
    })
  },

  // 提交表单
  // 提交加载
  showLoading() {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000,
      })
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/home/home',
        })
      }, 2000)
    }, 2000)
  },
  async subReplyForm() {
    // 个人表单信息是否完善
    if (this.data.affixContent.carrierForm.length === 0 || this.data.affixContent.msgType.length === 0 || this.data.affixContent.content === '' || this.data.affixContent.purpose === '') {
      wx.showToast({
        title: '请完善所有信息！',
        icon: 'none',
        duration: 2000
      })
    } else {
      // 转化成字符串
      const affixStr = this.data.affixContent.affixPath.join()
      if (this.data.type === 0) {
        // 转化成字符串
        const personalStr = this.data.personalFormData.cardPath.join()
        this.setData({
          'affixContent.affixPath': affixStr,
          'personalFormData.cardPath': personalStr,
        })
        // 将个人表单与下一页的内容解构为一个对象
        const personalForm = { ...this.data.personalFormData, ...this.data.affixContent }
        const res = await WxApi.addReplyForm(personalForm)
        this.showLoading()
      } else {
        // 转化成字符串
        const enterpriseStr = this.data.enterpriseFormData.businessPath.join()
        this.setData({
          'affixContent.affixPath': affixStr,
          'enterpriseFormData.businessPath': enterpriseStr,
        })
        // 将企业表单与下一页的内容解构为一个对象
        const enterpriseForm = { ...this.data.enterpriseFormData, ...this.data.affixContent }
        const res = await WxApi.addReplyForm(enterpriseForm)
        this.showLoading()
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { },

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