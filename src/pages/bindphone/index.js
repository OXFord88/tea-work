// pages/bindphone/index.js
const { bingMobile, checkbingMobile } = require('../../utils/fetch')
// const util = require('../../utils/util')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sendMsg: '获取验证码',
    canSend: true,
    mobile: null,
    code: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  
  },
  getMobild(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  getCode(e) {
    this.setData({
      code: e.detail.value
    })
  },
  check() {
    if (!this.data.mobile) {
      wx.showToast({
        title: '请输入手机号'
      })
      return false;
    }
    // if (!this.data.code) {
    //   wx.showToast({
    //     title: '请输入验证码'
    //   })
    //   return false;
    // }
    if (/1\d{10}/.test(this.mobile)) {
      wx.showToast({
        title: '请输入正确的手机号'
      })
      return false;
    }
  },
  sendCode() {
    this.check()
    let param = {
      userid: app.globalData.userInfo.userid || 9,
      mobile: this.data.mobile
    }
    bingMobile(param).then(res => {
      console.log(res)
    })
    if (!this.data.canSend) {
      return false;
    }
    let num = 60;
    let _this = this;
    _this.setData({
      sendMsg: num + 's后重新发送',
      canSend: false
    })
    let timer = setInterval(() => {
      num--;
      if (num === 0) {
        clearInterval(timer)
        _this.setData({
          sendMsg: '重新发送',
          canSend: true
        })
      } else {
        _this.setData({
          sendMsg: num + 's后重新发送',
          canSend: false
        })
      }
    }, 1000)
  },
  toComplate() {
    if (!this.data.code) {
      wx.showToast({
        title: '请输入验证码'
      })
      return false;
    }
    const that = this
    checkbingMobile({
      mobile: that.data.mobile,
      userid: app.globalData.userInfo.userid,
      code: that.data.code
    }).then( res => {
      console.log(res)
    })
  },
  bindThWx() {
    wx.showModal({
      title: '一键绑定手机',
      content: '如果你的微信已绑定手机，授权后可直接与茶布账号绑定',
      confirmText: '授权',
      confirmColor: '#4ABEBA',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

})