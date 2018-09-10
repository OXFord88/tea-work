// pages/register/index.js
const { HOST, updateUserInfo } = require('../../utils/fetch')
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
    changeAvartValue: false,

    message: {},
    path: '',
  },
  onLoad: function () {
    const that = this;
    setTimeout(function () {
      const user = app.globalData.userInfo;
      console.log(user, 'user')
      that.setData({
        avartUrl: user.avatar,
        nickname: user.nickName,
        sex: user.gender == 0 ? 0 : user.gender == 1 ? 1 : -1,
        birthDay: user.birth ? user.birth : '为你匹配同龄人，仅自己可见',
        schools: user.schools ? user.schools : ''
      })
    },500)
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
          avatar: tempFilePaths[0],
          path: tempFilePaths[0],
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
    console.log(para, '参数请求')
    // this.upload(avart, para)


    if (this.data.path) {
      // 说明上传过头像
    }else{
      // 说明只修改的相关的信息
      const url = `?nickname=${this.data.nickname}&birth=${new Date(this.data.birthDay).getTime()}&schools=${this.data.schools}&sex=${this.data.sex}&status=0&tags=${user.tags}&userid=${user.userid}&openid=${user.openid}`
      console.log(url)
      updateUserInfo(url).then( data => {
        console.log(data, '****')
        if (data.data.code === '0000') {

        }else{
          wx.showToast({
            icon: 'error',
            title: '更新错误'
          })
        }
      }).catch(err => {
        console.log(err)
      })

    }
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