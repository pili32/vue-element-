<template>
  <el-row class="layout_wapper">
    <!-- <el-row>
      <el-col :span="24" class="layout_header"> -->
    <!-- </el-col>
      <el-col :span="24" class="layout_header"> -->
    <!-- </el-col>
    </el-row> -->
    <el-row class="layout_list">
      <el-col :span="3" style="height: 100%">
        <div class="layout_menu">
          <el-menu
            router
            mode="vertical"
            @open="handleOpen"
            collapse-transition
            :unique-opened="uniqueOpened"
            :default-active="currentRoute"
            text-color="#fff"
            active-text-color="#4982FC"
            background-color="#304156"

          >
            <side-bar
              v-for="item in routerMenu"
              :key="item.path"
              :index="item.path"
              :item="item"
            ></side-bar>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="21" style="height: 100%">
        <div class="container">
          <top-header></top-header>   
          <div class="layout_content">
            <tages-view></tages-view>
            <!-- <bread-nav></bread-nav> -->
            <div class="rouer-page">
              <router-view />
            </div>
            <!-- 在这里放入router-view:放入子组件，这样对应的右边内容就会出来 -->
          </div>
        </div>
      </el-col>
    </el-row>
  </el-row>
</template>

  <script>
// import header from "@/components/header"
import TopHeader from "./components/topHeader.vue";
import SideBar from "./components/Sidebar";
import BreadNav from "./components/BreadNav.vue";
import TagesView from "./components/tagesView";

import { mapGetters } from "vuex";

export default {
  data() {
    return {
      uniqueOpened: true,
    };
  },
  components: {
    TopHeader,
    SideBar,
    BreadNav,
    TagesView,
  },
  computed: {
    ...mapGetters(["routerMenu", "currentRoute"]),
  },
  created() {
    const roleJson = this.$storage.get('userInfo')
    console.log(roleJson);

  },
  methods: {
    handleOpen(key) {
      if (this.navaList) {
        const item = this.navaList.filter((e) => e.path === key);
        let result = this.$filterMenu(key, item[0]);
        this.$store.dispatch("setBreadNav", result);
      }
    },
  },
};
</script>
   <style  >
.layout_wapper {
  /* position: relative; */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.layout_header {
  /* height: 80px; */
  overflow: hidden;
}
.layout_list {
  flex-grow: 1;
  padding-top: 5px;
  /* box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); */
  padding: 5px;
}
.layout_menu {
  /* width: 30%; */
  height: 100%;
  border-right: 2px solid #ddd;
  background: rgb(48, 65, 86);
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  overflow: hidden;

  /* background-image: linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%); */
}
.layout_content {
  /* width: 70%; */
  /* height: 100%; */
  /* padding: 0 20px 0px 5px; */
  box-sizing: border-box;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04); */
  display: flex;
  flex-direction: column;
  flex: 1;
  padding:  0 5px;
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: #ddd;
}
a:hover {
  color: #fff;
}

.rouer-page {
  display: flex;
  flex: 1;
  flex-grow: 1;
  padding: 5px 0;
  box-sizing: border-box;
  width: 100%;
}

/* 点击菜单变色 */
.el-submenu .el-menu-item {
  /* background: #000; */
}
.el-submenu .el-menu-item {
  /* min-width: 0; */
}
.container {
  display: flex;
  height: 100%;
  flex-direction: column;
}
</style>
  