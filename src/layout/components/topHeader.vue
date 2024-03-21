<template>
  <div class="app_header">
    <div>
      <bread-nav></bread-nav>
    </div>
    <!-- <color-picker></color-picker> -->
    <div class="header-info">
        <div >
            <img src="@/assets/image/login/gwy.png" alt="">
        </div>
      <span class="header-name">{{ userName }} </span>
      <el-popover
        placement="bottom"
        trigger="hover"
        popper-class="popperClass"
        width="160"
      >
        <div  style="cursor: pointer">
          <!-- <div @click="changePass">
            <i class="icon-username iconfont"></i>
            <span>修改密码</span>
          </div> -->
          <div style="cursor: pointer;" @click="logout" class="logout">
            <i class="icon-tuichu iconfont"></i>
            <!-- <i  class="iconfont popover-img icon-tuichudenglu"> </i> -->
            <span>退出</span>
          </div>
        </div>
        <el-button slot="reference" style="border: 0; background: none">
          <i class="icon-xia iconfont"></i
        ></el-button>
      </el-popover>
    </div>
  </div>
</template>

<style >
.app_header {
  width: 100%;
  display: inline-block;
  text-align: right;
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  box-sizing: border-box;
}
</style>


<script>
import ColorPicker from "@/layout/colorpicker";
import BreadNav from "./BreadNav.vue";

export default {
  data() {
    return {
      dialogFormVisible: false,
      userName: this.$storage.get("userInfo").userName,
    };
  },
  components: {
    ColorPicker,
    BreadNav,
  },
  methods: {
    logout() {
      this.$router.push(`/login`);

    },

  },
};
</script>


<style lang="scss" scoped>
    .header-name{
        color: #409EFF;
    }
   .header-info{
    padding-right: 20px;
    display: flex;
    align-items: center;
    div{
        width: 30px;
        height: 30px;
        border-radius: 100px;
        border: 1px solid #ddd;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        img{
            width:20px;
            height: 20px;
        }
    }
 
   }
   .logout{
        display: flex;
        align-items: center;
        span{
            margin-left: 10px;
        }
    }
</style>