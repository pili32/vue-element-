<template>
  <el-row class="layout_wapper">
    <el-row>
      <el-col :span="24" class="layout_header">
        <top-header></top-header>
      </el-col>
      <el-col :span="24" class="layout_header">
        <tages-view></tages-view>
      </el-col>
    </el-row>
    <el-row class="layout_list">
      <el-col :span="4" style="height: 100%">
        <div class="layout_menu">
          <el-menu
          router
          mode="vertical"
          @open="handleOpen"
          collapse-transition
          :unique-opened="uniqueOpened"
          :default-active="currentRoute"
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
      <el-col :span="20" style="height: 100%">
        <div class="layout_content">
          <bread-nav></bread-nav>
          <div class="rouer-page">
            <router-view />
          </div>
          <!-- 在这里放入router-view:放入子组件，这样对应的右边内容就会出来 -->
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
    TagesView
  },
  computed:{
    ...mapGetters(["routerMenu","currentRoute"]),
  },
  created(){
    console.log(this.$store.state.routerMenu);
  },
  methods:{
    handleOpen(key) {
      const item = this.navaList.filter((e) => e.path === key);
      let result = this.$filterMenu(key, item[0]);
      this.$store.dispatch("setBreadNav", result);
    },
  }
};
</script>
   <style  >
.layout_wapper {
  /* position: relative; */
  width: 100%;
  height: 100%;
}
.layout_header {
  /* height: 80px; */
  overflow: hidden;
}
.layout_list {
  height: calc(100% - 80px);
  padding: 20px 0;
}
.layout_menu {
  /* width: 30%; */
  height: 100%;
  /* background-image: linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%); */


}
.layout_content {
  /* width: 70%; */
  height: 100%;
  padding: 0 20px 20px 20px;
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
  border: 1px solid #ddd;
  height: calc(100% - 36px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 20px;
  box-sizing: border-box;
}
</style>
  