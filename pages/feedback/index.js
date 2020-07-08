// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   * 点击“+”触发tap点击事件
   * 获取到图片的路径
   * 把图片路径
   * 存到data的数据中
   * 页面可以根据图片数组 进行循环显示 自定义组件
   */
  data: {
    tap:[
      {
        id:0,
        value:"体验问题",
        isActive:true
      },
      {
        id:1,
        value:"商品商家投诉",
        isActive:false
      }],
      images:[],
      texVal:""
  },
  //外网的图片路径
  uploadImg:[],
  handletapItemChange(e)
  {
    /* 获取被点击的标题索引 */
    const {index}=e.detail;
    /* 修改原数组 */
    let {tap}=this.data;
    tap.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({tap})
  },
  handlecChoose()
  {
    wx.chooseImage({
      count: 5,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:(res)=>{
        this.setData({
          images:[...this.data.images,...res.tempFilePaths]
        })
        
      }
    })
  },
  /* 文本域的输入内容 */
  handleText(e)
  {
    this.setData({
      texVal:e.detail.value
    })
  },
  /* 表单提交 */
  handleForm()
  {
    const {texVal,chooseImage}=this.data;
    //合法性的验证
    if(!texVal.trim())
    {
      
      wx.showToast({
        title: '输入不合法',
        mask: true,
      })
      return;
    }
    wx.showLoading({
      title: '正在传输数据',
    })
    //判断图片是否上传无法用
    /* if(chooseImage.length!=0){
    chooseImage.forEach((v,i)=>{
      //把图片上传到专门的图片途径
      wx.uploadFile({
        filePath: 'v',
        name: "image",
        url: 'img.coolcr.cn/index/api.html',
        formData: {},
        success: (result) => {
          let url=JSON.parse(result.data);
          this.uploadImg.push(url);
          //把所有的图片提交
          if(i===chooseImage.length-1)
          {
            
            console.log("把文本提交");
            wx.hideLoading();
            this.setData({
              texVal:"",
              chooseImage:[]
            })
            //返回上一个页面
            wx.navigateBack({
              delta: 1
            });
              
          }
        }
      })
    })
    }else{ */
      wx.showLoading();
      console.log("提交了文本");
      wx.navigateBack({
        delta:1
      })

   }
})