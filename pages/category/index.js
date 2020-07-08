// pages/category/index.js
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */

  data: {
    /* 引入左边和右边的菜单 */
    leftMuneList:[],
    rightMuneList:[],
     /* 被点击左侧的菜单 */
     currentIndex:0,
     /* 右侧距离顶部的距离 */
     scrolltop:0
  },
  /* 接口返回的数据 */
    catas:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* web的本地存储和小程序的本地存储的区别
    1：写代码的方式不一样
    web:localStorage.setItem("key","value") localStotage.getItem("key")
    小程序：wx:localStorageSync("key","value") ;wx:getStorage("key");
    2；存的时候 有没有做类型转换 
    web:无论存入的是什么类型的数据，最终都会调用以下 toString(),把数据变成了字符串，再存进去
    小程序：不存在类型转换的这个操作 存什么类型的数据进去，获取的时候就什么类型的数据
    
    方法
    先判断一下本地存储中有没有旧的数据
    1.{time：Date.now(),data:[...]}
    2.没有旧数据，直接发送请求
    3.有旧数据 同时 旧数据也没有过期 就使用本地存储的旧数据即可
    */
   const catas=wx.getStorageSync('catas');
   if(!catas)
   {
     this.getcatas();
  }else{
    if(Date.now()-catas.time>1000*10)
    {
      this.getcatas();
    }else{
       this.catas=catas.data;
       let leftMuneList=this.catas.map(v=>v.cat_name);
       let rightMuneList=this.catas[0].children;
       this.setData({
         leftMuneList,
         rightMuneList
       })
    }
  }
},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  //使用增强语法
  async getcatas(){
    /* request({url:'/categories'})
    .then(result=>{
      this.catas=result.data.message;
    //  把接口的数据存入到本地存储中
      wx.setStorageSync('catas', {time:Date.now(),data:this.catas});
      //构造左侧的大大数据

      let leftMuneList=this.catas.map(v=>v.cat_name);
      let rightMuneList=this.catas[0].children;
      this.setData({
        leftMuneList,
        rightMuneList
      })
    }) */

    const res=await request({url:'/categories'});
     this.catas=res;
    //  把接口的数据存入到本地存储中
      wx.setStorageSync('catas', {time:Date.now(),data:this.catas});
      //构造左侧的大大数据

      let leftMuneList=this.catas.map(v=>v.cat_name);
      let rightMuneList=this.catas[0].children;
      this.setData({
        leftMuneList,
        rightMuneList
      })
  },
  handleItemtap(e)
  {
    const {index}=e.currentTarget.dataset;
    let rightMuneList=this.catas[index].children;
    this.setData(
      {
        currentIndex:index,
        rightMuneList,
        scrolltop:0
      }
    )
  
  }





})