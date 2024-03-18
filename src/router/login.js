
import login from '@/views/login'

export default [
    {
      path: "/login",
      name: "登录",
      component:login,
      sort:-3,
      hidden:true,   //隐藏
      meta: {
        title: "one",
        icon: "el-icon-user-solid"
      },
    }
  ];
  