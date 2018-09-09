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
    textareaValue: '',
    hasImg: false,
    imgUrl: '',
    textNum: 100,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  changeAvart:function () {
    const that = this;
    wx.showActionSheet({
      itemList: ['从相册', '拍照'],
      success: function(res) {
        if (res.tapIndex === 0) {
          that.choose('album')
        }else if (res.tapIndex === 1) {
          that.choose('camera')
        }
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    }) 
  },
  choose: function (type) {
    const that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: [type],
      success: function (res) {
        const tempFilePaths = res.tempFilePaths
        that.setData({
          hasImg: true,
          imgUrl: tempFilePaths[0],
          // changeAvartValue: true
        })
        // that.upload(that, tempFilePaths[0])
      }
    })
  },






  changeCheck: function (e) {
    this.setData({
      checked: e.detail.value.length ? 'true' : 'false'
    })
  },
  valueChange: function (e) {
    this.setData({
      textareaValue: e.detail.value,
      textNum: 100 - e.detail.value.length
    })
  },
  pushtime: function () {
    const userInfo = app.globalData.userInfo;
    console.log(userInfo)
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