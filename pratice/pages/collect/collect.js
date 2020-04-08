// pages/publish/publish.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady....');

    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var self = this;
    wx.request({
      //项目的真正接口，通过字符串拼接方式实现
      url: app.globalData.config.getCollectList,
      // header: {
      //   "content-type": "application/json;charset=UTF-8"
      // },
      data: { openId: wx.getStorageSync('openid') },
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
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide....');

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload....');

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

  // showDialog() {
  //   this.dialog.showDialog();
  // },

  // //取消事件
  // _cancelEvent() {
  //   console.log('你点击了取消');
  //   this.dialog.hideDialog();
  // },
  // //确认事件
  // _confirmEvent() {
  //   console.log('你点击了确定');
  //   this.dialog.hideDialog();
  // }
  // publish() {
  //   wx.navigateTo({
  //     url: '/pages/detail/detail?type=1&id=null',
  //   })
  // },

  // edit: function (event) {
  //   wx.navigateTo({
  //     url: '/pages/detail/detail?type=1&id=' + event.currentTarget.dataset.status
  //   })
  // },
  detail: function (event) {
    wx.navigateTo({
      url: '/pages/detail/detail?collect=true&type=3&id=' + event.currentTarget.dataset.status
    })
  },
})