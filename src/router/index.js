import Vue from 'vue'
import Router from 'vue-router'
import main from '@/views/index'
import layout from '@/components/layout'
import store from '../store'





const routes =[
  {
    path: '/',
    name: 'login',
    component:(() => import('../components/login.vue')),
  },
  {
    path:'/layout',   //路由路径名称
    component:(() => import('../components/layout.vue')),   //路由路径
    children:[{
      path:'/one',
      name:'第一个页面',
      component:(() => import('../views/one.vue')),
      meta: {
        title: "one",
        icon: "el-icon-user-solid",
      },
      //在这里将定义需要菜单显示的路由，并在menus.vue中去到
      children:[{
        path:'/one/echart',
        name:'第1.1个页面',
        component:(() => import('../views/four.vue')),
        meta:{
          title:'',
          icon:'el-icon-info'
        }
      }]

    },
    {
      path:'/two',
      name:'第二个页面',
      component:(() => import('../views/two.vue')),
      meta: {
        title: "two",
        icon: "el-icon-service",
      },
      children:[{
        path:'/two/baiDuMap',
        name:'百度地图',
        component:(() => import('../views/baiDuMap.vue')),
        meta:{
          title:'baiDuMap',
          icon: "el-icon-service",

        }
      }]
    },
    {
      path:'/layout/three',
      name:'第三个页面',
      component:(() => import('../views/three.vue')),
      meta: {
        title: "three",
        icon: "el-icon-s-tools",
      }
    }
  ]
  },
]
console.log(routes)
store.commit('saveRouterMenu',routes)
export default new Router({
  routes: routes
})

Vue.use(Router)



