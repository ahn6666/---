/* 引入发送请求 一定要把代码补全 */
import { request } from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    cata:[],
    getfloortList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  /* 页面开始加载 */
  onLoad: function (options) {
    //发送异步请求获取轮播图数据
    /* wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      data: {},
      header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        this.setData({
          swiperList:result.data.message
        })
      },
     
    }); */
    
    this.getcata();
    this.getswiperList();
    this.getfloortList();
    },
    getswiperList(){
      request({url:'/home/swiperdata'})
      .then(result=>{
        this.setData({
          swiperList:result
        })
      })
    },
    getcata()
    {
      request({url:'/home/catitems'})
      .then(result=>{
        this.setData({
          cata:result
        })
      })
    },
    getfloortList()
    {
      request({url:'/home/floordata'})
      .then(result=>{
        this.setData({
          floortList:result
        })
      })
    }
})