// pages/detailItem/detailItem.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: null,
    type: null,
    collect: false,
    // isCollect: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    console.log(option);
    if (option.id) {
      var self = this;
      self.setData({
        type: option.type
      })
      let url = null;
      if (option.collect === 'true') {
        url = app.globalData.config.getItemCollect
      } 
      if (option.collect === 'false')  {
        url = app.globalData.config.getItem
      }
      wx.request({
        //项目的真正接口，通过字符串拼接方式实现
        url: url,
        // header: {
        //   "content-type": "application/json;charset=UTF-8"
        // },
        data: {
          id: option.id
        },
        method: 'get',
        success: function (res) {
          //参数值为res.data,直接将返回的数据传入
          // doSuccess(res.data);
          if (res.data.status === 200) {
            self.setData({
              data: res.data.data[0]
            })
            if (option.type === '2') {
              wx.request({
                url: app.globalData.config.isCollect,
                data: {
                  itemId: res.data.data[0]._id,
                  collectOpenId: wx.getStorageSync('openid')
                },
                method: 'post',
                success: function (res1) {
                  if (res1.data.status === 200) {
                    self.setData({
                      collect: res1.data.data
                    })
                    console.log(self.data.collect);
                  } else {
                    wx.showToast({
                      title: "是否收藏查询失败",
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

          } else {
            wx.showToast({
              title: "详情获取失败",
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
  collectT() {
    let coll = false;
    if (this.data.collect) {
      coll = false;
      wx.request({
        //项目的真正接口，通过字符串拼接方式实现
        url: app.globalData.config.collectCancel,
        // header: {
        //   "content-type": "application/json;charset=UTF-8"
        // },
        data: {
          itemId: this.data._id,
          collectOpenId: wx.getStorageSync('openid')
        },
        method: 'post',
        success: function (res) {
          //参数值为res.data,直接将返回的数据传入
          // doSuccess(res.data);
          if (res.data.status === 200) {
            wx.showToast({
              title: "取消收藏成功",
              icon: "success",
              duration: 1000,
              mask: false
            })
          } else {
            wx.showToast({
              title: "取消收藏失败",
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
    } else {
      coll = true;
      wx.request({
        //项目的真正接口，通过字符串拼接方式实现
        url: app.globalData.config.collectItem,
        // header: {
        //   "content-type": "application/json;charset=UTF-8"
        // },
        data: {
          itemId: this.data.data._id,
          collectOpenId: wx.getStorageSync('openid'),
          title: this.data.data.title,
          desc: this.data.data.desc,
          anonymity: this.data.data.anonymity,
          classify: this.data.data.classify,
          openId: this.data.data.openId,
          author: this.data.data.author,
        },
        method: 'post',
        success: function (res) {
          //参数值为res.data,直接将返回的数据传入
          // doSuccess(res.data);
          if (res.data.status === 200) {
            wx.showToast({
              title: "收藏成功",
              icon: "success",
              duration: 1000,
              mask: false
            })
          } else {
            wx.showToast({
              title: "收藏失败",
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
    this.setData({
      collect: coll
    })
  }
})