var util = require('../../utils/util.js');
var api = require('../../config/api.js');



var app = getApp();

Page({
  data: {
    couponList: null,
    mobile:'',
    password:''
  },
  onLoad: function (options) {
    this.loadListData()
  },

  loadListData: function () {
    let that = this;

    util.request(api.CouponList).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          couponList: res.data
        });
      }
    });
  },
  mobileInput: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  register: function (e) {
    var params = {
    };
    var userInfo = wx.getStorageSync('userInfo');
    var openid = wx.getStorageSync('opeid');
    var that = this;
    params.weixinOpenid = openid;
    params.consultantImg = userInfo.avatarUrl;
    params.city = userInfo.city;
    params.country = userInfo.country;
    params.sex = userInfo.gender;
    params.language = userInfo.language;
    params.consultantName = userInfo.nickName;
    params.province = userInfo.province;
    params.consultantPhone = that.data.mobile;
    params.password = that.data.password;
    util.request(api.Register, params, 'post').then(function (res) {
      if (res.errno === 0) {
        console.log(res.data);
        that.setData({
          collectList: res.data
        });
      }
    })
  },
  onReady: function () {
    
  },
  onShow: function () {

  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})