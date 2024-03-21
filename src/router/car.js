
import layout from '@/layout'

export default [
  {
    path: "/car",
    name: "用车管理",
    component:layout,
    sort:3,
    requiresAuth:true, 
    meta: {
      title: "car",
      icon: "el-icon-user-solid",
      roule:['22','23'],
      icon:'icon-cheliangguanli'


    },
    //在这里将定义需要菜单显示的路由，并在menus.vue中去到
    children: [
      {
        path: "/car/manage",
        name: "用车审批",
        component: () => import("@/views/car/manage/index.vue"),
        meta: {
          title: "car",
          icon: "el-icon-info",
          requiresAuth:true,
          roule:['22','23'],

        }
      },
    ]
  }
];
