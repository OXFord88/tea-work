// pages/userInfo/index.js
// const { formatDate } = '../utils/util.js'
const util = require('../../utils/util')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    
    setTimeout(function () {
      console.log(app.globalData.userInfo, '&&&&')
      if (app.globalData.userInfo) {
        // app.globalData.userInfo.map(item => {
        //   item.birth = util.formatDate(item.birth)
        // })
        that.setData({
          message: app.globalData.userInfo
        })
        // console.log(that.data.message.message.avatar)
      } 
    },500)
    
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
  pageToBind() {
    wx.navigateTo({
      url: '../bindphone/index',
    })
  }
  
})








