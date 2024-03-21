import Vue from 'vue'
import Router from 'vue-router'
import main from '@/views/index'
import layout from '@/layout'
import store from '../store'
import storage from '@/utils/storage'

let routers = []
const userInfo = storage.get('userInfo')
console.log(userInfo);
console.log(store);

//这里是查找旁系目录中的以.js文件为后缀的文件
const requireContext = require.context(
  './',  //查找目录条件
  true, //是否递归查找
  /\.js$/  //以什么结尾
)
requireContext.keys().forEach(fileName => {
  if(fileName === 'index') return
  const routerModule = requireContext(fileName)
  for (let key in routerModule){
    routers.push(routerModule[key][0] || key);
}

  // routers=[...routers,...(routerModule.default || routerModule)]
});


routers.sort((b, a) =>   b.sort -a.sort )

const dynamicRouters =[

]
// /**
//  * @requiresAuth 是否需要登录才能查看
//  * @sort 菜单排序
//  * @roles 查看权限
//  */
const routes =[
  {
    path: "/login",
    name: "登录",
    component:(() => import('@/views/login')),
    sort:-3,
    hidden:true,   //隐藏
    meta: {
      title: "one",
      icon: "el-icon-user-solid"
    },
  },
  // {
  //   path: '/',
  //   name:'login',
  //   component:(() => import('@/views/login')),
  //   hidden: true

  // },
  {
    path:'/redirect',  
    comments:layout,
    name: 'layout',
    component:(() => import('@/layout')), 
    hidden:true,
  },
  ...routers,
  ...dynamicRouters
]
store.commit('SAVE_ROUTER',routes)
console.log(storage.get('userInfo'));
const router = new Router({
  routes: routes

})
// beforeEach全局路由收文，不符合的根据定义逻辑跳转
router.beforeEach((to,form,next) =>{
  if (to.path === '/login') {
    next()  // 登录页直接next()
  } else {
    let token = store.state.user.token  // 获取token
    if (token  ) {  // 如果已登录
      //存入当前菜单路径对应menu的index字段显示当前菜单显示
      store.dispatch('setCurrentRoute', to.path)
      next()
    } else {
      next('/login')  // 未登录则跳转到登录页
    }
  } 

  //  console.log(userInfo);
  //  if(userInfo == null){
  //   console.log(1);
  //   next({)
  //   return
  //  } else {

  //  }



//   console.log(to);
//   const requiresAuth = to.meta.requiresAuth
//   console.log(requiresAuth);

//   if(requiresAuth) {
//     next('/login')
//   }else {
//   console.log(11);

// }
  // store.dispatch('setCurrentRoute', to.path)
  // if(to.path === "/") {
  //   return next("/home")
  // }


  //可以在meta信息里面校验
  // if(to.meta.requiresAuth){
  //   console.log(to.meta.requiresAuth);
  //  next({path:'/'})
  // } else {
  // }
})

//路由后置守卫
// router.afterEach((to,form) =>{
//   let title = ''
//   try{
//     throw new Error('这是一个错误');
//   }catch(error){
//     console.log(error);

//     document.title = 'Vue App'
//   }
// })

export default router

Vue.use(Router)



