import { request } from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';

// pages/goods_list/goods_list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [
            {
                id: 1,
                value: '综合',
                isActive: true
            },
            {
                id: 2,
                value: '销量',
                isActive: false
            },
            {
                id: 3,
                value: '价格',
                isActive: false
            }
        ],
        //商品列表数据
        goodList: []
    },
    // 查询参数
    QueryParams: {
        query: "",
        cid: "",
        pagenum: "",
        pageSize: 10
    },
    // 商品总页数
    totalPage: 1,

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.QueryParams.cid = options.cid;
        this.getGoodList()
    },
    // 获取商品列表数据
    async getGoodList() {
        let res = await request({url: "/goods/search", data: this.QueryParams})
        const total = res.data.message.total
        this.totalPage = Math.ceil(total / this.QueryParams.pageSize)

        this.setData({
            goodList: [...this.data.goodList, ...res.data.message.goods]
        })
    },
    // 触底刷新
    onReachBottom: function() {
        console.log("hello")
        if(this.QueryParams.pagenum >= this.totalPage) {
            wx.showToast({
              title: '没有下一页数据',
            })
        } else {
            this.QueryParams.pagenum++;
            this.getGoodList()
        }
    },
     /**
     * 页面相关事件处理函数--监听用户下拉动作
     * 上拉时重新刷新
     */
    onPullDownRefresh: function() {
        this.goodParams.pagenum = 1,
        this.data.goodList = []
        this.getGoodsList()

    },
    //Tabs切换
    tabsItemChange(e) {
        const id = e.detail.id;
        const tabs = this.data.tabs;
        for (let obj of tabs) {
            if(obj.id === id) {
                obj.isActive = true
            } else {
                obj.isActive = false
            }
        }
        
        this.setData({
            tabs: tabs
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})