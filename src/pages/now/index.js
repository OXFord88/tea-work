// pages/now/index.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 120,
    tag: '经历',
    // imgUrl: '/images/test-img.jpg',
    time: '3月22日 22:30',
    viewsTime: 222,
    message: '这里记录写下你的心情，这里记录写下你的心情，这里记录写下你的心情，这里记录写下你的心情，这里记录写下你的心情，这里记录写下你的心情，这里记录写下你的心情，这里记录写下你的心情，'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      test: 'hello oxford'
    })
    console.log(app.globalData, '---===')
    wx.setTabBarBadge({
      index: 0,
      text: ''
    })
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
  
  },
  tapEvent(even) {
    console.log(even)
  }
})