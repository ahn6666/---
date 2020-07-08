// pages/search/index.js
import { request } from "../../request/index";
Page({

  /*
  1 输入框绑定值改变事件 input 事件
    1 获取到输入框的值
    2 合法性判断
    3 检验通过把输入框的值发送到后台
    4 返回的数据打印到页面上
   */
  data: {
    goods:[],
    hidbtn:false,
    bvalue:''
  },
  timeId:-1,
  handleInput(e)
  {

    const {value}=e.detail;
    if(!value.trim())
    {
      this.setData({
        goods:[],
        hidbtn:false,
        bvalue:''
      })
      return;
    }
    //防抖 定时器 节流 一般用在页面的上拉或者下拉
    this.setData({hidbtn:true})
    clearTimeout(this.timeId);
    this.timeId=setTimeout(() => {
      this.qsearch(value);
    }, 1000);
  },
  async qsearch(query)
  {
    const res=await request({url:"/goods/search",data:{query}})
    this.setData({goods:res});
    
  },
  handleCancle()
  {
    this.setData(
      {
        goods:[],
        hidbtn:false,
        bvalue:''
      }
    )
  }

})