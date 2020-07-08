export const getSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.getSetting({
          success:(result)=>{
              resolve(result);
          },
          fail:(err)=>{
            resolve(err);
        },
        })
    })
}
export const chooseAddress=()=>{
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
          success:(result1)=>{
              resolve(result1);
          },
          fail:(err1)=>{
            resolve(err1);
        },
        })
    })
}
export const openSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.openSetting({
          success:(result2)=>{
              resolve(result2);
          },
          fail:(err2)=>{
            resolve(err2);
        },
        })
    })
}
/* promise showmodal 
@param{object}
*/
export const showmodal=({content})=>{
    return new Promise((resolve,reject)=>{
        wx.showModal({
            title: '提示',
            content: content,
            success :(res)=> {
                resolve(res);
            },
            fail:(err2)=>{
                resolve(err2);
            }
          })
    })
}
export const showToast=({title})=>{
    return new Promise((resolve,reject)=>{
        wx.showModal({
            title: title,
            success :(res)=> {
                resolve(res);
            },
            fail:(err2)=>{
                resolve(err2);
            }
          })
    })
}