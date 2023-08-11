import { request } from "../../request/index";
import { requestPayment, showToast } from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';


// pages/pay/pay.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: {},
        cart: [],
        checkCart: [],
        totalPrice: 0,
        totalCount: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    // 支付页面函数
    async handlePay() {
        let token = wx.getStorageSync('token')
        console.log(token)
        if(!token) {
            wx.navigateTo({
              url: '/pages/auth/auth',
            })
            return;
        }
        let header = {Authorization: token}
        let order_price = this.data.totalPrice
        let completeAddress = this.data.address.provinceName + this.data.address.cityName + this.data.address.countyNam + this.data.address.detailInfo
        let consignee_addr = completeAddress
        let cart = this.data.cart
        let goods = []
        cart.forEach(v => goods.push({
            goods_id: v.goods_id,
            goods_num: v.num,
            goods_price: v.goods_price
        }))
        let orderParams = {order_price, consignee_addr, goods}
        //发送请求获取订单号参数
        const { order_number } = await request({ url: "/my/orders/create", method: "POST", data: orderParams });
        //发支付接口
        const { pay } = await request({ url: "/my/orders/req_unifiedorder", method: "POST", data: { order_number } });
        //发起微信支付
        await requestPayment(pay)
            //查看后台订单状态
        const res = await request({ url: "/my/orders/chkOrder", method: "POST", data: { order_number } });
        await showToast({ title: "支付成功" });
        //删除支付后对商品
        let newCart = wx.getStorageSync("cart");
        newCart = newCart.filter(v => !v.checked);
        wx.setStorageSync("cart", newCart);
        // 支付成功了 跳转到订单页面
        wx.navigateTo({
            url: '/pages/order/order'
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        let address = wx.getStorageSync('address')
        let cart = wx.getStorageSync('cart') || []
        let checkCart = cart.filter(v => v.checked)
        this.setData({
            checkCart
        })
        let totalPrice = 0
        let totalCount = 0
        checkCart.forEach( v => {
            if(v.checked) {
                totalPrice += v.num * v.goods_price
                totalCount += v.num
            }
        }) 
        this.setData({
            address: address,
            cart: cart,
            totalPrice: totalPrice,
            totalCount: totalCount
        })
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