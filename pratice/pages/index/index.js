//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    currentIndex: 0,
    // firstList: ["LXT", "LXT", "LXT", "LXT", "LXT", "LXT"],
    // secondList: ["GFF", "GFF", "GFF", "GFF", "GFF", "GFF", "GFF", "GFF"],
    // thirdList: ["q", "q", "q", "q", "q", "q", "q", "q"],
    list: [],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
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
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  onShow: function () {
    this.getList(this.data.currentIndex);
  },

  //swiper切换时会调用
  pagechange: function (e) {
    if ("touch" === e.detail.source) {
      let currentPageIndex = this.data.currentIndex
      currentPageIndex = (currentPageIndex + 1) % 3;
      this.setData({
        currentIndex: currentPageIndex
      })
      this.getList(currentPageIndex);
    }
  },
  //用户点击tab时调用
  titleClick: function (e) {
    // console.log(e);
    // let currentPageIndex = e.currentTarget.dataset.idx-1;
    this.setData({
      //拿到当前索引并动态改变
      currentIndex: e.currentTarget.dataset.idx
    })
    this.getList(e.currentTarget.dataset.idx);
  },
  detail: function (event) {
    wx.navigateTo({
      url: '/pages/detail/detail?collect=false&type=2&id=' + event.currentTarget.dataset.status
    })
  },

  getList(tab) {
    var self = this;
    wx.request({
      //项目的真正接口，通过字符串拼接方式实现
      url: app.globalData.config.getTypeList,
      // header: {
      //   "content-type": "application/json;charset=UTF-8"
      // },
      data: {
        id: tab
      },
      method: 'get',
      success: function (res) {
        console.log(res);
        if (res.data.status === 200) {
          console.log(res.data.data);
          // this.data.list = res.data.data;
          self.setData({
            list: res.data.data
          })
        } else {
          wx.showToast({
            title: "列表获取失败",
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
  }
})