// pages/register/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showCalendar: false,
    days_style: []
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
  }
})