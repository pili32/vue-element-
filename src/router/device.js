
import layout from '@/layout'

export default [
  {
    path: "/device",
    name: "设备维修",
    component:layout,
    requiresAuth:true, 
    sort:5,
    meta: {
      title: "one",
      icon: "el-icon-user-solid",
      roule:['22','23'],

    },
    //在这里将定义需要菜单显示的路由，并在menus.vue中去到
    children: [
      {
        path: "/device/manage",
        name: "设备审批",
        component: () => import("../views/device/manage/index.vue"),
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
