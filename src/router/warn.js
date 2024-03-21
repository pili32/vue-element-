
import layout from '@/layout'

export default [
  {
    path: "/warn",
    name: "视频管理",
    component:layout,
    sort:6,
    meta: {
      title: "one",
      icon: "el-icon-user-solid",
      roule:['22','23'],

    },
    //在这里将定义需要菜单显示的路由，并在menus.vue中去到
    // children: [
    //   {
    //     path: "/metting/manage",
    //     name: "会议审批",
    //     component: () => import("../views/order/manage/index.vue"),
    //     meta: {
    //       title: "table",
    //       icon: "el-icon-info",
    //       requiresAuth:true
    //     }
    //   },
    // ]
  }
];
