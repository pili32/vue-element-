
import layout from '@/layout'

export default [
  {
    path: "/layout/three",
    name: "threePage",
    component:layout,
    meta: {
      title: "three",
      icon: "el-icon-s-tools"
    },
    children:[
        {
            path: "/layout/textBal",
            name: "第三个页面",
            component: () => import("../pages/three/text.vue"),
            meta: {
              title: "textBal",
              icon: "el-icon-s-tools"
            }
          }
    ]
  }
];
