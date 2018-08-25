// pages/like/index.js
const { checkLikes } = require('../../utils/fetch')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    likeNum: 20,
    likeLists: [{
      content: '页面的初始数据页面的初始数据页面的初始数据页面的初始数据',
      userName: '页面的初始数据',
      time: '月20日 10:20 ',
      imgUrl: '../../images/icon.jpg'
    }, {
      content: '页面的初始数据页面的初始数据页面的初始数据页面的初始数据',
      userName: '页面的初始数据',
      time: '月20日 10:20 ',
      // imgUrl: '../../images/icon.jpg'
    }],
    isFaverite: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userInfo = app.globalData.userInfo;
    checkLikes({userid: userInfo.userid, isFaverite: this.data.isFaverite, page: 1, pagesize: 10}).then( data => {
      console.log(data, '纸条data--checkLikes')
      if (data.data.code === '0000') {
        const list = data.data.data;
      }else{
        wx.showToast({
          icon: 'none',
          title: '获取喜欢信息失败:' + data.data.message
        })
      }
    }).catch(err => {
      console.log(err)
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
  
  }
})