// pages/add/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "左撇子也有人抢",
    num: '66',
    getPapeTapNum: '88',
    isUser: false,
    pageLists: [{
      num: 12,
      content: 'hello hello左撇子也有人抢左撇子也有人抢左撇子也有人抢左撇子也有人抢',
      name: '叶青青',
      isCollect: true,
      isZan: true,
      time: 'xx月xx日 xx:xx',
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
    // wx.getLocation({
    //   success: function(res) {
    //     console.log(res)
    //   },
    // })
    // wx.request({
    //   url: 'https://www.yanlu8.com/chabuweb/diary/getDiaryList',
    //   data: {
    //     userid: 8
    //   },
    //   method: "POST",
    //   success(res) {
    //     console.log(res)
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log(this.data.name)
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