//app.js

const { wxUpdate } = require('./utils/fetch')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var keys = wx.getStorageSync('keys') || {};

    // 登录
    wx.login({
      success: res => {
        const that = this
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let appid = 'wxb0c2665eadb949cf';
        let secret = '96befbd4661b7d33113a86e06b7304b8';
        var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + res.code + '&grant_type=authorization_code';
        if (keys.userid) {
          console.log('有keys.userid')
          that.globalData.userInfo = keys
        }else{
          console.log('没有keys.userid, 需要微信同步，获取个人信息')
          wx.request({
            url: l,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
            // header: {}, // 设置请求的 header  
            success: function (data) {
              // console.log(data, '**&data&&')
              const openid = data.data.openid
              wx.getSetting({
                success: res => {
                  // console.log(res, '----')
                  if (res.authSetting['scope.userInfo'] || true) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                      success: mes => {
                        // 可以将 res 发送给后台解码出 unionId
                        
                        const person = mes.userInfo
                        // console.log(person, '8888mes')
                        const para = {
                          nickname: person.nickName,
                          openid: openid,
                          wxavatar: person.avatarUrl
                        }
                        // console.log(para, '----')
                        wxUpdate(para).then( data => {
                          console.log(data)
                          if (data.data.code === '2001') {
                            // 成功
                            that.globalData.userInfo = {...mes.userInfo, ...data.data.data}
                            wx.setStorageSync('keys', {...mes.userInfo, ...data.data.data})
                          }else{
                            wx.showToast({
                              icon: 'none',
                              title: '同步信息失败'
                            })
                          }
                        })

                        
                        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                        // 所以此处加入 callback 以防止这种情况
                        // if (that.userInfoReadyCallback) {
                        //   that.userInfoReadyCallback(mes)
                        // }
                      }
                    })
                  }
                }
              })

            }
          })
        }
      }
    })

  },
  globalData: {
    userInfo: null
  }
})