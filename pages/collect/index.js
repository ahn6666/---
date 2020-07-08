// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tap:[
      {
        id:0,
        value:"商品收藏",
        isActive:true
      },
      {
        id:1,
        value:"品牌收藏",
        isActive:false
      },
      {
        id:2,
        value:"店铺收藏",
        isActive:false
      },
      {
        id:3,
        value:"浏览足迹",
        isActive:false
      }
    ],
    collected:[]
  },
  handletapItemChange(e)
  {
    /* 获取被点击的标题索引 */
    const {index}=e.detail;
    /* 修改原数组 */
    let {tap}=this.data;
    tap.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({tap})
  },


  onShow: function () {
    const collected=wx.getStorageSync('collected');
    this.setData({collected})
  },

  
})