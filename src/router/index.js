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
      component:(() => import('../pages/one/index.vue')),
      meta: {
        title: "one",
        icon: "el-icon-user-solid",
      },
      //在这里将定义需要菜单显示的路由，并在menus.vue中去到
      children:[
        {
          path:'/one/echart',
          name:'echart',
          component:(() => import('../layout/echart/echart.vue')),
          meta:{
            title:'',
            icon:'el-icon-info'
          }
        },
        {
          path:'/one/table',
          name:'表格',
          component:(() => import('../pages/one/table.vue')),
          meta:{
            title:'',
            icon:'el-icon-info'
          }
        },
        {
          path:'/one/wangeditor',
          name:'富文本',
          component:(() => import('../pages/one/wangeditor.vue')),
          meta:{
            title:'',
            icon:'el-icon-info'
          }
        },
        {
          path:'/one/carousel',
          name:'走马灯',
          component:(() => import('../pages/one/carousel.vue')),
          meta:{
            title:'',
            icon:'el-icon-info'
          }
        },

      ]

    },
    {
      path:'/two',
      name:'第二个页面',
      component:(() => import('../pages/two/index.vue')),
      meta: {
        title: "two",
        icon: "el-icon-service",
      },
      children:[{
        path:'/two/baiDuMap',
        name:'百度地图',
        component:(() => import('../layout/baiDuMap/baiDuMap.vue')),
        meta:{
          title:'baiDuMap',
          icon: "el-icon-service",

        }
      }]
    },
    {
      path:'/layout/three',
      name:'第三个页面',
      component:(() => import('../pages/three/index.vue')),
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



