//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

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
  u: {
    HOME_URL: 'https://xcx.jzxl.net',
    GETOPENID: '/api/me/getopenid', //获取openid
    LOGIN: '/api/me/login', //登录
    OPENID_LOGIN: '/api/me/doopenidlogin', //一键登录
    SENDMESSAGE: '/api/me/sendmessage', //短信
    REG: '/api/me/reg', //注册
    CODELOGIN: '/api/me/codelogin', //手机登录
    CONSULT_LIST: '/api/consult/index', //咨询师列表
    CONSULT_VIEW: '/api/consult/view', //咨询师详情
    FOLLOW: '/api/follow/index', //咨询师详情
    BOOK: '/api/book/index', //下订单
    ORDER_DETAILS: '/api/book/orderdetail', //订单详情
    ORDER_CANCEL: '/api/book/cancel', //订单详情
    ORDER_GOPAY: '/api/book/orderdetail', //订单详情
    ORDER_LIST: '/api/book/getorderlist', //订单列表
    ORDER_CONUSULT_LIST: '/api/book/getconsultorderlist',
    ORDER_CANCEL: '/api/book/cancelorder', //取消订单
    ORDER_PAY: '/api/book/wxpay', //支付订单
    INDEX: '/api/index/index', //首页接口
    INSTITUTIONS: '/api/organization/index', //咨询机构列表
    RESETPASSWORD: '/api/me/resetPassword', //重置密码
    FEEDBACK: '/api/me/feedback', //意见反馈
    FOLLOW_INDEX: '/api/follow/index', //点击关注
    ME_INFO: '/api/me/info', //编辑
    ME_GETMARK: '/api/me/getmark', //我的关注
    ARTICELINFO: '/api/index/articelinfo', //咨询指南
    CLASSINFO: '/api/index/classinfo',
    ARTICELIST: '/api/index/articelist', //咨询指南
    ME_NEWINFO: '/api/me/newinfo', //用户新信息
    PSY_APPLY: '/api/me/psyapply',
    PSY_TAGS: '/api/me/psytags',
    PSY_OTHER: '/api/consult/view1',
    UPLOADIMG: '/api/me/uploadimg', //上传头像
    UPDATEINFO: '/api/me/updateinfo',
    ADD_EDUCATION: '/api/me/addeducation',
    ADD_TRAIN: '/api/me/addtrain',
    ADD_QUALIFICATE: '/api/me/addqulificate',
    ADD_PEXP: '/api/me/addpexp',
    ADD_SUPEXP: '/api/me/addsupexp',
    ADD_PHOTOS: '/api/me/addphotos',
    ORGEN_INFO: '/api/organization/info', //
    CONSULTANT_DEL: '/api/me/del',
    GET_CONSULTANT_OPTION: '/api/consult/getoption',
    GET_AREA_LIST: '/api/consult/getarealist',
    GET_ORG_OPTION: '/api/organization/getoption',
    ORDER_PAY: '/api/book/wxpay', //支付订单
    LOADCONSULTADV: '/api/index/loadconsultadv', //咨询师轮播图
    LOADINSADV: '/api/index/loadinsadv', //咨询机构轮播图
    SENDMESG: '/api/book/smallWXmessage', //发送模板信息
    GETCLASSLIST: '/api/index/getclasslist',
    GETTESTLIST: '/api/index/gettestlist',
    TESTINFO: '/api/index/testinfo',
    GET_ORG_TAGS: '/api/organization/orgtags',
    ORGINFO: '/api/organization/orginfo'
  },
  globalData: {
    userInfo: null,
    resBaseUrl: 'https://xcx.jzxl.net'
  }
})