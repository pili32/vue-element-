<template>
  <el-row class="layout_wapper">
    <el-row>
      <el-col :span="24" class="layout_header">
        <headers></headers>
      </el-col>
    </el-row>
    <el-row class="layout_list">
      <el-col :span="4" style="height:100%;">
        <div class="layout_menu">
          <menus></menus>
        </div>
      </el-col>
      <el-col :span="20" style="height:100%">
        <div class="layout_content">
          <BreadNav></BreadNav>
          <div class="rouer-page">
            <router-view/>
          </div>
          <!-- 在这里放入router-view:放入子组件，这样对应的右边内容就会出来 -->
        </div>
      </el-col>
    </el-row>
  </el-row>
</template>
<style  >
.layout_wapper {
  /* position: relative; */
  width: 100%;
  height: 100%;
}
.layout_header {
  height: 80px;
  overflow: hidden;
}
.layout_list{
    height:calc(100% - 80px);
    padding: 20px 0;
}
.layout_menu{
    /* width: 30%; */
    height: 100%;
    background:#909399
}
.layout_content{
    /* width: 70%; */
    height: 100%;
    padding:  0 20px 20px 20px;
    box-sizing: border-box;

}
a{
text-decoration:none;
color:#ddd;
}
 a:hover{
color:#fff
 }
 .rouer-page{
   border: 1px solid #ddd;
   height: calc( 100% - 36px);
   box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
   padding: 20px;
   box-sizing: border-box;
 }

</style>

<script>
// import header from "@/components/header"
import headers from "./headers";
import menus from "./menus";
import BreadNav from '../common/BreadNav/BreadNav.vue'


export default {
  data() {
    return {};
  },
  components: {
    headers,
    menus,
    BreadNav
  }
};
</script>

