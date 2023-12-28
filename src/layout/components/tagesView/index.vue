<template>
  <div class="tags">
    <div v-for="(tag  ,index) in visitedViews" :key="tag.path">
      <router-link :to="tag.path">
        <el-tag
          :closable="index===0?false:true"
          :type="tag.type"
          :class="isActive(tag) ? 'isActive' : ''"
          @close.prevent.stop="closeTag(tag)"
        >
          {{ tag.name }}
        </el-tag>
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  watch: {
    $route() {
      this.addTag();
    },
  },
  computed: {
    //获取store.getters中的currentRoute
    ...mapGetters(["visitedViews"]),
  },
  created() {
    this.initTagData();
    this.addTag();
  },
  methods: {
    // ...mapActions('tages', [ 'addView']),
    //初始化tags数据,当前tagesViewsData为空数组时向里面添加初始数据
    initTagData() {
      const tags = this.visitedViews;
      if (tags.some((e) => e.path === "/home")) {
        this.$store.dispatch("addView", $route);
        debugger;
      } else {
        const initData = {
          path: "/home",
          name: "首页",
        };
        this.$store.dispatch("initTag", initData);
      }

      // if (tags == [] && tags.length == 0) {

      //   this.$store.dispatch("addView", initData);
      // } else {

      // }
    },
    //增加标签页
    addTag() {
      const { path } = this.$route;
      if (path) {
        this.$store.dispatch("addView", this.$route);
      }
    },
    //判断当前的tag的path等于当前的路由的path
    isActive(tag) {
      return tag.path === this.$route.path;
    },
    //关闭当前tag事件
    closeTag(tag) {
      this.$store.dispatch("closeView", tag);
    },
  },
};
</script>

<style  scoped>
.tags {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid greenyellow;
}
.el-tag {
  margin: 5px 3px;
}
.isActive {
  background: #4c7196;
  color: #fff;
}
.isActive .el-icon-close {
  color: #000;
}
</style>