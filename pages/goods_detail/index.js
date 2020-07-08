import { request } from "../../request/index";

/* 
商品收藏
1 页面onShow 的时候 加载缓存中的商品收藏的数据
2 判断当前商品是不是被收藏
  1 是 改变页面的图标
  2 不是 。。。
3 点击商品收藏按钮
  1 判断该商品是否存在于缓存数组中
  2 已经存在 把该商品删除
  3 没有存在 把商品添加到收藏戴数组中 存入到缓存中即可

*/
Page({
  data: {
      goodsObj:{},
      isCollected:false
  },
  goodsBig:{},

  onShow:function(){
    let pages= getCurrentPages();
    let currentPage=pages[pages.length-1];
    let options=currentPage.options;
    const {goods_id}=options;
    this.getgoodDetail(goods_id);
    //不可以直接在此判断 因为getgoodsdetail 是个回调函数
  },
  
  async getgoodDetail(goods_id)
  {
        const goodsObj=await request({url:"/goods/detail",data:{goods_id}});
        this.goodsBig=goodsObj;
        // 获取缓存中的收藏
        let collected=wx.getStorageSync("collected")||[];
    //判断当前页面是否被收藏
        let isCollected=collected.some(v=>v.goods_id===this.goodsBig.goods_id);
        this.setData({
          /* 主要是防止iphone不支持webp模式 */
          goodsObj:{
            goods_name:goodsObj.goods_name,
            goods_price:goodsObj.goods_price,
            goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
            pics:goodsObj.pics
          },
          isCollected
        })
  } ,
  handlepreviewImage(e)
  {
    const urls=this.goodsBig.pics.map(v=>v.pics_big);
    const current=e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    })
  },

  /* 点击加入购物车 
   1 先绑定点击事件
   2 获取缓存中的购物车数据 数组格式
   3 先判断 当前的商品是否已经存在
   4 已经存在 修改商品数据 执行购物车
   5 不存在购物车的数组中 直接给购物出++
   6 弹出提示
  */
  handleCartAdd()
  {
    let cart=wx.getStorageSync("cart")||[];
    let index=cart.findIndex(v=>v.goods_id===this.goodsBig.goods_id);
    if(index===-1)
    {
      this.goodsBig.num=1;
      this.goodsBig.checked=true;

      cart.push(this.goodsBig);

}
else{
  cart[index].num++;

    }
    wx.setStorageSync('cart',cart);
    wx.showToast({
      title: '加入成功',
      mask:true,
      icon:"success"
    })
  }
  /* 点击收藏按钮
   点击商品收藏按钮
  1 判断该商品是否存在于缓存数组中
  2 已经存在 把该商品删除
  3 没有存在 把商品添加到收藏戴数组中 存入到缓存中即可
 */,
handlecollected()
  {
  /*     let isCollected=false;
      //获取缓存中中的收藏数组 
      let collected=wx.getStorageSync("collected")||[];
     //判断商品是否被收藏过 
      let index=collected.findIndex(v=>v.goods_id===this.goodsBig.goods_id); */
      let isCollected=false;
      let collected=wx.getStorageSync("collected")||[];
      let index=collected.findIndex(v=>v.goods_id===this.goodsBig.goods_id);
      if(index!==-1)
      {
        collected.splice(index,1);
        isCollected=false;
        wx.showToast({
          title: '取消成功',
          icon:"success",
          mask:true
        })
      }
      else
      {
        collected.push(this.goodsBig);
        isCollected=true;
        wx.showToast({
          title: '收藏成功',
          icon:"success",
          mask:true
        })
      }
      wx.setStorageSync("collected",collected);
      this.setData({isCollected});
  }




})


