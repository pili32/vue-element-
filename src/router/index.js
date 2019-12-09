import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import main from '@/views/index'
import layout from '@/components/layout'
import one from '@/views/one'
import three from '@/views/three'
import two from '@/views/two'
import four from '@/views/four'
import five from '@/views/five'





Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'login',
      component: login
    },
    {
      path:'/layout',
      component:layout,
      children:[{
        path:'one',
        name:'第一个页面',
        component:one,
        meta: {
          title: "one",
          icon: "el-icon-user-solid",
        },
        //在这里将定义需要菜单显示的路由，并在menus.vue中去到
        children:[{
          path:'four',
          name:'第1.1个页面',
          component:four,
          meta:{
            title:'',
            icon:'el-icon-info'
          }
        }]

      },
      {
        path:'two',
        name:'第二个页面',
        component:two,
        meta: {
          title: "two",
          icon: "el-icon-service",
        },
        children:[{
          path:'five',
          name:'第二个的子页面',
          component:five,
          meta:{
            title:'five',
            icon: "el-icon-service",

          }
        }]
      },
      {
        path:'three',
        name:'第三个页面',
        component:three,
        meta: {
          title: "three",
          icon: "el-icon-s-tools",
        }
      }
    ]
    }
  ]
})

//   const permissionRouter=[{
//   path:'one',
//   name:'这是我第一个页面',
//   component:one,
//   meta: {
//     title: "one",
//     icon: "el-icon-user-solid",
//   },
//   children:[{
//     path:'four',
//     name:'这是我第1.1个页面',
//     component:four,
//     meta:{
//       title:'',
//       icon:'el-icon-info'
//     }
//   }]

// },
// {
//   path:'two',
//   name:'这是我第二个页面',
//   component:two,
//   meta: {
//     title: "two",
//     icon: "el-icon-service",
//   },
  
// },
// {
//   path:'/three',
//   name:'这是我第三个页面',
//   component:three,
//   meta: {
//     title: "three",
//     icon: "el-icon-s-tools",
//   }
// }
// ]


