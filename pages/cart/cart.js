// pages/cart/cart.js
import {showModal,showToast} from "../../utils/asyncWx.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: {},
        cart: [],
        allChecked: false,
        totalPrice: 0,
        totalCount: 0
    },
    // 收货地址展示逻辑
    onshow() {
        let address = wx.getStorageSync('address')
        let cart = wx.getStorageSync('cart')
        let allChecked = true
        let totalPrice = 0
        let totalCount = 0
        cart.forEach( v => {
            if(v.checked) {
                totalPrice += v.num * v.goods_price
                totalCount += v.num
            } else {
                allChecked = false
            }
        }) 
        allChecked = cart.length != 0 ? allChecked : false
        if(address) {
            this.setData({
                address: address,
                cart: cart,
                allChecked: allChecked,
                totalCount: totalCount,
                totalPrice: totalPrice
            })
        }
    },
    // 商品的选择事件
    handleItemChange(e) {
        let goods_id = e.currentTarget.dataset.id
        let {cart} = this.data
        let index = cart.findIndex( v => v.goods_id === goods_id)
        cart[index].checked = !cart[index].checked

        let allChecked = true
        let totalPrice = 0
        let totalCount = 0
        cart.forEach( v => {
            if(v.checked) {
                totalPrice += v.num * v.goods_price
                totalCount += v.num
            } else {
                allChecked = false
            }
        }) 
        allChecked = cart.length != 0 ? allChecked : false

        this.setData({
            cart: cart,
            totalPrice: totalPrice,
            totalCount: totalCount
        })
        wx.setStorageSync('cart', cart)
    },
    // 全选的处理事件
    handleItemAllCheck() {
        let {cart, allChecked} = this.data
        allChecked = !this.data.allChecked
        cart.forEach(v => v.checked = allChecked)
        let totalPrice = 0
        let totalCount = 0
        cart.forEach( v => {
            if(v.checked) {
                totalPrice += v.num * v.goods_price
                totalCount += v.num
            }
        })
        this.setData({
            cart: cart,
            allChecked: allChecked,
            totalCount: totalCount,
            totalPrice: totalPrice
        })

        wx.setStorageSync('cart', cart)
    },
    // 商品购物车页面数量编辑的功能
    async handleItemNumEdit(e) {
        let {operation,id} = e.currentTarget.dataset
        let {cart} = this.data
        let index = cart.findIndex(v => v.goods_id === id)
        if(cart[index].num === 1 && operation === "-1") {
           let res = await showModal("确认删除该件商品吗")
           if(res.confirm) {
               cart.splice(index, 1)
           }
        } else {
            cart[index].num += parseInt(operation)
        }
        // 更新数据
        let totalPrice = 0
        let totalCount = 0
        cart.forEach( v => {
            if(v.checked) {
                totalPrice += v.num * v.goods_price
                totalCount += v.num
            }
        })

        this.setData({
            cart: cart,
            totalCount: totalCount,
            totalPrice: totalPrice
        })
        wx.setStorageSync('cart', cart)
    },
    // 点击结算
    async handlePay() {
        let {address} = this.data
        if(!address.userName) {
            await showToast("请添加收货地址")
            return
        }
        if(this.data.totalCount === 0 ) {
            await showToast("请添加商品")
            return
        }
        // 跳转到支付页面
        wx.navigateTo({
          url: '/pages/pay/pay',
        })
    },
    // 获取地址的点击事件
    handleChooseAddress() {
        wx.chooseAddress({
            success: (res) => {
                wx.setStorageSync('address', res)
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.onshow()
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