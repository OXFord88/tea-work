// pages/message/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 2,
    isGet: true,
    isSend: false,
    pageLists: [{
      isNew: true,
      num: 12,
      content: 'hello hello叶青青叶青青叶青青叶青青叶青青叶青青叶青青叶青青叶青青叶青青叶青青',
      name: '叶青青',
      time: 'xx月xx日 xx:xx',
      isCollect: true,
      isZan: true
    }, {
      num: 13,
      content: 'hello hello',
      name: '叶青青',
      time: 'xx月xx日 xx:xx',
      isCollect: false
    }, {
      num: 14,
      content: 'hello hello',
      name: '叶青青',
      time: 'xx月xx日 xx:xx',
      isCollect: false
    }]
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
  
  },
  toggleTab: function(event) {
    let str = event.target.id;
    this.setData({
      isGet: str === 'get',
      isSend: str === 'send'
    })
  }
})