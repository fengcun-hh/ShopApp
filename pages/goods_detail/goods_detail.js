// pages/goods_detail/goods_detail.js
import {request} from "../../request/index"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 商品详细信息
        goodsObj: {}
    },
    GoodsObj: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const {goods_id} = options
        this.getGoodInfo(goods_id)
    },
    // 获取商品信息
    async getGoodInfo(goods_id) {
        let res = await request({
            url: "/goods/detail",
            data: {
                goods_id
            }
        })
        this.setData({
            goodsObj: res.data.message
        })
        this.GoodsObj = res.data.message
    },
    // 处理轮播图点击事件
    handlePreviewImage(e) {
        let urls = this.GoodsObj.pics.map(v => v.pics_mid)
        let current = e.currentTarget.dataset.url
        console.log(urls)
        wx.previewImage({
          urls: urls,
          current: current
        })
    },
    // 处理购物车点击事件
    handleCartAdd(e) {
        let cart = wx.getStorageSync('cart') || []
        let index = cart.findIndex(v => v.goods_id === this.GoodsObj.goods_id)
        if(index === -1) {
            this.GoodsObj.num = 1
            this.GoodsObj.checked = true
            cart.push(this.GoodsObj)
        } else {
            cart[index].num++
        }
        wx.setStorageSync('cart', cart)
        wx.showToast({
          title: '购物车添加成功',
          icon: 'success',
          mask: 'false',
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
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})