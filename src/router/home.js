

import layout from '@/layout'
export default
    [
        {
            path:"/",
            component:layout,
            redirect: 'home',
            name:'首页',
            alwaysShow:true,
            children:[
                {
                    path: "/home",
                    name: "home",
                    component: () => import("@/pages/home"),
                    meta: {
                      title: "home",
                      icon: "el-icon-info"
                    },
                  },
            ]

          },
          {
            path:"/screen",
            component:layout,
            alwaysShow:true,
            name:'首页',
            children:[
                {
                    path: "/screenPage",
                    name: "screen",
                    component: () => import("@/pages/screen"),
                    meta: {
                      title: "screen",
                      icon: "el-icon-info"
                    },
                  },
            ]

          },
    ]