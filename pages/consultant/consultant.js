// pages/consultant/consultant.js
let app = getApp();
let api = require('../../utils/api.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        oType: 1,
        consultantList: {},
        city: 0,
        pricestart: '',
        priceend: '',
        goodatarea: '',
        page: 1,
        cityid: 0,
        province: 1,
        provincelist: {},
        func: {},
        tagsList: {},
        price: {},
        type: '',
        priceid: 0,
        arealist: {},
        areaid: 0,
        areaname: "城市",
        pricename: "价格",
        funcArr: {},
        tagsArr: {},
        picture: {},
        name: ''
    },
    nameInput: function(e) {
        console.log(e)
        this.setData({
            name: e.detail.value
        })
    },
    provincetap: function(e) {
        this.setData({
            province: e.currentTarget.dataset.id
        })
        this.getarealist()
    },
    citytap: function(e) {
        this.setData({
            areaid: e.currentTarget.dataset.id,
            areaname: e.currentTarget.dataset.name,
        })
    },
    pricetap: function(e) {
        this.setData({
            priceid: e.currentTarget.dataset.id,
            pricestart: e.currentTarget.dataset.startprice,
            priceend: e.currentTarget.dataset.endprice,
            pricename: e.currentTarget.dataset.name
        })
    },
    tableCheck: function(e) {
        var that = this
        let typeid = e.currentTarget.dataset.id
        that.setData({
            oType: typeid,
            cityid: typeid,
        })
    },
    confirm: function() {
        this.setData({
            cityid: 0,
            page: 1

        })
        this.getlist()
    },
    allcancel: function() {
        var that = this
        that.setData({
            pricestart: '',
            priceend: '',
            goodatarea: '',
            cityid: 0,
            province: 1,
            page: 1,
            type: '',
            priceid: 0,
            areaid: 0,
            areaname: "城市",
            pricename: "价格",
            funcArr: {},
            tagsArr: {},
            name: ''
        })
        that.getlist()
    },
    funcChange: function(e) {
        this.setData({
            type: e.detail.value.join(','),
            funcArr: e.detail.value
        })
    },
    tags_idsChange: function(e) {
        this.setData({
            goodatarea: e.detail.value.join(','),
            tagsArr: e.detail.value
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this
        that.getlist()
        let url2 = app.u.HOME_URL + app.u.GET_CONSULTANT_OPTION
        let data2 = {}
        api.requestUrl(data2, url2).then(res => {
            if (res.code == 200) {
                that.setData({
                    func: res.data.func,
                    tagsList: res.data.tagsList,
                    provincelist: res.data.area
                })
            } else {
                api.showError(res.msg)
            }
        })
        this.getarealist()
        var info = {}
        var url4 = app.u.HOME_URL + app.u.LOADCONSULTADV
        api.requestUrl(info, url4).then(res => {
            that.setData({
                picture: res.data.ad
            })
        })
    },
    getlist: function() {
        var that = this;
        let data = {
            city: that.data.city,
            page: that.data.page,
            areaid: that.data.areaid,
            priceid: that.data.priceid,
            pricestart: that.data.pricestart,
            priceend: that.data.priceend,
            goodatarea: that.data.goodatarea,
            type: that.data.type,
            name: that.data.name
        }
        let url = app.u.HOME_URL + app.u.CONSULT_LIST
        api.requestUrl(data, url).then(res => {
            if (res.code == 200) {
                this.setData({
                    consultantList: res.data
                })
            } else {
                api.showError(res.msg)
            }
        })
    },
    getarealist: function() {
        let url3 = app.u.HOME_URL + app.u.GET_AREA_LIST
        let data3 = { province: this.data.province }
        api.requestUrl(data3, url3).then(res => {
            if (res.code == 200) {
                this.setData({
                    arealist: res.data
                })
            } else {
                api.showError(res.msg)
            }
        })
    },

    bindDownLoad: function() {
        var that = this;
        loadMore(that);
        console.log("加载");

    },
    consultant: function(e) {
        wx.navigateTo({
            url: '../development/development?id=' + e.currentTarget.dataset.id
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

        wx.showShareMenu({
            withShareTicket: true
        })
    },
    onReachBottom: function() {
        let that = this
        let newpage = that.data.page + 1
        let data = {
            city: that.data.city,
            page: newpage,
            areaid: that.data.areaid,
            priceid: that.data.priceid,
            pricestart: that.data.pricestart,
            priceend: that.data.priceend,
            goodatarea: that.data.goodatarea,
            type: that.data.type,
            name: that.data.name
        }
        let url = app.u.HOME_URL + app.u.CONSULT_LIST
        api.requestUrl(data, url).then(res => {
            if (res.code == 200) {
                this.setData({
                    consultantList: that.data.consultantList.concat(res.data),
                    page: newpage
                })
            } else {
                api.showError(res.msg)
            }
        })
    }
})