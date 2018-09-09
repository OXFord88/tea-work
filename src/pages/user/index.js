// pages/user/index.js
const { checkUserTime } = require('../../utils/fetch')
const util = require('../../utils/util')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      imgUrl: '../../images/icon.jpg',
      userName: '左撇子',
      city: '北京',
      days: 333,
      visits: 222,
      six: 1
    },
    myNowLists: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData)
    console.log('eee')
    let para = {
      userid: 9,
      page: 1,
      pagesize: 4
    }
    checkUserTime(para).then(data => {
      console.log(data)
      const res = data.data
      if (res.code === '0000') {
        res.data.map(item => {
          item.created = util.formatTime(item.created)
        })
        console.log(res.data)
        this.setData({
          myNowLists: res.data
        })
      } else {
        console.log(res.message)
      }
    })
    // wx.showToast({
    //   title: '已删除',
    //   icon: 'success',
    //   duration: 2000
    // })
  },
  pageToPerson() {
    wx.navigateTo({
      url: '../userInfo/index'
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