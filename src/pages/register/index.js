// pages/register/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: '',
    showCalendar: false,
    days_style: [],
    isSureSex: false,
    birthDay: '为你匹配同龄人，仅自己可见',
    checkBirth: false
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
    let birth = data.year + '-' + this.toDobulle(data.month) + '-' + this.toDobulle(data.day)
    this.setData({
      days_style: [json],
      showCalendar: false,
      birthDay: birth,
      checkBirth: true
    })
  },
  showCal() {
    this.setData({
      showCalendar: true
    })
  },
  selectSex(e) {
    let sexStr = e.target;
    this.setData({
      selected: sexStr.id,
      isSureSex: true
    })
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