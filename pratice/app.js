//app.js
var config = require("./config.js");
App({
  onLaunch: function () {
    // wx.setStorageSync('config', config)
    this.globalData.config = config;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.checkSession({
      success: function (res) {
        console.log("处于登录态");
      },
      fail: function (res) {
        console.log("需要重新登录");
        wx.login({
          success: res => {
            console.log(res);
            if (res.code) {
              wx.request({
                url: config.getOpenId, //set in config .js  //2.后台API
                method: "POST",
                data: {
                  code: res.code,
                },
                success(res) {
                  var openId = res.data.openid;
                  wx.setStorageSync("openid", openId);
                  wx.setStorageSync("session_key", res.data.session_key);
                }
              })
            }
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
          }
        })
      }
    })
    // wx.authorize({
    //   scope: 'scope.userLocation',
    //   success () {
    //     // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
    //     // wx.startRecord()
    //   }
    // })

    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res.userInfo);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },


  onPageNotFound: function () {
    wx.switchTab({
      url: 'pages/publish/publish'
    })
    console.log('no found');
  },
  globalData: {
    userInfo: null,
    config: null,
    openId: null
  }
})