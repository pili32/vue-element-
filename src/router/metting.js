
import layout from '@/layout'

export default [
  {
    path: "/metting",
    name: "会议管理",
    component:layout,
    sort:2,
    requiresAuth:true, 
    meta: {
      title: "one",
      icon: "el-icon-user-solid",
      roule:['22','23'],
      icon:'icon-huiyi'

    },
    //在这里将定义需要菜单显示的路由，并在menus.vue中去到
    children: [
      {
        path: "/metting/manage",
        name: "会议审批",
        component: () => import("@/views/metting/manage/index.vue"),
        roule:['guanyu'],
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
