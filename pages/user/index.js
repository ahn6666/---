// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    collectNum:0
  },
  onShow()
  {
    const userInfo=wx.getStorageSync("userInfo");
    const collected=wx.getStorageSync("collected")||[];
    
    this.setData({userInfo,collectNum:collected.length});
  }
  
})