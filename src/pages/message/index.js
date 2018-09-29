// pages/message/index.js

const { checkMyPaper, mySendPaper } = require('../../utils/fetch')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 2,
    isGet: true,
    isDuihua: false,
    isLike: false,
    isSend: false,
    pageLists: [{
      isNew: true,
      num: 12,
      content: 'hello hello叶青青叶青青叶青青叶青',
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
    }],
    likeNum: 20,
    likeLists: [{
      content: '页面的初始数据页面的初始数据页面的初始数据页面的初始数据',
      userName: '页面的初始数据',
      time: '月20日 10:20 ',
      imgUrl: '../../images/icon.jpg',
      tag: '经历'
    }, {
      content: '页面的初始数据页面的初始数据页面的初始数据页面的初始数据',
      userName: '页面的初始数据',
      time: '月20日 10:20 ',
      tag: '心情'
      // imgUrl: '../../images/icon.jpg'
    }],



    isFaverite: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gets()
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
  gets: function () {
    const userInfo = app.globalData.userInfo
    console.log(userInfo, 'userInfo') //userInfo.userid

    checkMyPaper({userid: userInfo.userid, isFaverite: this.data.isFaverite, page: 1, pagesize: 10}).then( data => {
      console.log(data, '纸条data--checkMyPaper')
      if (data.data.code === '0000') {
        const list = data.data.data;
      }else{
        wx.showToast({
          icon: 'none',
          title: '获取纸条信息失败:' + data.data.message
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  sends: function () {
    const userInfo = app.globalData.userInfo

    mySendPaper({userid: userInfo.userid, isFaverite: this.data.isFaverite, page: 1, pagesize: 10}).then( data => {
      console.log(data, '纸条data--mySendPaper')
      if (data.data.code === '0000') {
        const list = data.data.data;
      }else{
        wx.showToast({
          icon: 'none',
          title: '获取纸条信息失败:' + data.data.message
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  toggleTab: function(event) {
    let str = event.target.id;
    console.log(str)
    this.setData({
      isGet: str === 'get',
      isDuihua: str === 'duihua',
      isLike: str === 'like',
      isSend: str === 'send'
    })
    if (str === 'get') {
      this.gets()
    }else{
      this.sends()
    }
  }
})









