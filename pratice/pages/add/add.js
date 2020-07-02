// pages/detail/detail.
import WxValidate from '../../utils/WxValidate.js'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    source: '',
    e: {},
    form: {
      title: '',
      anonymity: '',
      desc: '',
      classify: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    this.initValidate();
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
    this.modal = this.selectComponent("#modal");
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

  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },

  formSubmit: function (e) {
    const params = e.detail.value
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0];
      this.showModal(error)
      return false
    }

    if (e.detail.value.anonymity === '2') {
      if (this.data.userInfo.nickName) {
        console.log(this.data.userInfo);
        e.detail.value.author = this.data.userInfo.nickName;
      } else {
        wx.showToast({
          title: "未授权，请先授权来获取用户信息",
          icon: "none", //图标，支持"success"、"loading" 
          // image: '/images/tan.png',//自定义图标的本地路径，image 的优先级高于 icon    
          duration: 2000, //提示的延迟时间，单位毫秒，默认：1500   
          mask: false, //是否显示透明蒙层，防止触摸穿透，默认：false    
          success: function () {},
          fail: function () {},
          complete: function () {}
        })
        return;
      }
    } else {
      e.detail.value.author = '';
    }
    e.detail.value.openId = wx.getStorageSync('openid');
    this.setData({
      e: e.detail.value
    })
    this.modal.showDialog();
  },

  formReset: function () {
    console.log('form发生了reset事件')
  },

  // uploadimg: function () {
  //   var that = this;
  //   wx.chooseImage({ //从本地相册选择图片或使用相机拍照
  //     count: 9, // 默认9
  //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  //     success: function (res) {
  //       console.log(res)
  //       //前台显示
  //       that.setData({
  //         source: res.tempFilePaths
  //       })
  //       // var tempFilePaths = res.tempFilePaths
  //       // wx.uploadFile({
  //       //   url: 'http://www.website.com/home/api/uploadimg',
  //       //   filePath: tempFilePaths[0],
  //       //   name: 'file',
  //       //   success: function (res) {
  //       //     //打印
  //       //     console.log(res.data)
  //       //   }
  //       // })
  //     }
  //   });
  // }

  // 取消时间
  _cancelEvent(event) {
    console.log(event);
    this.modal.hideDialog();
  },

  //确认事件
  _confirmEvent(event) {
    console.log(event);
    var that = this;
    wx.request({
      //项目的真正接口，通过字符串拼接方式实现
      url: app.globalData.config.addItem,
      // header: {
      //   "content-type": "application/json;charset=UTF-8"
      // },
      data: that.data.e,
      method: 'POST',
      success: function (res) {
        //参数值为res.data,直接将返回的数据传入
        // doSuccess(res.data);
        if (res.data.status === 200) {
          that.modal.hideDialog();
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
          });
          that.modal.hideDialog();
        }
      },
      fail: function () {
        // doFail();
        that.modal.hideDialog();
      },
    })
  },

  initValidate() {
    const rules = {
      title: {
        required: true
      },
      anonymity: {
        required: true,
      },
      desc: {
        required: true,
      },
      classify: {
        required: true,
      }
    }
    const messages = {
      title: {
        required: '请填写标题!',
      },
      anonymity: {
        required: '请选择匿名!',
      },
      desc: {
        required: '请填写描述！',
      },
      classify: {
        required: '请选择分类！',
      },
    }
    this.WxValidate = new WxValidate(rules, messages)
  }
});