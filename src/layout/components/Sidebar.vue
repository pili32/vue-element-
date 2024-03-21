<template>
  <div class="menu_list">
    <template  v-if="hasonlyChildren(item) ">
      <!-- 子菜单 -->

      <el-menu-item :index="item.path" v-if="!item.children && isRoule(item)" >
        <i class="el-icon-document"></i>
        <span slot="title">{{ item.name  }}</span>
      </el-menu-item>
      <el-menu-item :index="onlyOneChild.path" v-if="item.children ">
        <i class="el-icon-document"></i>
        <span slot="title" >{{onlyOneChild.title}}</span>
      </el-menu-item>

      <!-- || isShowChange1(item) -->
    </template>
    <!-- 父级菜单 -->
    <template v-else>
      <el-submenu :index="item.path" v-if="!item.hidden && item.requiresAuth">
        <template slot="title">
            <i class="iconfont" v-if="item.icon" :class="item.meta.icon"></i>
            <span class="sub-title">{{ item.name }}{{ item.roule }}</span>
          </template>
          <template >
            <Sidebar
            v-for="child in item.children"
            :key="child.path"
            :index="child.path"
            :item="child"
            ></Sidebar>
          </template>
      </el-submenu>
    </template>
    <!-- <template v-else>
      <el-submenu :index="item.path" v-if="isShowChange(item)">
        <template slot="title">
            <i class="iconfont" v-if="item.icon" :class="item.meta.icon"></i>
            <span class="sub-title">{{ item.name }}{{ item.roule }}</span>
          </template>
          <template >
            <Sidebar
            v-for="child in item.children"
            :key="child.path"
            :index="child.path"
            :item="child"
            ></Sidebar>
          </template>
      </el-submenu>
    </template> -->
  </div>
</template>
  <script>
//取出router.js
import { mapGetters } from "vuex";



export default {
  props:['item',],
  name:'Sidebar',
  components:{
  },
  data() {
    return {
      navaList: [],
      uniqueOpened: true,
      pathUrl: "",
      store: this.$store.state.routerMenu,
      defaultActive: "",
      onlyOneChild:{},
      roleType:''
    };
  },
watch:{
  item: {
      handler: (val) => {
      },
      immediate: true
    },
},
created(){
    const roleJson = this.$storage.get('userInfo').roleJson
    this.roleType= String(JSON.parse(roleJson).visitor)
},
  mounted() {
    this.navaList = this.store;
  },
  computed: {
    //获取store.getters中的currentRoute
    ...mapGetters(["currentRoute"]),
  },
  methods: {
    handleOpen(key) {
      const item = this.navaList.filter((e) => e.path === key);
      let result = this.$filterMenu(key, item[0]);
      this.$store.dispatch("setBreadNav", result);
    },
    handleClose() {
      
    },
    //判断当前的菜单是否只包含一个子级,alwaysShow表示只展示子级不展示父级菜单
    hasonlyChildren(item){
      if(!item.children && !item.hidden) {
        return true
      } else if ( item.children&& item.children.length<2 && item.alwaysShow) {
        this.onlyOneChild.title = item.children[0].name
        this.onlyOneChild.path = item.children[0].path
        return true
      }
    },

    //根据roule权限判断当前是否显示子菜单
    isRoule(item){
      if(item.meta.roule ) {
        console.log(item.meta.roule.includes(this.roleType));
        if(item.meta.roule.includes(this.roleType)) {
            return true
          } else {
          return false
          }

        }else {
          return true

        }
    },
    isShowChange(item){
      if(!item.hidden && item.requiresAuth) {
        if(item.meta.roule ) {
          if(item.meta.roule.includes(this.roleType)) {
            return true
          } else {
          return false
          }

        }else {
          return true

        }
      } else {
        return false
      }
    }
  },
};
</script>
  
  <style  >
  .el-menu{
    border: none;
    background: rgb(48, 65, 86);
  }
/* .el-menu{
  background:none !important;

} */
/* ul li{
      background: red
  }
  .el-menu-item .is-active{
      background: red
  } */
</style>