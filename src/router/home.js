

import layout from '@/layout'
export default
    [
        {
            path:"/",
            component:layout,
            redirect: '/home',
            name:'首页',
            alwaysShow:true,
            requiresAuth:true, 
            sort:0,
            meta: {
              title: "首页",
              icon: "el-icon-info"
            },
            children:[
                {
                    path: "/home",
                    name: "首页",
                    component: () => import("@/pages/home"),
                    meta: {
                      title: "首页",
                      icon: "el-icon-info"
                    },
                  },
            ]

          },
    ]

