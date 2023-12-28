
import layout from '@/layout'

export default [
  {
    path: "/one",
    name: "onePage",
    component:layout,
    meta: {
      title: "one",
      icon: "el-icon-user-solid"
    },
    //在这里将定义需要菜单显示的路由，并在menus.vue中去到
    children: [
      {
        path: "/one/echart",
        name: "echart",
        component: () => import("@/components/echart/echart.vue"),
        meta: {
          title: "echart",
          icon: "el-icon-info"
        },
      },
      {
        path: "/one/table",
        name: "表格",
        component: () => import("../pages/one/table.vue"),
        meta: {
          title: "table",
          icon: "el-icon-info",
          requiresAuth:true
        }
      },
      {
        path: "/one/wangeditor",
        name: "富文本",
        component: () => import("../pages/one/wangeditor.vue"),
        meta: {
          title: "wangeditor",
          icon: "el-icon-info"
        },
        children:[
          {
            path: "/one/wangeditor1",
            name: "富文本copy",
            component: () => import("../pages/one/wangeditor.vue"),
            meta: {
              title: "wangeditor",
              icon: "el-icon-info"
            },
          }
        ]
      },
      {
        path: "/one/carousel",
        name: "走马灯",
        component: () => import("../pages/one/carousel.vue"),
        meta: {
          title: "carousel",
          icon: "el-icon-info"
        }
      }
    ]
  }
];
