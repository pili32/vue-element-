

<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
    <transition-group name="breadcrumb" >
      <el-breadcrumb-item
        v-for="item in navaList"
        :key="item.path"
        >

        <span class="no-redirect ">{{ item.name }}</span>

      </el-breadcrumb-item>
    </transition-group>
    <!--  -->
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: "BreadNav",
  data() {
    return {
      navaList: [],
    };
  },
  computed: {
    // breadNav() {
    //   return this.$store.state.breadNav;
    // },
  },
  watch: {
    $route (query){
      this.getBreadcrumb();
    },
  },
  created(){
    this.getBreadcrumb();

  },
  toPath(path){

  },
  methods:{
    getBreadcrumb() {
      let {matched} = this.$route
      const firsRoute = matched[0]
      //判断当前如果是不是首页就添加首页进去
      let isCopyPath = this.isFirsRoute(firsRoute)

      if(!isCopyPath) {
        matched = [{path:'/home',name:'首页'}].concat(matched)
      } else {
        this.navaList = [firsRoute]
        return
      }
      this.navaList = matched
    },
    //判断当前如果是不是首页
    isFirsRoute({name}){
      if(name !== '首页')  return false
      else return true
    },
    toRouter(item){
    }
  },
};
</script>

<style   >
.breadcrumb {
  /* padding: 20px 0; */
}
.no-redirect {
    color: #97a8be;
    cursor: text;
  }
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all .5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all .5s;
}

.breadcrumb-leave-active {
  position: absolute;
}

</style>