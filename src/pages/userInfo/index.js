// pages/userInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    userInfo: {
      imgUrl: '../../images/icon.jpg',
      userName: '左撇子',
      city: '北京',
      days: 333,
      visits: 222,
      six: 1,
      school: '华北电力大学'
    },
    myNowLists: [{
      num: 33,
      time: 'xx月xx日 10:00',
      content: '页面的初始数据页面的初始数据页面的初始数据页面的初始数据',
      imgUrl: '../../images/icon.jpg'
    }, {
      num: 33,
      time: 'xx月xx日 10:00',
      content: '页面的初始数据页面的初始数据页面的初始数据页面的初始数据',
      imgUrl: ''
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
  pageToBind() {
    wx.navigateTo({
      url: '../bindphone/index',
    })
  }
  
})








