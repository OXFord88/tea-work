// pages/user/index.js
const { checkUserTime, checkUserMessage, delOneOfTime, reportContent } = require('../../utils/fetch')
const util = require('../../utils/util')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      imgUrl: '../../images/icon.jpg',
      nickname: '左撇子',
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
    // setTimeout(() => {
    //   console.log(app.globalData.userInfo, 'aaa')
    //   // const user = app.globalData.userInfo;
    //   //   console.log(user, 'user')
    //   this.setData({
    //     urserInfo: app.globalData.userInfo
    //   })
    //   console.log(this.data.userInfo)
    // }, 1000)
    let para1 = {
      userid: app.globalData.userid || 8,
      touserid: 8
    }
    let that = this
    checkUserMessage(para1).then(data => {
      if (data.data.code === '0000') {
        that.setData({
          userInfo: data.data.data
        })
      }
    })
    this.getDiaryList()
    // wx.showToast({
    //   title: '已删除',
    //   icon: 'success',
    //   duration: 2000
    // })
  },
  getDiaryList() {
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
  },
  delDiary(e) {
    // console.log(e.target.dataset.id)
    const pid = e.target.dataset.pid
    const id = e.target.dataset.id
    const that = this
    console.log(pid)
    if (pid == app.globalData.userInfo.userid) {
      wx.showModal({
        // showCancel: false,
        content: '确认删除该此刻',
        confirmText: '删除',
        success: function(res) {
          // console.log(res)
          if (res.confirm) {
            delOneOfTime({
              userid: app.globalData.userInfo.userid,
              diaryid: id
            }).then(res => {
              if (res.data.code === '0000') {
                that.getDiaryList()
              }
            })
          }

        }
      })
    } else {
      wx.showModal({
        // showCancel: false,
        content: '确认举报该此刻',
        confirmText: '举报',
        success: function(res) {
          if (res.confirm) {
            reportContent({
              userid: app.globalData.userInfo.userid,
              flag: 2,
              referenceid : id
            }).then(res => {
              console.log(res)
            })
          }
        }
      })
    }
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
    setTimeout(() => {
      console.log(app.globalData.userInfo, 'aaa')
      this.setData({
        userInfo: app.globalData.userInfo
      })
      console.log(this.data.userInfo)
    }, 200)
  
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