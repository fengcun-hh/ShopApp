// index.js
// 获取应用实例
import {request} from "../../request/index"
import regeneratorRuntime from '../../lib/runtime/runtime';


Page({
  data: {
    swiperList: [],
    navIconList: [],
    floorList: []
  },
  onLoad(options) {
    this.getSwiperList()
    this.getNavIconList()
    this.getFloorList()
  },
  // 获取轮播图数据方法
  getSwiperList() {
    request({url: '/home/swiperdata'}).then(res => {
      this.setData({
        swiperList: res.data.message
      })
    }) 
  },
  // 获取功能图标方法
  getNavIconList() {
    request({url: '/home/catitems'}).then(res => {
      this.setData({
        navIconList: res.data.message
      })
    }) 
  },
  // 获取楼层数据方法
  getFloorList() {
    request({url: '/home/floordata'}).then(res => {
      this.setData({
        floorList: res.data.message
      })
    }) 
  },
})
