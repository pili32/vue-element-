import GLOBAL from './config';
import { updatePwdLevel, updateRoleAuthorization } from '@/api/User';
import { queryRoleList } from '@/api/Role';

export var BASE_SERVER = '';
let LOGOUT_SERVER = '';

BASE_SERVER = 'http://221.232.130.75:11060';
BASE_SERVER =  process.env.VUE_APP_API_URL ;
BASE_SERVER =  process.env.VUE_APP_API_URL + '/upms-api/';
LOGOUT_SERVER = process.env.VUE_APP_API_URL + '/uias-api/';
// 打包221.232.130.75:11060线上版时需要变更如下：
// const {protocol,hostname} = window.location
// const DOMAIN = `${protocol}//${hostname}:11060`
// BASE_SERVER = DOMAIN + '/upms-api/';
// LOGOUT_SERVER = DOMAIN + '/uias-api/';


// rest请求配置
const DEFAULT_URL = {
  org: {
    // 组织机构接口
    orgTree: `${BASE_SERVER}/sysOrg/tree`, // 系统组织机构 -- 树
    orgPage: `${BASE_SERVER}/sysOrg/page`, // 系统组织机构 -- 列表,分页,查询 皆用此接口
    orgDelete: `${BASE_SERVER}/sysOrg/delete`, // 系统组织机构 -- 删除
    orgAdd: `${BASE_SERVER}/sysOrg/add`, // 系统组织结构 -- 新增
    orgLevel: `${BASE_SERVER}/sysOrg/level/`, // 系统组织结构 -- 级别
    orgEdit: `${BASE_SERVER}/sysOrg/updateOrgById`, // 系统组织结构 -- 修改
    orgfullUserTree: `${BASE_SERVER}/sysOrg/fullTree`, // 系统组织结构 -- 查询组织机构和用户的树.
    orgUserTree: `${BASE_SERVER}/sysOrg/fullUserTree`, // 系统组织结构 -- 只查询当前用户可以查询的组织机构和用户的树.
  },
  user: {
    login: `${BASE_SERVER}/api-uias/oauth/token`, //模拟登陆
    //  系统用户模块
    userAdd: `${BASE_SERVER}/sysUser/add`,
    userPage: `${BASE_SERVER}/sysUser/page`,
    updateBindinglnfo: `${BASE_SERVER}/sysUser/updateBindingInfo`,
    phyDel: `${BASE_SERVER}/sysUser/phyDelete`, // 用户管理 -- 永久性删除
    recoveryUser: `${BASE_SERVER}/sysUser/recovery`,
    unlock: `${BASE_SERVER}/sysUser/unlock`, // 用户管理模块 -- 解锁
    uploadUser: `${BASE_SERVER}/sysUser/uploadPhoto`, // 用户管理 -- 头像上传
    delUser: `${BASE_SERVER}/sysUser/delete`, //   用户管理 -- 逻辑性删除
    editUser: `${BASE_SERVER}/sysUser/edit`,
    //  修改密级
    updatePwdLevel: `${BASE_SERVER}/sysUser/updatePwdLevel`,
    //  角色授权
    updateRoleAuthorization: `${BASE_SERVER}/sysUser/updateRoleAuthorization`,
    //  用户审批
    updateApprovalStatus: `${BASE_SERVER}/sysUser/updateApprovalStatus`,
    //  用户批量审批列表查询
    relationQuery: `${BASE_SERVER}/sysUser/relationQuery`,
    editPassword: `${BASE_SERVER}/sysUser/updatePwd`, //修改密码
    oauthClearFailCount : `${LOGOUT_SERVER}/oauth/clearFailCount `, //解锁
    resetPassword: `${BASE_SERVER}/sysUser/resetPwd`, //重置密码
    getUsersByRole: `${BASE_SERVER}/sysUser/listByRole`,    // 获取角色上绑定的用户
    sysUserListByRealId: `${BASE_SERVER}/sysUser/listByRealId`,    // 多角色列表
    sysUserSetMainUser: `${BASE_SERVER}/sysUser/setMainUser`,    // 指定主账号
    sysUserUpdateMainUserToOther: `${BASE_SERVER}/sysUser/updateMainUserToOther`,    // 更新主账号
    sysUserUpdateMainresign: `${BASE_SERVER}/sysUser/resign`,    // 冻结
    sysUserTransferMainresign: `${BASE_SERVER}/sysUser//transfer`,    // 恢复
    sysUserUpdatePwd:`${BASE_SERVER}/sysUser/updatePwd` //更改密码
  
  },
  menu: {
    //   系统菜单模块
    menuPage: `${BASE_SERVER}/sysMenu/page`, // 菜单模块 -- 分页
    menuTree: `${BASE_SERVER}/sysMenu/tree`, // 菜单模块 -- 树
    menuAdd: `${BASE_SERVER}/sysMenu/add`, // 菜单模块 -- 新增
    menuEdit: `${BASE_SERVER}/sysMenu/edit`, // 菜单模块 -- 编辑
    menuDelete: `${BASE_SERVER}/sysMenu/delete`, // 菜单模块  -- 删除
    roleTree:`${BASE_SERVER}/sysMenu/tree-all`,//获取当前操作人员能授权的权限
  },
  role: {
    //  角色控制器

    //角色list
    queryUserRoleList: `${BASE_SERVER}/sysRole/queryUserRoleList`, //查询已经拥有的角色
    queryRoleList: `${BASE_SERVER}/sysRole/queryRoleList`,
    rolePage: `${BASE_SERVER}/sysRole/page`, // 角色模块 -- 分页
    roleDel: `${BASE_SERVER}/sysRole/delete`, // 角色模块 -- 删除
    roleMenu: `${BASE_SERVER}/sysRole/ownMenu`, // 角色模块 -- 拥有菜单
    roleAuthorization: `${BASE_SERVER}/sysUser/updateRoleAuthorization`, // 角色模块  -- 授权
    deleteRoleAuthorization: `${BASE_SERVER}/sysUser/deleteRoleAuthorization`,  // 删除指定用户绑定的角色
    insertRoleAuthorization: `${BASE_SERVER}/sysUser/insertRoleAuthorization`,  // 新增用户绑定的角色
    roleAdd: `${BASE_SERVER}/sysRole/add`, // 角色模块  -- 新增
    roleEdit: `${BASE_SERVER}/sysRole/edit`, // 角色模块 -- 编辑
    grantMenu: `${BASE_SERVER}/sysRole/grantMenu`,
  },
  admin: {
    // 系统管理员模块
    adminPage: `${BASE_SERVER}/sysAdmin/page`, // 系统管理员 -- 列表,分页,查询 皆用此接口
    adminAdd: `${BASE_SERVER}/sysAdmin/add`, // 系统管理员 -- 添加
    adminDelete: `${BASE_SERVER}/sysAdmin/delete`, //系统管理员 --逻辑删除
    adminEdit: `${BASE_SERVER}/sysAdmin/edit`, //系统管理员 --逻辑删除
  },
  // 用户操作日志
  opLog: {
    opLogPage: `${BASE_SERVER}/log/opPage`, // 操作日志  --分页
    opLogDel: `${BASE_SERVER}/log/opDel`, // 操作日志 -- 删除
    opLogEcxl: `${BASE_SERVER}/log/exportOpLog`, // 操作日志 -- 导出
  },
  // 用户登录日志
  visLog: {
    visLogPage: `${BASE_SERVER}/log/visPage`, // 登录日志  -- 分页
    visLogDel: `${BASE_SERVER}/log/visDel`, // 登录日志  -- 删除
    visLogExportExcel: `${BASE_SERVER}/log/exportVisLog`, // 登录日志  -- 导出
  },

  // 路由菜单
  login: {
    getLogin: `${BASE_SERVER}/login/getLoginUser`,
  },
  logOut:{
    logOut:`${LOGOUT_SERVER}oauth/logout`
  },
  appManager: {
    addApp: `${BASE_SERVER}/sysApp/add`, //系统应用添加
    page: `${BASE_SERVER}/sysApp/page`, //系统应用列表获取
    deleteApp: `${BASE_SERVER}/sysApp/delete`, //删除应用
    deitApp: `${BASE_SERVER}/sysApp/edit`, //编辑应用
  },
  locked: {
    lockedPage: `${BASE_SERVER}/sysUser/lockedPage`, //锁定用户列表
    unlock: `${BASE_SERVER}/sysUser/unlock`, //锁定用户列表
  },
  dict:{
    getUserLevel:`${BASE_SERVER}/dictQuery/getUserLevel`, //获取用户行政级别
    getOrgLevel:`${BASE_SERVER}/dictQuery/getOrgLevel`, //获取机构行政级别
    getUserSecLevel:`${BASE_SERVER}/dictQuery/getUserSecLevel`, //获取人员密级分类
    getUserTitle:`${BASE_SERVER}/dictQuery/getUserTitle`, //获取人员职称分类
  }
};

export default DEFAULT_URL;
