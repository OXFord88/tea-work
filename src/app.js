//app.js

const { wxUpdate } = require('./utils/fetch')
const { formatDate } = require('./utils/util')
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var keys = wx.getStorageSync('keys') || {};

    // 登录
    wx.login({
      success: res => {
        const that = this
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let appid = 'wxb0c2665eadb949cf';
        let secret = '96befbd4661b7d33113a86e06b7304b8';
        var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + res.code + '&grant_type=authorization_code';
        wx.request({
          url: l,
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
          // header: {}, // 设置请求的 header  
          success: function (data) {
            const openid = data.data.openid
            wx.getSetting({
              success: res => {
                console.log(res, '----getSetting')
                if (res.authSetting['scope.userInfo'] || true) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                  console.log('已经授权，可以直接调用getUserInfo')
                  wx.getUserInfo({
                    success: mes => {
                      // 可以将 res 发送给后台解码出 unionId
                      const person = mes.userInfo
                      const para = {
                        nickname: person.nickName,
                        openid: openid,
                        wxavatar: person.avatarUrl
                      }
                      that.update(para, person)
                    }
                  })
                }else{
                  console.log('没有授权')
                  that.update({openid: openid}, {})
                }
              },
              fail: function () {
                console.log('wx.getSetting失败了')
              }
            })

          }
        })
      }
    })

  },
  update: function(para, mes) {
    const that = this;
    wxUpdate(para).then( data => {
      console.log(data, '-------')
      if (data.statusCode < 300) {
        // 成功
        that.globalData.userInfo = {...mes, ...data.data.data, token: data.data.token}
        that.globalData.userInfo.birth = formatDate(data.data.data.birth)
        wx.setStorageSync('keys', {...mes, ...data.data.data, token: data.data.token})
      }else{
        wx.showToast({
          icon: 'none',
          title: '同步信息失败'
        })
      }
    })
  },

  globalData: {
    // userInfo: null
  }
})