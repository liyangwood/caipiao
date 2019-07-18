Page({
  data: {
    text: ''
  },
  onLoad: function () {
    wx.request({
      url: 'http://127.0.0.1:3000/api/ssq/list', //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
      }
    })
  }
})
