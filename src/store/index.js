import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    strict:true,  // 开启严格模式  确保state 中的数据只能 mutations 修改
    state:{
      count:0,
      data:{},
      userInfo:{},
      routerMenu:[],
      breadNav:[],

    },
    mutations: {
        //这里是set方法
        baiduAddress(state,data){
            state.userInfo = data
        },
        saveRouterMenu(state,data){
          state.routerMenu = data
        },
        saveBreadNav(state,data) {
          state.breadNav = data
        }
    
      },
    getters: {    
        //这里是get方法   

    },
    // 在这里进行数据处理
    actions: {
      setBreadNav({commit},state){
        commit("saveBreadNav",state)
      }
    },
    modules: {
        //这里是我自己理解的是为了给全局变量分组，所以需要写提前声明其他store文件，然后引入这里
    },
  })
  
  export default store;