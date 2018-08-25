// pages/add/index.js
const { releaseTime } = require('../../utils/fetch')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "hello world",
    checked: 'true',
    tags: ['此刻','经历','心情','求助','烦恼','吐槽','愿望'],
    textareaValue: ''
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
    console.log(this.data.name)
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
  
  },
  changeCheck: function (e) {
    this.setData({
      checked: e.detail.value.length ? 'true' : 'false'
    })
  },
  valueChange: function (e) {
    this.setData({
      textareaValue: e.detail.value,
    })
  },
  pushtime: function () {
    const userInfo = app.globalData.userInfo;
    const para = {
      userid: userInfo.userid,
      tags: this.data.tags[1],
      content: this.data.textareaValue
    }
    // 仅自己可见的值为this.data.checked
    console.log('发布内容', para)
    releaseTime(para).then( data => {
      console.log(data.data)
      if (data.data.code === '0000') {
        wx.showToast({
          title: '发布信息成功！'
        })
      }else{
        wx.showToast({
          icon: 'none',
          title: '发布信息失败:' + data.data.message
        })
      }



    }).catch(err => {

    })

  }
})