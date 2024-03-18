

import layout from '@/layout'
export default
    [
        {
            path:"/home",
            component:layout,
            redirect: 'home',
            name:'首页',
            alwaysShow:true,
            sort:0,
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