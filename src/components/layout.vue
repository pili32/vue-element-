<template>
  <el-row class="layout_wapper">
    <el-row>
      <el-col :span="24" class="layout_header">
        <headers></headers>
      </el-col>
    </el-row>
    <el-row class="layout_list">
      <el-col :span="4" style="height:100%;w">
        <div class="layout_menu">
          <menus></menus>
        </div>
      </el-col>
      <el-col :span="20" style="height:100%">
        <div class="layout_content">
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

    background: #F56C6C
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

