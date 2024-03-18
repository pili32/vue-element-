import Vue from "vue";
import Vuex from "vuex";

import tagView from "./modules/tagView"
import user from "./modules/user"

console.log(tagView);
Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true, // 开启严格模式  确保state 中的数据只能 mutations 修改
  state: {
    count: 0,
    data: {},
    userInfo: {},
    routerMenu: [],
    breadNav: [],
    currentRoute:'' //当前路由地址
  },
  mutations: {
    //这里是set方法
    baiduAddress(state, data) {
      state.userInfo = data;
    },
    SAVE_ROUTER(state, data) {
      console.log(data);
      state.routerMenu = data;
    },
    saveBreadNav(state, data) {
      state.breadNav = data;
    },

    SET_CURRENT_ROUTE: (state, routes) => {
      state.currentRoute = routes;
    }
  },
  getters: {
    currentRoute:state => state.currentRoute,
    routerMenu:state => state.routerMenu

    //这里是get方法
  },
  // 在这里进行数据处理
  actions: {
    setBreadNav({ commit }, state) {
      commit("saveBreadNav", state);
    },
    loadCurrentRoute({ commit }){
      return new Promise( resolve =>{
        const saveRouter = localStorage.getItem('currentRoute')
        if(saveRouter ){
          commit('SET_CURRENT_ROUTE', JSON.parse(saveRouter))
        } else {
          const defaultrout = { path: '/',}
          commit('SET_CURRENT_ROUTE', defaultrout)
        }
        resolve()
      })
    },
    setCurrentRoute({commit},route) {
      commit('SET_CURRENT_ROUTE', route);
      localStorage.setItem(
        "currentRoute",
        JSON.stringify(route)
      )
    }
  },
  modules: {
    tagView,
    user
    //这里是我自己理解的是为了给全局变量分组，所以需要写提前声明其他store文件，然后引入这里
  }
});

export default store;
