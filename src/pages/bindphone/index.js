// pages/bindphone/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sendMsg: '获取验证码',
    canSend: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  sendCode() {
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

})