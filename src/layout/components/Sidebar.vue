<template>
  <div class="menu_list">
    <template  v-if="hasonlyChildren(item) ">
      <!-- 子菜单 -->

      <el-menu-item :index="item.path" v-if="!item.children">
        <i class="el-icon-document"></i>
        <span slot="title">{{ item.name  }}</span>
      </el-menu-item>
      <el-menu-item :index="onlyOneChild.path" v-else>
        <i class="el-icon-document"></i>
        <span slot="title" >{{onlyOneChild.title}}</span>
      </el-menu-item>
    </template>
    <!-- 父级菜单 -->
    <template v-else>
      <el-submenu :index="item.path" v-if="!item.hidden">
        <template slot="title">
            <i class="iconfont" v-if="item.icon" :class="item.meta.icon"></i>
            <span class="sub-title">{{ item.name }}</span>
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
  </div>
</template>
  <script>
//取出router.js
import { mapGetters } from "vuex";



export default {
  props:['item'],
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
      onlyOneChild:{}
    };
  },
watch:{
  item: {
      handler: (val) => {
      },
      immediate: true
    },
},
  mounted() {
    // console.log(this.store);
    this.navaList = this.store;
    // console.log(this.navaList, "hidden");

    // this.navaList = this.$store.state.routerMenu.filter( e=>!e.hidden).map( m => m.children)
    // console.log(this.navaList[1],'navaList')
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
    hasonlyChildren(item){

      if(!item.children && !item.hidden) {
        return true
      } else if ( item.children&& item.children.length<2 && item.alwaysShow) {
        console.log(item);
        this.onlyOneChild.title = item.children[0].name
        this.onlyOneChild.path = item.children[0].path
        return true
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