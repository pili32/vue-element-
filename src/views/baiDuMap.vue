<template>
  <div style="margin:auto;width:100%;height：100%">
    <el-form ref="formIns" :model="formIns" label-width="50px">
      <span>经度:</span>
      <el-input v-model="formIns.jingDu" style="width:100px"></el-input>
      <span>纬度:</span>
      <el-input v-model="formIns.weiDu" style="width:100px"></el-input>
      <el-button type="primary" @click="openBiDu">打开百度弹框</el-button>
    </el-form>
    <!-- <baiDuMap></baiDuMap> -->
    <!-- show-close	是否显示关闭按钮 -->
    <!-- close-on-press-escape	是否可以通过按下 ESC 关闭 Dialog -->
    <el-dialog title="百度地图" :visible.sync="dialogVisible" size="large" :show-close='false' :close-on-click-modal='false'>
      <baiDuMap @CloseBaiduMap="CloseBaiduMap" :baidu_address="formIns.baiduAddress"></baiDuMap>
      <!-- <span size="large" fix v-if="loading1" style="font-size:20px">加载中...</span> -->
    </el-dialog>
  </div>
</template>

<style >
</style>

<script>
import baiDuMap from "@/views/baduicomponent.vue";
export default {
  data() {
    return {
      dialogVisible: false,
      formIns: {
        jingDu: "",
        weiDu: "",
        baiduAddress: ""
      },
      create: false,
      loading1: false
    };
  },
  computed:{
          ids(){
                return this.$store.state.userInfo
                console.log(this.$store.state.userInfo)
          }
  },
  created(){
          //这里是取消自动搜索附近和导航功能
//     console.log(this.ids)      
   this.formIns.jingDu= JSON.parse(localStorage.getItem('baiDuLng'));
   this.formIns.weiDu= JSON.parse(localStorage.getItem('baiDuLat'));

  },
  methods: {
    openBiDu() {
      this.dialogVisible = true;
      if (this.formIns.jingDu && this.formIns.weiDu) {
        this.formIns.baiduAddress =
          this.formIns.jingDu + "," + this.formIns.weiDu;
      }
      this.loading1 = true;
      this.create = true;
      setTimeout(() => {
        this.loading1 = false;
      }, 2000);
    },
    CloseBaiduMap(data) {
      console.log(data);
      this.formIns.jingDu = data.lng;
      this.formIns.weiDu = data.lat;
         this.dialogVisible = false;
    }
  },
  components: {
    baiDuMap
  }
};
</script>