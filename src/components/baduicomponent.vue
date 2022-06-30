<template>
  <div class="formBaiDu">
    <el-form ref="center" :model="center" label-width="50px">
        <span>经度:</span>
        <el-input v-model="center.lng" style="width:100px" ></el-input>
        <span>纬度:</span>
        <el-input v-model="center.lat" style="width:100px" ></el-input>
      <el-button type="primary"  @click="BaiduMapOK()" style="margin-bottom:20px">确定</el-button>
    <baidu-map
      class="bm-view"
      :center="center"
      :zoom="zoom"
      :scroll-wheel-zoom="true"
      @click="getBaiDu"
      @ready="handel"
     >
      <!-- 百度官网 https://dafrok.github.io/vue-baidu-map/#/zh/control/navigation -->
      <bm-view style="width: 100%; height:300px;"></bm-view>
      <!-- bm-navigation 在右上角加入缩放控件 右上角缩放控件 -->
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <!-- // bm-map-type 在地图左上角加入地图类型控件 -->
      <bm-map-type
        :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
        anchor="BMAP_ANCHOR_TOP_LEFT"
      ></bm-map-type>

      <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" />
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <!-- bm-geolocation  在地图右下角加入定位控件 -->
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      
    </baidu-map>
    </el-form>
  </div>
</template>

<style >
.bm-view {
  width: 100%;
  height: 300px;
}
.formBaiDu {
  width: 500px;
  margin: auto;
}
</style>

<script>
import { BmView, BmMarker, BmNavigation, BmGeolocation } from "vue-baidu-map";
export default {

  data() {
    return {
      center: {
        lng: 116.404,
        lat: 39.915
      },
      location: {
        lng: "",
        lat: ""
      },
      zoom: 15
    };
  },
      props: {
    baidu_address: String,
  },
  watch:{
    baidu_address:function(newVal,oldVal){
      console.log(newVal)
      let baiduVal = newVal.split(',')
      this.location.lng = baiduVal[0];
      this.location.lat = baiduVal[1];
      this.center.lng = this.location.lng;
      this.center.lat = this.location.lat;
         if (newVal && this.map) {
        this.map.centerAndZoom(this.location, 12);
  //  var map = new BMap.Map("allmap", {enableMapClick:false});//构造底图时，关闭底图可点功能

      }
    }
  },
  created(){
    console.log('1212')

    console.log(this.baidu_address)
  },
  mounted(){
    if(this.baidu_address){
      console.log(this.baidu_address)
    }
  },
  methods: {
    BaiduMapOK() {
      let data = {
        lng: this.center.lng,
        lat: this.center.lat
      };
      //传给父组件  父组件有个CloseBaiduMap事件，是传值过去
      this.$emit("CloseBaiduMap", data);
      console.log(data)
          localStorage.setItem('baiDuLng', data.lng);
          localStorage.setItem('baiDuLat', data.lat);

    },
    getBaiDu(e) {
      console.log(e)
       this.center.lng = e.point.lng;
      this.center.lat = e.point.lat;
      //       this, (center.lng = e.point.lng), (this.center.lat = e.point.lat);
    },
    //地图组件渲染完毕时触发
    handel(BMap, map) {
      console.log(BMap);
      //map 获取到当前的经度和纬度
      console.log(map);
      this.map = map;
      let _this = this;
      setTimeout(() => {
        const { lng, lat } = this.location;
        if (this.location.lng && this.location.lat) {
          _this.center = { lng: lng, lat: lat }; // 设置center属性值  包含经度，纬度
          _this.center.lng = lng;
          _this.center.lat = lat;
          _this.zoom = 18;
        }
      });
    }
  }
};
</script>