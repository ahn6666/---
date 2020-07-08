// components/tap.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
        tap:{
            type:Array,
            value:[]
        }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleItemtap(e)
    {
      /* 获取点击的索引 */
      const {index}=e.currentTarget.dataset;
      /* 触发父组件的事件的定义 */
      this.triggerEvent("tapItemChange",{index});
    }
  }
})
