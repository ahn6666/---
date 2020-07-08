// pages/cart/index.js
import{getSetting,chooseAddress, openSetting,showmodal,showToast} from"../../utils/anyncWX.js"
Page({


  data:{
      address:{},
        cart:[],
        totlePrice:0,
        totleNum:0
  },
  onShow()
  {
    const address=wx.getStorageSync("address");
    let cart=wx.getStorageSync('cart')||[];
    cart =cart.filter(v=>v.checked);
    
    this.setData({address})
  
    let totlePrice=0;
    let totleNum=0;
    cart.forEach(v=>{
      totlePrice+=v.goods_price*v.num;
        totleNum+=v.num;
    })
        
    this.setData( {
      cart,
      totlePrice,
      totleNum,
      address
    })

  },

 
})