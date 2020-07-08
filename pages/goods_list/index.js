// pages/goods_list/index.js
/* 
用户上滑到滚动条触底 开始加载下一页数据
 1 滚动条触底事件
 2 判断还有没有下一页数据
  1 获取到总页数 只有总条数
  总页数=math.ceil(总条数/页容量pagesize)
  2 判断到当前的页码 pagenum
  3 判断以下 当前的页码是否大于等于总页数
  表示没有下一页数据
3 假如没有下一页数据 弹出一个提示
4 加入还有下一页数据 来加载下一页数据
   1 当前的页码++
   2 重新发送请求
   3 数据请求回来 要对data中的数组进行拼接 而不是全部替换
5
下拉刷新页面
重置数据 数组
重置页码 设置为1  
*/
import { request } from "../../request/index.js";
Page({
  /**
   * 页面的初始数据
   */
  data:{
        tap:[
          {
            id:0,
            value:"综合",
            isActive:true
          },
          {
            id:1,
            value:"销量",
            isActive:false
          },
          {
            id:0,
            value:"价格",
            isActive:false
          }
        ],
        goodList:[]
  },

  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.QueryParams.cid=options.cid||"";
     this.QueryParams.query=options.query||"";
     this. getgoodList();
  },
  /* 获取商品列表请求 */
async getgoodList(){
   const res=await request({url:"/goods/search",data:this.QueryParams});

   const total=res.total;
   this.totapages=Math.ceil(total/this.QueryParams.pagesize);
  
/* 赋值到data */
this.setData(
  {
    /* goodList:res.goods */
    goodList:[...this.data.goodList,...res.goods]
  },
  wx.stopPullDownRefresh()
    
)
 },
  /*
   * 生命周期函数--监听页面初次渲染完成
   */
  handletapItemChange(e)
  {
    /* 获取被点击的标题索引 */
    const {index}=e.detail;
    /* 修改原数组 */
    let {tap}=this.data;
    tap.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({tap})
  },
  onReachBottom()
  {
    if(this.QueryParams.pagenum>=this.totapages)
    {
      wx.showToast({
        title: '最后一页',
      });
        
    }
    else{
      this.QueryParams.pagenum++;
      this.getgoodList();
    }
  },
  onPullDownRefresh: function() {
    this.setData(
      {
        /* goodList:res.goods */
        goodList:[]
      }),
      this.QueryParams.QueryParams=1,
      this. getgoodList()
    
  }
})