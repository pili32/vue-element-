<template>
  <div class="box-flex">
    <el-carousel :interval="4000" type="card">
      <el-carousel-item v-for="(item, index) in imageList" :key="index">
        <!-- <img :src="item.imageUrl"> -->
        <el-image :src="item.imageUrl" fit="scale-down"></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>



<script>
export default {
  props: ["imageList"],
  data() {
    return {
      imgs: "@/assets/carousel/img6.jpg",
      fits: ["fill", "contain", "cover", "none", "scale-down"],
    };
  },
  watch: {
    imageList: {
      handler(val) {
        console.log(val);
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss">
.box-flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  img {
    height: 100%;
  }
  .el-carousel__button {
    height: 5px;
    border-radius: 2px;
  }
  &:hover .is-active .el-carousel__button {
    background: #11A983;
  }
}
</style>