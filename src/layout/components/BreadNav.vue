

<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
    <transition-group name="breadcrumb" >
      <el-breadcrumb-item
        v-for="item in navaList"
        :key="item.path"
        :to="{ path: item.path }"
        >
        <span  v-if="item.noClick" class="no-redirect "  @click.stop>{{ item.name }}</span>
        <span  v-else class="no-redirect ">{{ item.name }}</span>

      </el-breadcrumb-item>
    </transition-group>

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
    $route (){
      this.getBreadcrumb();
    },
  },
  created(){
    this.getBreadcrumb();

  },
  methods:{
    getBreadcrumb() {
      let {matched} = this.$route
      const firsRoute = matched[0]
        //判断当前如果是不是首页就添加首页进去
      if(!this.isFirsRoute(firsRoute)) {
        matched = [{path:'/home',name:'首页'}].concat(matched)
      }
      //进行循环判断当前如果是第二个节点是不允许点击
      this.navaList = matched.map((item,index) =>{
        if(index===1) {
          return {
            ...item,
            noClick:true
          }
        } else {
          return {
            ...item,
          }
        }
      })
    },
    //判断当前如果是不是首页
    isFirsRoute({name}){
      if(name !== '首页')  return false
      else return true
    },
    toRouter(item){
      console.log(item);
    }
  },
};
</script>

<style>
.breadcrumb {
  padding: 20px 0;
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