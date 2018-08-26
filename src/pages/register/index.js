// pages/register/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showCalendar: false,
    avartUrl: '../../images/head-bg.png',
    sex: '0',
    days_style: [],

    nickname: undefined,
    birth: undefined,
    schools: undefined,
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let days = new Date().getDate()
    console.log(days)
    let json = {
      month: 'current',
      day: days,
      color: 'white',
      background: '#A4DEDC'
    }
    let style = []
    style.push(json)
    this.setData({
      days_style: style
    })
  },
  dayClick: function(e) {
    console.log(e.detail)
    let data = e.detail;
    let json = {
      month: 'current',
      day: data.day,
      color: 'white',
      background: '#A4dedc'
    }
    this.setData({
      days_style: [json]
    })
  },
  showCal() {
    this.setData({
      showCalendar: true
    })
  },


  choseSex: function (e) {
    const {sex} = e.currentTarget.dataset
    this.setData({
      sex: sex
    })
  },
  changeValue: function (e) {
    const {type} = e.currentTarget.dataset
    this.setData({
      [type]: e.detail.value
    })
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
          avartUrl: tempFilePaths[0]
        })
        // that.upload(that, tempFilePaths[0])
      }
    })
  },
  upload: function (page, path) {
    // wx.showLoading({
    //   title: '上传中...',
    // })

    // setTimeout(function(){
    //   wx.hideLoading()
    // },2000)
    // wx.uploadFile({
    //   url:'',
    //   filePath: path,
    //   name: 'file',
    //   header: {"Content-Type: multipart/form-data"},
    //   formData: {
    //     image: 'avart'
    //   },
    //   success: function (res) {
    //     console.log(res, '文件上传成功！')
    //   },
    //   fail: function (res) {
    //     console.log(res, '上传失败')
    //   }
    // })


  },



  save: function () {
    const user = app.globalData.userInfo
    console.log(user)
    console.log(this.data)
  }

})