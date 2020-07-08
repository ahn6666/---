

 /* 完成全部的请求在关闭全部刷新的操作 */
 let ajaxtimes=0;
 

export const request=(params)=>{
 

    ajaxtimes++;
    wx.showLoading({
        title: '加载中',
        mask:true
      })
      //定义公共的路径
      const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1";
    return new Promise((resolve,reject)=>{
    wx.request({
       ...params,
        url:baseUrl+params.url,
        success: (result) => {
         resolve(result.data.message) ; 
        },
        fail: (err) => {reject(err);},
        complete:()=>
        {
            ajaxtimes--;
            if(ajaxtimes==0)
            {
                setTimeout(function () {
                    wx.hideLoading()
                  }, 2000) 
            }
            
        }
        
});
})
}