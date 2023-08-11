// pages/category/category.js
import {request} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 左侧菜单
        leftList: [],
        // 右侧商品内容
        rightList: [],
        // 接口返回的商品数据
        Cates:[],
        // 初始化时的菜单索引
        currentIndex: 0,
        scrollTop: 0
    },
    // 获取分类接口数据
    async getCates() {
        await request({
            url: "/categories"
        }).then(res => {
            this.Cates = res.data.message
            // 构造左侧的大菜单数据
            let leftList = this.Cates.map(v => v.cat_name)
            this.setData({
                leftList: leftList
            })
            // 构造右侧商品数据
            let rightList = this.Cates[0].children
            this.setData({
                rightList: rightList
            })

        })
    },
    // 左侧菜单的点击处理函数
    handleItemTap(e) {
        let {index} = e.currentTarget.dataset
        let rightList = this.Cates[index].children
        this.setData({
            currentIndex: index,
            rightList: rightList,
            scrollTop: 0
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const Cates = wx.getStorageSync('cates')
        if (!Cates) {
            this.getCates()
        } else {
            if (Date.now() - Cates.time > 1000 * 10) {
                this.getCates()
            } else {
                this.Cate = Cates.data;
                let leftList = this.Cate.map(v => v.cat_name)
                let rightList = this.Cate[0].children;
                this.setData({
                    leftList,
                    rightList
                })
            }
        }
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