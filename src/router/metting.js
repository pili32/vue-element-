
import layout from '@/layout'

export default [
  {
    path: "/metting",
    name: "会议管理",
    component:layout,
    sort:2,
    meta: {
      title: "one",
      icon: "el-icon-user-solid"
    },
    //在这里将定义需要菜单显示的路由，并在menus.vue中去到
    children: [
      {
        path: "/metting/manage",
        name: "会议审批",
        component: () => import("@/views/metting/manage/index.vue"),
        meta: {
          title: "table",
          icon: "el-icon-info",
          requiresAuth:true
        }
      },
    ]
  }
];
