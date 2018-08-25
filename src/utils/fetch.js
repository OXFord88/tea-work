
const post = (url, query={}, options={}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      header: '',
      method: 'POST',
      dataType: 'json',
      success: resolve,
      fail: reject
    })
  })
}

export const HOST = 'https://www.yanlu8.com/chabuweb'

