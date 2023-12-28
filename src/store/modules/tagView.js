

const actions = {
    ////派发增加标签页方法
    addView: ({commit},view) => {
        commit('ADD_TAGES_VIEW',view)
    },
    //派发关闭标签页方法
    closeView:({commit},view) =>{
        commit('CLOSE_TAGES_VIEW',view)
    },
    initTag:({commit},view) =>{
        commit('INIT_TAG',view)
        
    }
}
const mutations = {
    //新增标标签页
    ADD_TAGES_VIEW :(state,view) =>{
        if(state.tagesViewsData.some(v=>v.path === view.path)) return; //判断当前传来的path,原有的数据里面没有就push
        state.tagesViewsData.push(view)
    },
    //删除当前的数组
    CLOSE_TAGES_VIEW:(state,view) =>{
        for (const [i, v] of state.tagesViewsData.entries()) {  //entries()枚举,返回对象的键值对
            if (v.path === view.path) {
              state.tagesViewsData.splice(i, 1)
              break
            }
          }
    },
    INIT_TAG:(state,view) =>{
        state.tagesViewsData.unshift(view)
    }
}
const  getters ={
    visitedViews :state=>state.tagesViewsData
}
const state ={
    tagesViewsData:[]
}
export default {
    actions,
    mutations,
    getters,
    state
}