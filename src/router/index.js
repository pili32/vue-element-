import Vue from 'vue'
import Router from 'vue-router'
import main from '@/views/index'
import layout from '@/layout'
import store from '../store'

let routers = []
//这里是查找旁系目录中的以.js文件为后缀的文件
const requireContext = require.context(
  './',  //查找目录条件
  true, //是否递归查找
  /\.js$/  //以什么结尾
)

requireContext.keys().forEach(fileName => {
  if(fileName === 'index') return
  const routerModule = requireContext(fileName)
  routers=[...routers,...(routerModule.default || routerModule)]
});

const dynamicRouters =[
  // {
  //   path:'/',   //路由路径名称
  //   component:layout,
  //   redirect:'home',
  //   hidden:true,
  //   children:[
  //     {
  //       path: "/one/echart",
  //       name: "Echart",
  //       component: () => import("@/components/echart/echart.vue"),
  //       meta: {
  //         title: "",
  //         icon: "el-icon-info"
  //       }
  //     },
  //   ]
  // }

]
const routes =[

  {
    path: '',
    name: 'login',
    component:(() => import('@/layout/login.vue')),
    hidden: true
  },
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
console.log(routes);
store.commit('SAVE_ROUTER',routes)
const router = new Router({
  routes: routes

})
// beforeEach全局路由收文，不符合的根据定义逻辑跳转
router.beforeEach((to,form,next) =>{
  store.dispatch('setCurrentRoute', to.path)
  if(to.path === "/") {
    return next("/home")
  }
  next()

  // if (to.path === '/login') {
  //   next()  // 登录页直接next()
  // } else {
  //   let token = store.state.user.token  // 获取token
  //   if (token) {  // 如果已登录
  //     next()
  //   } else {
  //     next('/login')  // 未登录则跳转到登录页
  //   }
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



