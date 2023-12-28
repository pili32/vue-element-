
import layout from '@/layout'

export default [
  {
    path: "/two",
    name: "twoPage",
    component: layout,
    meta: {
      title: "two",
      icon: "el-icon-service"
    },
    children: [
      {
        path: "/two/baiDuMap",
        name: "百度地图",
        component: () => import("@/components/baiDuMap/baiDuMap.vue"),
        meta: {
          title: "baiDuMap",
          icon: "el-icon-service"
        }
      }
    ]
  }
];
