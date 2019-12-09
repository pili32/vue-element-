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
          <!-- 在这里放入router-view:放入子组件，这样对应的右边内容就会出来 -->
          <router-view/>
        </div>
      </el-col>
    </el-row>
  </el-row>
</template>
<style >
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
    height:calc(100% - 80px)
}
.layout_menu{
    /* width: 30%; */
    height: 100%;
    background:#909399
}
.layout_content{
    /* width: 70%; */
    height: 100%;

}
a{
text-decoration:none;
color:#333;
}

</style>

<script>
// import header from "@/components/header"
import headers from "./headers";
import menus from "./menus";


export default {
  data() {
    return {};
  },
  components: {
    headers,
    menus
  }
};
</script>

