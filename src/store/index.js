import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    strict:true,  // 开启严格模式  确保state 中的数据只能 mutations 修改
    state:{
      count:0,
      data:{},
      userInfo:{}

    },
    mutations: {
        //这里是set方法
        baiduAddress(state,data){
            console.log(data)
            state.userInfo = data
            console.log( state.userInfo )

        }
    
      },
    getters: {    
        //这里是get方法   

    },
    actions: {
    
        //这个部分我暂时用不上
    
    },
    modules: {
        //这里是我自己理解的是为了给全局变量分组，所以需要写提前声明其他store文件，然后引入这里
    },
  })
  
  export default store;