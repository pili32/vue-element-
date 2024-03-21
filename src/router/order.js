
import layout from '@/layout'

export default [
  {
    path: "/order",
    name: "点餐管理",
    component:layout,
    sort:4,
    requiresAuth:true, 
    meta: {
      title: "one",
      icon: "el-icon-user-solid",
      roule:['22','23'],

    },
    //在这里将定义需要菜单显示的路由，并在menus.vue中去到
    children: [
      {
        path: "/order/manage",
        name: "点餐审批",
        component: () => import("@/views/order/manage/index.vue"),
        meta: {
          title: "table",
          icon: "el-icon-info",
          requiresAuth:true,
          roule:['22','23'],

        }
      },
    ]
  }
];
