
import layout from '@/layout'

export default [
  {
    path: "/visitor",
    name: "访客管理",
    component:layout,
    sort:1,
    requiresAuth:true, 
    meta: {
      title: "one",
      icon: "el-icon-user-solid",
      roule:['22','23'],
      icon:'icon-fangkedengji '

    },
    //在这里将定义需要菜单显示的路由，并在menus.vue中去到
    children: [
      {
        path: "/visitor/manage",
        name: "访客审批",
        component: () => import("@/views/visitor/manage/index.vue"),
        meta: {
          title: "table",
          icon: "icon-fangkeshenpi",
          requiresAuth:true,
          roule:['22','23'],

        }
      },
    ]
  }
];
