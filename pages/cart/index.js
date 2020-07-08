// pages/cart/index.js
import{getSetting,chooseAddress, openSetting,showmodal,showToast} from"../../utils/anyncWX.js"
Page({


  /* 获取用户的地址  wx.chooseLocation api
  
    但是需要获取用户权限 wx.getSetting
    1.假设用户点击获取收获地址的的提示框 确定authSetting scope.address
    scope 值 true 直接调用 获取收货地址
    2 假设用户从来没有调用过收货地址
    scope 值 unfined 直接调用获取收获地址
    3 假设永华 点击获取收货地址的提示框 取消
    scope 值 false
    1 诱导 用户自己 打开授权页面 当用户重新给与 获取地址权限的时候
    2 获取收货地址
   
  2 页面加载完毕
  onload onshow
  1 获取本地存储中的地址数据
  2 把数据设置给data中的 一个变量
  onshow
  0 回到了商品详情页面 第一次添加商品的时候 手动添加了属性
  num=1
  checked=true
  获取缓存中购物车的数据
  把购物车的数据存储到data中
  4 全选的实现
  onshow 获取缓存中的购物车的数组
  然后可以计算 所有的商品都被选中 checked=true every 每一个回调函数都返回true 则为true
  5 商品的选中
  获取商品的id
  // 获取商品 找到商品checked
  判断商品是否被选中
  总价格 +=商品的单价*商品的数量
  总数量+= 商品的数量
  把计算后的价格和数量 设置回data中
 6
 商品的选中
 绑定change 事件
 获取到被修改的商品的对象
 商品对象的选中状态 取反
 重新填充到data中的缓存
 重新计算悬泉
 7
 全选和反选
 全选复选框绑定事件change
 获取全选遍历
 全选状态取反
 遍历购物车数据 选中 的状态
 存入缓存中
 8
 商品数量的增减
 绑定+—同一个事件 区分关键 自定义属性
传递被点击的商品的id
获取data中购物车的数组 来获取需要被修改的商品的对象
直接修改商品对象的数量 num
把cart重新设置回缓存 
  */
  data:{
        address:{},
        cart:[],
        allchecked:false,
        totlePrice:0,
        totleNum:0
  },
  onShow()
  {
    const address=wx.getStorageSync("address");
    const cart=wx.getStorageSync('cart')||[];
    // const allchecked=cart.length?cart.every(v=>v.checked):false;
    // 优化
/*     let allchecked=true;
    let totlePrice=0;
    let totleNum=0;
    cart.forEach(v=>{
      if(v.checked)
      {
        totlePrice+=v.goods_price*v.num;
        totleNum+=v.num;
      }else{
        allchecked=false;
      }
      //如果一开始 数组就为0 则做如下的判断
      
    })
  allchecked=cart.length?allchecked:false;
    this.setData( {
      address,
      cart,
      allchecked,
      totlePrice,
        totleNum
    }) */
    //优化过
    this.setCart(cart);
    this.setData({address})
   
  },
  async handleChooseadd()
  {
    /* wx.chooseLocation({
      
      success: (result) => {
        console.log(result)
      }
    }) */
   /*  wx.getSetting({
      success:(result)=>{
        const scopeAdd=result.authSetting["scope.address"];
        if(scopeAdd===true||scopeAdd===undefined)
        {
          wx.chooseAddress({
            success: (result1) => {
              console.log(result1);
            }
          })
        }
        else{
          wx.openSetting({
            success:(result2) => { console.log(result2);}
          })
          }
        }
       }) */
       
    try {
      const res1=await getSetting();
     const scopeAdd=res1.authSetting["scope.address"];
     if(scopeAdd===true||scopeAdd===undefined)
    {
      const address=await chooseAddress();
      /* 把获取到地址存储到本地中 */
      wx.setStorageSync("address",address)
    }else{
     await openSetting();
     const address=await chooseAddress();
     wx.setStorageSync("address",address)
    }
    } catch (error) {
      console.log(error)
    }
  },
  handleItemChange(e)
  {
    // 获取商品id
    const goods_id=e.currentTarget.dataset.id;
    // 获取商品
    let {cart}=this.data;
    //找到商品checked
    let index=cart.findIndex(v=>v.goods_id===goods_id)
    //选中位置取反
    cart[index].checked=!cart[index].checked;
    //重新添加 存入缓存中
    
    //重新计算
    this.setCart(cart);
  },
  setCart(cart)
  {
    let allchecked=true;
    let totlePrice=0;
    let totleNum=0;
    cart.forEach(v=>{
      if(v.checked)
      {
        totlePrice+=v.goods_price*v.num;
        totleNum+=v.num;
      }else{
        allchecked=false;
      }
      //如果一开始 数组就为0 则做如下的判断
      
    })
    allchecked=cart.length?allchecked:false;
    this.setData( {
      cart,
      allchecked,
      totlePrice,
      totleNum
    })
    wx.setStorageSync("cart", cart);
  },
  //商品的全选功能
  handleAllchk()
  {
    let {cart,allchecked}=this.data;
    allchecked=!allchecked;
    cart.forEach(v=>v.checked=allchecked);
    this.setCart(cart);
  },
  //商品的数量增减
  async handleNumEd(e)
  {
    const {operation,id}=e.currentTarget.dataset;
    let {cart}=this.data;
    const index=cart.findIndex(v=>v.goods_id===id);
  
    if(cart[index].num==1&&operation===-1)
    {
      /* wx.showModal({
        title: '提示',
        content: '您确定要删除吗',
        success :(res)=> {
          if (res.confirm) {
            cart.splice(index,1);
            this.setCart(cart)
          } 
          else if (res.cancel) {
            console.log("用户点击取消");
            
          }
        }
      }) */
      const res=await showmodal({content:"您确定要删除吗?"})
      if (res.confirm) {
        cart.splice(index,1);
        this.setCart(cart)
      } 
      else if (res.cancel) {
        console.log("用户点击取消");
        
      }
    }else{
      cart[index].num+=operation;
      this.setCart(cart);
    } 
  } ,
 async handlepay()
  {
      const {address,totleNum}=this.data;
      if(!address.userName)
      {
        await showToast({title:"您还没有添加地址"})
        return ;
      }
      if(totleNum===0)
      {
        await showToast({title:"你还没有选购商品！"})
        return ;
      }
      wx.navigateTo({
        url: '/pages/pay/index',
      })
  }
})