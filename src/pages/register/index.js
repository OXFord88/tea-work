// pages/register/index.js
const { HOST } = require('../../utils/fetch')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    avartUrl: '../../images/head-bg.png',
    sex: '-1',
    nickname: undefined,
    schools: undefined,
    days_style: [],
    isSureSex: false,
    birthDay: '为你匹配同龄人，仅自己可见',
    checkBirth: false,
    changeAvartValue: false
  },
  onLoad: function () {
    const user = app.globalData.userInfo;
    console.log(user, 'user')
    this.setData({
      avartUrl: user.avatarUrl,
      nickname: user.nickName,
      sex: user.sex ? user : '-1',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  bindDateChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      birthDay: e.detail.value,
      checkBirth: true
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
          avartUrl: tempFilePaths[0],
          changeAvartValue: true
        })
        // that.upload(that, tempFilePaths[0])
      }
    })
  },
  upload: function (path, data) {
    // wx.showLoading({
    //   title: '请求中...',
    // })

    // setTimeout(function(){
    //   wx.hideLoading()
    // },2000);


    console.log({...data})
    wx.uploadFile({
      url: `${HOST}/uc/modifyUserInfo`, //?userid=${data.userid}&openid=${data.openid}&nickname=${data.nickname}`,
      filePath: path,
      name: 'image',
      // header: {"Content-Type: multipart/form-data"},
      formData:{
        ...data
      },
      success: function (res) {
        console.log(res, '文件上传成功！')
      },
      fail: function (res) {
        console.log(res, '上传失败')
      }
    })


  },



  save: function () {
    const user = app.globalData.userInfo
    // console.log(user)
    // console.log(this.data)
    const para = {
      nickname: this.data.nickname,
      schools: this.data.schools,
      sex: parseInt(this.data.sex),
      openid: user.openid,
      birth: new Date(this.data.birthDay).getTime(),
      // status: 0, //0 正常。1锁定
      userid: user.userid, 
    }
    const avart = !this.data.changeAvartValue ? '' : this.data.avartUrl
    // console.log(para, '参数请求', avart)
    this.upload(avart, para)
  },
 
  sureSex() {
    this.setData({
      isSureSex: false
    })
  },
  toDobulle(str) {
    return str < 10 ? '0' + str : str;
  }

})