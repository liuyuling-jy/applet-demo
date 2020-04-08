// pages/detail/detail.
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    console.log(option);
    if (option.id) {
    }

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  formSubmit: function (e) {
    console.log(this.data.userInfo);
    if (e.detail.value.anonymity === '2') {
      if (this.data.userInfo) {
        e.detail.value.author = this.data.userInfo.nickName;
      } else {
        wx.showToast({
          title: "未授权，请先授权来获取用户信息",
          icon: "none",//图标，支持"success"、"loading" 
          // image: '/images/tan.png',//自定义图标的本地路径，image 的优先级高于 icon    
          duration: 2000,//提示的延迟时间，单位毫秒，默认：1500   
          mask: false,//是否显示透明蒙层，防止触摸穿透，默认：false    
          success: function () { },
          fail: function () { },
          complete: function () { }
        })
      }
    } else {
      e.detail.value.author = '';
    }
    e.detail.value.openId = wx.getStorageSync('openid');

    wx.request({
      //项目的真正接口，通过字符串拼接方式实现
      url: app.globalData.config.addItem,
      // header: {
      //   "content-type": "application/json;charset=UTF-8"
      // },
      data: e.detail.value,
      method: 'POST',
      success: function (res) {
        //参数值为res.data,直接将返回的数据传入
        // doSuccess(res.data);
        if (res.data.status === 200) {
          wx.showToast({
            title: "发布成功",
            icon: "success",
            duration: 1000,
            mask: false
          })
          setTimeout(function () {
            wx.navigateBack();
          }, 1000);
        } else {
          wx.showToast({
            title: "发布失败",
            icon: "none",
            duration: 1000,
            mask: false
          })
        }
      },
      fail: function () {
        // doFail();
      },
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  }


})