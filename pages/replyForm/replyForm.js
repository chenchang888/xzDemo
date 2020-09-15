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

      // 信息内容
      content: '',
      // 信息用途
      purpose: '',
      // 载体形式
      carrierForm: [],
      // 信息方式
      msgType: []
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
        name: 'unit',
        rules: { required: true, message: '请输入您的工作单位' },
      },
      {
        name: 'cardCode',
        rules: { required: true, message: '请输入您的证件号码' }
      },
      {
        name: 'email',
        rules: [{ required: true, message: '请输入您的电子邮箱' }, { email: true, message: '电子邮箱格式不对' }]
      },
      {
        name: 'phone',
        rules: [{ required: true, message: '请输入您的联系电话' }, { mobile: true, message: '手机号码格式不对' }]
      },
      {
        name: 'postCode',
        rules: { required: true, message: '请输入您的邮政编码' },
      },
      {
        name: 'address',
        rules: { required: true, message: '请输入您的联系地址' },
      },
      {
        name: 'fax',
        rules: { required: true, message: '请输入您的传真' },
      },
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
        name: 'postCode',
        rules: { required: true, message: '请输入邮政编码' },
      },
      {
        name: 'address',
        rules: { required: true, message: '请输入联系地址' },
      },
      {
        name: 'fax',
        rules: { required: true, message: '请输入传真' },
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
  // 联系地址
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
        this.setData({
          nextFlag: false
        })
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
    if (this.data.type === 0) {
      this.setData({
        "personalFormData.content": value.trim()
      })
    } else {
      this.setData({
        "enterpriseFormData.content": value.trim()
      })
    }
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
    if (this.data.type === 0) {
      this.setData({
        "personalFormData.purpose": value.trim()
      })
    } else {
      this.setData({
        "enterpriseFormData.purpose": value.trim()
      })
    }
  },

  // 所需要的信息载体形式
  handleCarrierForm(e) {
    const { index } = e.currentTarget.dataset
    if (this.data.type === 0) {
      const carry = this.data.personalFormData.carrierForm
      // 利用findIndex查找表单中的carrierForm是否含有所点击的选项，如果没有返回-1，则添加该选项，反之删除该选项
      const i = carry.findIndex(item => item === this.data.carrierForms[index].name)
      if (i === -1) {
        carry.push(this.data.carrierForms[index].name)
      } else {
        carry.splice(i, 1)
      }
      this.setData({
        'personalFormData.carrierForm': carry
      })
    }
    else {
      const carry = this.data.enterpriseFormData.carrierForm
      // 原理同上
      const i = carry.findIndex(item => item === this.data.carrierForms[index].name)
      if (i === -1) {
        carry.push(this.data.carrierForms[index].name)
      } else {
        carry.splice(i, 1)
      }
      this.setData({
        'enterpriseFormData.carrierForm': carry
      })
    }
    // 点击修改状态，取反
    this.data.carrierForms[index].current = !this.data.carrierForms[index].current
    this.setData({
      'carrierForms': this.data.carrierForms,
    })
  },
  // 所需要的获取信息的方式
  handleAccessMethod(e) {
    const { index } = e.currentTarget.dataset
    if (this.data.type === 0) {
      const msgTypes = this.data.personalFormData.msgType
      // 与所需要的信息载体形式同理
      const i = msgTypes.findIndex(item => item === this.data.infoMethods[index].name)
      if (i === -1) {
        msgTypes.push(this.data.infoMethods[index].name)
      } else {
        msgTypes.splice(i, 1)
      }
      this.setData({
        'personalFormData.msgType': msgTypes
      })
    } else {
      const msgTypes = this.data.enterpriseFormData.msgType
      // 与所需要的信息载体形式同理
      const i = msgTypes.findIndex(item => item === this.data.infoMethods[index].name)
      if (i === -1) {
        msgTypes.push(this.data.infoMethods[index].name)
      } else {
        msgTypes.splice(i, 1)
      }
      this.setData({
        'enterpriseFormData.msgType': msgTypes
      })
    }
    // 点击状态取反
    this.data.infoMethods[index].checked = !this.data.infoMethods[index].checked
    this.setData({
      'infoMethods': this.data.infoMethods
    })
  },
  // 提交表单
  async subReplyForm() {
    if (this.data.type === 0) {
      // 个人表单信息是否完善
      if (this.data.personalFormData.carrierForm.length === 0 || this.data.personalFormData.msgType.length === 0 || this.data.personalFormData.content === '' || this.data.personalFormData.purpose === '') {
        wx.showToast({
          title: '请完善所有信息！',
          icon: 'none',
          duration: 2000
        })
      } else {
        const res = await WxApi.addReplyForm(this.data.personalFormData)
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
      }
    } else {
      // 企业表单信息是否完善
      if (this.data.enterpriseFormData.carrierForm.length === 0 || this.data.enterpriseFormData.msgType.length === 0 || this.data.enterpriseFormData.content === '' || this.data.enterpriseFormData.purpose === '') {
        wx.showToast({
          title: '请完善所有信息！',
          icon: 'none',
          duration: 2000
        })
      } else {
        const res = await WxApi.addReplyForm(this.data.enterpriseFormData)
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
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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