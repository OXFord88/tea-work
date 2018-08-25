
const completeHeader = (header) => {
  const result = {
    ...header,
    ...{
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'credentials': 'include'
    }
  }

  // const {access_token: accessToken} = app.globalData.index.index

  // if (accessToken) {
  //   result.Authorization = `Bearer ${accessToken}`
  // }

  return result
}

const parseJSON = (data) => {
  const tmp = JSON.parse(JSON.stringify(data))

  if (typeof tmp.data === 'string') {
    try {
      tmp.data = JSON.parse(tmp.data)
      return Promise.resolve(tmp)
    } catch (e) {
      tmp.data = {}
      return Promise.resolve(data)
    }
  } else {
    return Promise.resolve(data)
  }
}

const post = (url, query={}, data, options={}) => {
  return new Promise( (resolve, reject) => {
    wx.request({
      url: url,
      data,
      header: completeHeader(options),
      method: 'POST',
      dataType: 'JSON',
      success: resolve,
      fail: reject
    })
  }).then(parseJSON)
}



export const HOST = 'https://www.yanlu8.com/chabuweb'


// 1、微信用户同步
/* data: 
  *nickname 
  *openid
  wxavatar 头像地址
*/
export const wxUpdate = (data, query = {}) => {
  return post(`${HOST}/uc/addUserInfo`, {}, data)
}



// 2、完善用户信息
/* data:
  "birth":null,生日（时间戳）
  "nickname":"abc",微信昵称
  "openid":"4567",微信openid
  "schools":null,毕业学校
  "sex":null,性别（0:女；1男）
  "status":null,用户状态：0正常；1锁定
  "tags":null,用户标签
  "userid":1,用户ID
  "username":null 
  头像上传：<input type=file name=image/>
*/
export const updateUserInfo = (data, query = {}) => {
  // postFormData
  return post(`${HOST}/uc/modifyUserInfo`, {}, data)
}



// 3、绑定手机号码 ---获取短信验证码
/*
  data:
  mobile: string
  userid: 用户id
*/
export const bingMobile = (data, query = {}) => {
  return post(`${HOST}/uc/getValidCode`, {}, data)
}

// 4、绑定手机号-检查验证码
/*
  data:
  *code: string
  *mobile: string
  *userid: 用户id
*/
export const checkbingMobile = (data, query = {}) => {
  return post(`${HOST}/uc/bindMobile`, {}, data)
}


// 5、举报提交
/*
  data:
  *userid: string
  *flag:  1：纸条；2日记；3用户（必传）int
  *referenceid: 举报内容id
  content: 举报内容 可为空
*/
export const reportContent = (data, query = {}) => {
  return post(`${HOST}/users/report`, {}, data)
}



// 6、日刻发布
/*
  data:
  *userid: string 发布用户id
  *tags: string 自定义标签，逗号分开
  content: 日刻内容 500
*/
export const releaseTime = (data, query = {}) => {
  return post(`${HOST}/diary/publishDiaryInfo?userid=${data.userid}&tags=${data.tags}&content=${data.content}`, {}, {})
}


// 7、日刻删除
/*
  data:
  *userid: string 当前用户id
  *diaryid: string 日刻id
*/
export const delOneOfTime = (data, query = {}) => {
  return post(`${HOST}/diary/delDiary`, {}, data)
}


// 8、查询日刻详情(含纸条列表)
/*
  data:
  *userid: string 当前用户id
  *diaryid: string 日刻id
  page: 页码
  pagesize: 每页显示条数
  isFaverite:  “true/false”—收藏筛选
*/
export const getTimeDetails = (data, query = {}) => {
  return post(`${HOST}/diary/getDiaryInfo`, {}, data)
}



// 9、同步微信用户位置
/*
  data:
  "userid":null," 
  lat":null,
  "lng":null, 
  "provice":null,
  "city":null, 
  "created":"abc",
  "distance":"4567"
*/
export const updateUserLocation = (data, query = {}) => {
  return post(`${HOST}/users/addUserLocation`, {}, data)
}


// 10、添加收藏
/*
  data:
  Long userid--用户ID
  Integer flag,--收藏类型（1：收藏纸条；2收藏日记）
  Long referenceid—根据类型传对应信息ID
*/
export const addFavorite = (data, query = {}) => {
  return post(`${HOST}/favorite/addFavorite`, {}, data)
}

// 11、取消收藏
/*
  data:
  Long userid--用户ID
  Long referenceid—对应信息ID
*/
export const cancelFavorite = (data, query = {}) => {
  return post(`${HOST}/favorite/cancelFavorite`, {}, data)
}


// 12、检查信息是否已经收藏
/*
  data:
  Long userid--用户ID
  Integer flag,--收藏类型（1：收藏纸条；2收藏日记）
  Long referenceid—根据类型传对应信息ID
*/
export const checkFavorite = (data, query = {}) => {
  return post(`${HOST}/favorite/checkFavorite`, {}, data)
}


// 13、发布纸条
/*
  data:
  "userid":1,--用户id
  "diaryid":1,--日记ID
  "comment":"北12345京叮叮当当但是"—纸条内容
*/
export const pushPaper = (data, query = {}) => {
  return post(`${HOST}/comment/publishComments`, {}, data)
}

// 14、删除纸条
/*
  data:
  "userid":1,--用户id
  "diaryid":1,--日记ID
  "commentsid ":"1"—纸条ID
*/
export const delPaper = (data, query = {}) => {
  return post(`${HOST}/comment/deleleComments`, {}, data)
}


// 15、读取纸条内容
/*
  data:
  "commentsid ":"1"—纸条ID
*/
export const readPapers = (data, query = {}) => {
  return post(`${HOST}/comment/getComments`, {}, data)
}


// 16、用户添加关注
/*
  data:
  userid:1—当前用户ID
  touserid:2--关注的用户id
*/
export const addFollow = (data, query = {}) => {
  return post(`${HOST}/fans/addFans`, {}, data)
}
// 17、用户取消关注
/*
  data:
  userid:1—当前用户ID
  fansid:2--关注主键
*/
export const cancelFollow = (data, query = {}) => {
  return post(`${HOST}/fans/cancelFans`, {}, data)
}



// 18、个人主页查询
/*
  data:
  userid:1—当前用户ID
  touserid:2—要查看的用户ID(自己看自己和userid相同)
*/
export const checkUserMessage = (data, query = {}) => {
  return post(`${HOST}/uc/getUserinfo`, {}, data)
}


// 19、我/个人主页日刻查询
/*
  data:
  userid:1—用户ID
  page:1—页码
  pagesize:每页显示条数
*/
export const checkUserTime = (data, query = {}) => {
  return post(`${HOST}/diary/getDiaryList`, {}, data)
}


// 20、喜欢查询
/*
  data:
  userid:1—用户ID
  page:1—页码
  pagesize:每页显示条数
*/
export const checkLikes = (data, query = {}) => {
  return post(`${HOST}/diary/getMyFavoriteDiaryList?userid=${data.userid}&isFaverite=${data.isFaverite}&page=${data.page}&pagesize=${data.pagesize}`, {}, {})
}


// 21、纸条提醒查询
/*
  data:
  userid:1—用户ID
*/
export const checkPaperRemind = (data, query = {}) => {
  return post(`${HOST}/comment/queryNotReadCount`, {}, data)
}

// 22、我收到的纸条
/*
  data:
  userid:1—用户ID
  isFaverite：“true/false”—收藏筛选
  page:页码从1开始
  pagesize：每页显示条数
*/
export const checkMyPaper = (data, query = {}) => {
  return post(`${HOST}/comment/selectByCommentsByReceiveList?userid=${data.userid}&isFaverite=${data.isFaverite}&page=${data.page}&pagesize=${data.pagesize}`, {}, {})
}


// 23、我发出的纸条
/*
  data:
  userid:1—用户ID
  isFaverite：“true/false”—收藏筛选
  page:页码从1开始
  pagesize：每页显示条数
*/
export const mySendPaper = (data, query = {}) => {
  return post(`${HOST}/comment/selectByCommentsByPublishList?userid=${data.userid}&isFaverite=${data.isFaverite}&page=${data.page}&pagesize=${data.pagesize}`, {}, {})
}




